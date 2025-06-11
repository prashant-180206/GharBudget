import React, { createContext, useEffect, useState, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";
import { DailyExpense } from "@/assets/types";

type DailyExpenseContextType = {
  dailyExpenseData: DailyExpense | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const DailyExpenseContext = createContext<DailyExpenseContextType>({
  dailyExpenseData: null,
  loading: true,
  refresh: async () => {},
});

export const DailyExpenseProvider = ({ children }: { children: React.ReactNode }) => {
  const [dailyExpenseData, setData] = useState<DailyExpense | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const docRef = doc(db, "Daily_Expense", userId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setData(snapshot.data() as DailyExpense);
      } else {
        setData(null);
      }
    } catch (err) {
      console.error("Error fetching DailyExpense:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DailyExpenseContext.Provider value={{ dailyExpenseData, loading, refresh: fetchData }}>
      {children}
    </DailyExpenseContext.Provider>
  );
};

// Custom hook for easy access
export const useDailyExpense = () => useContext(DailyExpenseContext);
