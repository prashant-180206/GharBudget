import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/FirebaseConfig";
import { Alert } from "react-native";

export interface MonthlyExpense {
  [category: string]: number;
}

// type BudgetData = {
// [key: string]: string | number | { seconds: number; nanoseconds: number };
// };

interface BudgetData {
  [category: string]:
    | string
    | number
    | { seconds: number; nanoseconds: number };
}

interface AnalysisContextType {
  Monthly_Expense: MonthlyExpense | null;
  Budget_Expense: BudgetData | null;
  loading: boolean;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [Monthly_Expense, setMonthly_Expense] = useState<MonthlyExpense | null>(
    null
  );
  const [Budget_Expense, setBudgetExpense] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Authentication Error", "User is not authenticated.");
      setLoading(false);
      return;
    }

    const now = new Date();
    const docId = `${userId}${now.getMonth()}${now.getFullYear()}`;

    const expensedocref = doc(db, "monthly_expense", docId);
    const budgetdocref = doc(db, "budget",userId);

    let goalLoaded = false;
    let expenseLoaded = false;

    const unsubGoal = onSnapshot(
      expensedocref,
      (docSnap) => {
        const data = docSnap.exists() ? (docSnap.data() as MonthlyExpense) : null;
        setMonthly_Expense(data);
        // console.log("Monthly_Expense updated:", data);
        goalLoaded = true;
        if (goalLoaded && expenseLoaded) setLoading(false);
      },
      (error) => {
        setMonthly_Expense(null);
        setLoading(false);
        Alert.alert("Error", error.message);
      }
    );
    
    const unsubExpense = onSnapshot(
      budgetdocref,
      (docSnap) => {
        const data = docSnap.exists() ? (docSnap.data() as BudgetData) : null;
        setBudgetExpense(data);
        // console.log("Budget_Expense updated:", data);
        expenseLoaded = true;
        if (goalLoaded && expenseLoaded) setLoading(false);
      },
      (error) => {
        setBudgetExpense(null);
        setLoading(false);
        Alert.alert("Error", error.message);
      }
    );
    

    // console.log(Monthly_Expense, Budget_Expense);

    return () => {
      unsubGoal();
      unsubExpense();
    };
  }, []);

  return (
    <AnalysisContext.Provider
      value={{ Monthly_Expense, Budget_Expense, loading }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

const useAnalysis = () => {
  const ctx = useContext(AnalysisContext);
  if (!ctx)
    throw new Error("useAnalysis must be used within a AnalysisProvider");
  return ctx;
};

export { AnalysisProvider, useAnalysis };
