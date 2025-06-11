import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput } from "react-native";

// Helper to pad day and month with leading zero if needed
const padToTwoDigits = (num: string | number): string =>
  num.toString().padStart(2, "0");

// Validates if the date is a valid calendar date
const isValidDate = (day: string, month: string, year: string): boolean => {
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  if (
    isNaN(dayNum) ||
    isNaN(monthNum) ||
    isNaN(yearNum) ||
    dayNum < 1 ||
    dayNum > 31 ||
    monthNum < 1 ||
    monthNum > 12 ||
    yearNum < 1000 ||
    yearNum > 9999
  ) {
    return false;
  }

  const daysInMonth = new Date(yearNum, monthNum, 0).getDate(); // Get last day of the month
  if (dayNum > daysInMonth) {
    return false;
  }

  return true;
};

const DateInput = ({
  onDateChange,
}: {
  onDateChange: (date: string) => void;
}) => {
  const now = new Date();

  // Always use padded values for initial state
  const [day, setDay] = useState(padToTwoDigits(now.getDate()));
  const [month, setMonth] = useState(padToTwoDigits(now.getMonth() + 1));
  const [year, setYear] = useState(`${now.getFullYear()}`);
  const [error, setError] = useState("");

  const dayRef = useRef<TextInput>(null);
  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  // Notify parent with initial date on mount
  useEffect(() => {
    onDateChange(`${year}-${month}-${day}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const handleDayChange = (text: string) => {
    setDay(text);
    if (text.length === 2) {
      monthRef.current?.focus();
    }
    if (text.length === 2 && month.length === 2 && year.length === 4) {
      if (!isValidDate(text, month, year)) {
        setError("Invalid date.");
      } else {
        setError("");
        onDateChange(
          `${year}-${padToTwoDigits(month)}-${padToTwoDigits(text)}`
        );
      }
    }
  };

  const handleMonthChange = (text: string) => {
    setMonth(text);
    if (text.length === 2) {
      yearRef.current?.focus();
    }
    if (text.length === 2 && day.length === 2 && year.length === 4) {
      if (!isValidDate(day, text, year)) {
        setError("Invalid date.");
      } else {
        setError("");
        onDateChange(
          `${year}-${padToTwoDigits(text)}-${padToTwoDigits(day)}`
        );
      }
    }
  };

  const handleYearChange = (text: string) => {
    setYear(text);
    if (text.length === 4 && day.length === 2 && month.length === 2) {
      if (!isValidDate(day, month, text)) {
        setError("Invalid date.");
      } else {
        setError("");
        onDateChange(
          `${text}-${padToTwoDigits(month)}-${padToTwoDigits(day)}`
        );
      }
    }
  };

  return (
    <View className="w-full">
      <Text className="font-semibold mb-2 px-4 text-Txt-secondary">Date</Text>
      <View
        className={`flex flex-row items-center justify-start bg-col_bg-dark rounded-full px-4 ${
          error ? "border-red-500 border-2" : ""
        }`}
      >
        <TextInput
          ref={dayRef}
          className="p-3 w-14 text-center text-xl rounded-md"
          placeholder="DD"
          value={day}
          onChangeText={handleDayChange}
          keyboardType="numeric"
          maxLength={2}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Backspace") {
              setDay(day.slice(0, -1));
            }
          }}
          autoFocus
        />
        <Text className="mx-2 text-2xl">-</Text>
        <TextInput
          ref={monthRef}
          className="p-3 w-16 text-center text-xl rounded-md"
          placeholder="MM"
          value={month}
          onChangeText={handleMonthChange}
          keyboardType="numeric"
          maxLength={2}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Backspace") {
              setMonth(month.slice(0, -1));
            }
          }}
        />
        <Text className="mx-2 text-2xl">-</Text>
        <TextInput
          ref={yearRef}
          className="p-3 w-20 text-center text-xl rounded-md"
          placeholder="YYYY"
          value={year}
          onChangeText={handleYearChange}
          keyboardType="numeric"
          maxLength={4}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Backspace") {
              setYear(year.slice(0, -1));
            }
          }}
        />
      </View>
      {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}
    </View>
  );
};

export default DateInput;
