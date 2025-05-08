import { auth, db } from "@/FirebaseConfig";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Alert } from "react-native";
import { Timestamp } from "firebase/firestore";

interface UserData {
  Created_at: Timestamp;
  email: string;
  fullName: string;
  mobile: string;
  password: string;
}

// 1. Define the shape of the context data
interface AppData {
  totalBalance: number;
  totalExpense: number;
  userData: UserData | null;
  loading: boolean;
}

// 2. Default values
const defaultValue: AppData = {
  totalBalance: 0,
  totalExpense: 0,
  userData: null,
  loading: true,
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
      query(collection(db, "income"), where("userId", "==", userId)),
      (snapshot) => {
        let total = 0;
        snapshot.forEach((doc) => {
          const amt = doc.data().Amount;
          if (typeof amt === "number") total += amt;
        });
        setTotalBalance(total);
      },
      (error) => {
        console.error("Error listening to income:", error);
      }
    );

    // Expense Snapshot Listener
    const expenseUnsub = onSnapshot(
      query(collection(db, "expenses"), where("userId", "==", userId)),
      (snapshot) => {
        let total = 0;
        snapshot.forEach((doc) => {
          const amt = doc.data().Amount;
          if (typeof amt === "number") total += amt;
        });
        setTotalExpense(total);
      },
      (error) => {
        console.error("Error listening to expenses:", error);
      }
    );

    // User Data Snapshot Listener
    const userUnsub = onSnapshot(
      doc(db, "users", userId),
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
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
  }, []); // Empty dependency array means it runs once when the component mounts

  useEffect(() => {
    if (userData && totalBalance >= 0 && totalExpense >= 0) {
      setLoading(false); // Only set loading false when all data is available
    }
  }, [userData, totalBalance, totalExpense]);

  return (
    <DashboardContext.Provider
      value={{ totalBalance, totalExpense, userData, loading }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// 6. Hook
export const useAppData = () => useContext(DashboardContext);
