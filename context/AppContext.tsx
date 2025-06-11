import { auth, db } from "@/FirebaseConfig";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Alert } from "react-native";
import { Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface UserData {
  Created_at: Timestamp; // Firestore Timestamp
  Expense_this_month: number;
  Income_this_month: number;
  email: string;
  fullName: string;
  mobile: string;
  password: string;
}

interface ExpenseData {
  Amount: number; // Amount of the expense
  Category: string; // Category of the expense (e.g., "Food")
  Created_At: Timestamp; // Timestamp when the expense is created
  Date: Timestamp; // Date of the expense
  Message: string; // Message related to the expense
  Month: number; // Month of the expense (e.g., 4 for April)
  Title: string; // Title of the expense (e.g., "Vada pav")
  Year: number; // Year of the expense (e.g., 2025)
  userId: string; // User ID of the person associated with the expense
}

interface IncomeData {
  Amount: number; // Amount of the income
  Created_At: Timestamp; // Timestamp when the income is created
  Date: Timestamp; // Date of the income
  Label: string; // Label for the income (e.g., "Monthly")
  Message: string; // Message related to the income
  Month: number; // Month of the income (e.g., 4 for April)
  Title: string; // Title of the income (e.g., "Side Income")
  Year: number; // Year of the income (e.g., 2025)
  userId: string; // User ID of the person associated with the income
}

// 1. Define the shape of the context data
interface AppData {
  totalBalance: number;
  totalExpense: number;
  userData: UserData | null;
  loading: boolean;
  ExpenseData: ExpenseData[] | null;
  IncomeData: IncomeData[] | null;
}

// 2. Default values
const defaultValue: AppData = {
  totalBalance: 0,
  totalExpense: 0,
  userData: null,
  loading: true,
  ExpenseData: null,
  IncomeData: null,
};

// 3. Create context
const DashboardContext = createContext<AppData>(defaultValue);

// 4. Provider props
interface DashboardProviderProps {
  children: ReactNode;
}

// 5. Provider component
export const AppProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [IncomeData, setUserIncomeData] = useState<IncomeData[] | null>(null);
  const [ExpenseData, setUserExpenseData] = useState<ExpenseData[] | null>(
    null
  );
  const [authToggle, setauthToggle] = useState(false);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Authentication Error", "User is not authenticated.");
      setLoading(false);
      return;
    }

    // Initialize loading state
    setLoading(true);

    // Income Snapshot Listener
    const incomeUnsub = onSnapshot(
      query(collection(db, "income"), where("userId", "==", userId), limit(15)),
      (snapshot) => {
        const incomeArr: IncomeData[] = [];
        snapshot.forEach((doc) => {
          incomeArr.push(doc.data() as IncomeData);
          // console.log(doc.data());
        });
        setUserIncomeData(incomeArr);
        // console.log(incomeArr);
      },
      (error) => {
        console.error("Error listening to income:", error);
      }
    );

    const expenseUnsub = onSnapshot(
      query(
        collection(db, "expenses"),
        where("userId", "==", userId),
        limit(15)
      ),
      (snapshot) => {
        const expensearr: ExpenseData[] = [];
        snapshot.forEach((doc) => {
          expensearr.push(doc.data() as ExpenseData);
          // console.log(doc.data());
        });
        setUserExpenseData(expensearr);
        // console.log(expensearr);
      },
      (error) => {
        console.error("Error listening to income:", error);
      }
    );

    // User Data Snapshot Listener
    const userUnsub = onSnapshot(
      doc(db, "users", userId),
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
          setTotalBalance(docSnap.data().Income_this_month);
          setTotalExpense(docSnap.data().Expense_this_month);
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.error("Error fetching user data:", error);
      }
    );

    // Cleanup on unmount
    return () => {
      incomeUnsub();
      expenseUnsub();
      userUnsub();
    };
  }, [authToggle]); // Empty dependency array means it runs once when the component mounts

  useEffect(() => {
    if (userData && totalBalance >= 0 && totalExpense >= 0) {
      setLoading(false); // Only set loading false when all data is available
    }
  }, [userData, totalBalance, totalExpense]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setauthToggle(!!user); // true if signed in, false if signed out
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        totalBalance,
        totalExpense,
        userData,
        loading,
        ExpenseData,
        IncomeData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// 6. Hook
export const useAppData = () => useContext(DashboardContext);
