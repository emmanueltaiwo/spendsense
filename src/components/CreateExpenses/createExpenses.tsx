import React, { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const CreateExpenses = () => {
  const [expenseItem, setExpenseItem] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseCurrency, setExpenseCurrency] = useState("");

const currencyOptions = [
  "$",
  "€",
  "£",
  "¥",
  "₹",
  "₽",
  "₩",
  "₪",
  "₺",
  "₴",
  "₮",
  "₦",
  "₨",
  "₱",
  "₲",
  "₡",
  "₢",
  "₣",
  "₤",
  "₧",
  "₫",
  "₭",
  "₮",
  "₯",
  "₰",
  "₳",
  "₴",
  "₵",
  "₶",
  "₷",
  "₸",
  "₹",
  "₺",
  "₻",
  "₼",
  "₽",
  "₾",
  "₿",
  "៛",
  "₠",
  "₡",
  "₢",
  "₣",
  "₤",
  "₥",
  "₦",
  "₧",
  "₨",
  "₩",
  "₪",
  "₫",
  "€",
  "₭",
  "₮",
  "₯",
  "₰",
  "₱",
  "₲",
  "₳",
  "₴",
  "₵",
  "₶",
  "₷",
  "₸",
  "₹",
  "₺",
  "₻",
  "₼",
  "₽",
  "₾",
  "₿",
  "﷼",
  "𑿠",
  "﷼",
];





  const createNewExpense = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const getCurrentUserId = localStorage.getItem("userId");

    if (getCurrentUserId !== null) {
      // Get a reference to the user's document in expenses collection
      const userExpensesDocRef = doc(db, "expenses", getCurrentUserId);
      const userNotificationsDocRef = doc(
        db,
        "notifications",
        getCurrentUserId
      );
      // Get the user's current document data
      const userExpensesDoc = await getDoc(userExpensesDocRef);
      const userNotificationsDoc = await getDoc(userNotificationsDocRef);

      // Check if the user document exists
      if (!userExpensesDoc.exists()) {
        // Create the user document with initial data
        await setDoc(userExpensesDocRef, { expenses: [] });
      }

      if (!userNotificationsDoc.exists()) {
        // Create the user document with initial data
        await setDoc(userNotificationsDocRef, { notifications: [] });
      }

      // Get the updated user document data
      const updatedUserExpensesDoc = await getDoc(userExpensesDocRef);
      let userExpensesData = updatedUserExpensesDoc.data();
      let userNotificationsData = (
        await getDoc(userNotificationsDocRef)
      ).data();

      if (!userExpensesData) {
        userExpensesData = { expenses: [] };
      }

      if (!userNotificationsData) {
        userNotificationsData = { notifications: [] };
      }

      // Add the new expense object to the expenses array
      const newExpense = {
        expenseItem: expenseItem,
        expenseAmount: expenseAmount,
        expenseDate: expenseDate,
        expenseCurrency: expenseCurrency,
        expenseStatus: "Success",
        expenseId: expenseDate + expenseAmount,
      };

      const newNotification = {
        id: expenseDate + expenseItem,
        title: expenseItem,
        currency: expenseCurrency,
        amount: expenseAmount,
        date: expenseDate,
      };

      userExpensesData.expenses.push(newExpense);

      // Make sure userNotificationsData.notifications is an array
      if (!Array.isArray(userNotificationsData.notifications)) {
        userNotificationsData.notifications = [];
      }

      userNotificationsData.notifications.push(newNotification);

      // Update the user's document with the modified expenses array
      await setDoc(userExpensesDocRef, userExpensesData);
      await setDoc(userNotificationsDocRef, userNotificationsData);

      // Reset the form values
      setExpenseItem("");
      setExpenseAmount("");
      setExpenseCurrency("");
      setExpenseDate("");
    }
  };

  return (
    <section className="flex flex-col gap-5 bg-white rounded-lg p-5">
      <h1 className="text-3xl font-bold text-slate-800">Create Expenses</h1>

      <form
        className="mt-5 flex flex-col gap-10 bg-[rgba(179,179,179,0.3)] h-full p-5 rounded-lg"
        onSubmit={createNewExpense}
      >
        <h1 className="text-xl font-medium text-slate-800">
          Complete the form
        </h1>

        <input
          type="text"
          className="w-full bg-none border-2 border-blue-700 py-4 px-4 text-black placeholder-blue-700 font-medium rounded-lg outline-blue-700"
          placeholder="Expense Item"
          required
          value={expenseItem}
          onChange={(e) => setExpenseItem(e.target.value)}
        />
        <div className="flex gap-3">
          <select
            className="w-[40%] bg-none border-2 border-blue-700 py-4 px-4 text-black placeholder-blue-700 font-medium rounded-lg outline-blue-700"
            required
            value={expenseCurrency}
            onChange={(e) => setExpenseCurrency(e.target.value)}
          >
            <option value="" disabled>
              Select Currency
            </option>
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="w-full bg-none border-2 border-blue-700 py-4 px-4 text-black placeholder-blue-700 font-medium rounded-lg outline-blue-700"
            placeholder="Expense Amount"
            required
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
        </div>

        <input
          type="date"
          className="w-full bg-none border-2 border-blue-700 py-4 px-4 text-black placeholder-blue-700 font-medium rounded-lg outline-blue-700"
          required
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />

        <button
          className="w-full rounded-lg py-4 px-4 bg-blue-500 text-white text-lg font-medium active:bg-blue-400 active:border-blue-900 active:border-2"
          type="submit"
        >
          Create Expense
        </button>
      </form>
    </section>
  );
};

export default CreateExpenses;
