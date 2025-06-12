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
import { onAuthStateChanged } from "firebase/auth";

interface SavingsGoal {
  [route: string]: number;
}

interface SavingExpense {
  [category: string]: number;
}

interface SavingsContextType {
  goal: SavingsGoal | null;
  savingexpense: SavingExpense | null;
  loading: boolean;
}

const SavingsContext = createContext<SavingsContextType | undefined>(undefined);

const SavingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [goal, setGoal] = useState<SavingsGoal | null>(null);
  const [savingexpense, setSavingExpense] = useState<SavingExpense | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const [authToggle, setauthToggle] = useState(false);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Authentication Error", "User is not authenticated.");
      setLoading(false);
      return;
    }

    const now = new Date();
    // const docId = `${userId}${now.getMonth()}${now.getFullYear()}`;

    const goalDocRef = doc(db, "savings_goals", userId);
    const expenseDocRef = doc(db, "saving_expense", userId);

    let goalLoaded = false;
    let expenseLoaded = false;

    const unsubGoal = onSnapshot(
      goalDocRef,
      (docSnap) => {
        setGoal(docSnap.exists() ? (docSnap.data() as SavingsGoal) : null);
        goalLoaded = true;
        if (goalLoaded && expenseLoaded) {
          setLoading(false);
        }
      },
      (error) => {
        setGoal(null);
        setLoading(false);
        Alert.alert("Error", error.message);
      }
    );

    const unsubExpense = onSnapshot(
      expenseDocRef,
      (docSnap) => {
        setSavingExpense(
          docSnap.exists() ? (docSnap.data() as SavingExpense) : null
        );
        expenseLoaded = true;
        if (goalLoaded && expenseLoaded) {
          setLoading(false);
        }
      },
      (error) => {
        setSavingExpense(null);
        setLoading(false);
        Alert.alert("Error", error.message);
      }
    );

    return () => {
      unsubGoal();
      unsubExpense();
    };
  }, [authToggle]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setauthToggle(!!user); // true if signed in, false if signed out
    });

    return () => unsubscribe();
  }, []);

  return (
    <SavingsContext.Provider value={{ goal, savingexpense, loading }}>
      {children}
    </SavingsContext.Provider>
  );
};

const useSavings = () => {
  const ctx = useContext(SavingsContext);
  if (!ctx) throw new Error("useSavings must be used within a SavingsProvider");
  return ctx;
};

export { SavingsProvider, useSavings };
