// const DailyExpense = {
//   
//   categories: [{ Food: 50 }, { News: 10 }],
//   Taken: [
//     {
//       date: "2020-01-01",
//       categories: ["Food", "News"],
//     },
//     {
//       date: "2020-01-01",
//       categories: ["Food", "News"],
//     },
//     {
//       date: "2020-01-01",
//       categories: ["Food", "News"],
//     },
//   ],
// };

// Type for category spending (e.g., { Food: 50 })
type CategorySpending = Record<string, number>;

// Type for a taken record (i.e., date and categories used on that date)
interface TakenEntry {
  date: string; // ideally ISO format
  categories: string[];
}

// Main type
export interface DailyExpense {
  categories: CategorySpending[]; // array of objects like { Food: 50 }
  Taken: TakenEntry[];
}
