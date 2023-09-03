import DashboardLayout from "@/components/Dashboard/dashboardLayout";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar/sidebar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "@/components/UI/loader";
import Container from "@/components/UI/container";
import Head from "next/head";

interface Data {
  id: string;
  expenseId: string;
  expenseItem: string;
  expenseCurrency: string;
  expenseAmount: string;
  expenseDate: string;
  expenseStatus: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [expenses, setExpenses] = useState<Data[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Data[]>(expenses);

  useEffect(() => {
    localStorage.removeItem("page_name");
    localStorage.setItem("page_name", "Dashboard");
  }, []);

  useEffect(() => {
    localStorage.removeItem("page_id");
    localStorage.setItem("page_id", "1");
  }, []);

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    const getAllExpenses = async () => {
      const getCurrentUserId = localStorage.getItem("userId");

      if (getCurrentUserId !== null) {
        const expensesRef = doc(db, "expenses", getCurrentUserId);

        const unsub = onSnapshot(expensesRef, (doc) => {
          if (doc.exists()) {
            const getExpenses = doc.data().expenses;
            setExpenses(getExpenses);
            setFilteredExpenses(getExpenses);
          }
        });

        return () => unsub();
      }
    };

    getAllExpenses();
  }, []);

  const handleSearchExpenses = (searchStr: string, e: any) => {
    const filterExpenses = expenses.filter((expense) => {
      return (
        expense.expenseAmount
          .toLocaleString()
          .includes(searchStr.toLowerCase()) ||
        expense.expenseDate.toLowerCase().includes(searchStr.toLowerCase()) ||
        expense.expenseId.toLowerCase().includes(searchStr.toLowerCase()) ||
        expense.expenseItem.toLowerCase().includes(searchStr.toLowerCase()) ||
        expense.expenseStatus.toLowerCase().includes(searchStr.toLowerCase())
      );
    });
    setFilteredExpenses(filterExpenses);
  };

  const handleSidebarOpen = () => {
    setSidebarIsOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarIsOpen(false);
  };

  useEffect(() => {
    const validateUserEntry = async () => {
      const getStoredUserId = localStorage.getItem("userId");
      if (getStoredUserId !== null) {
        const userRef = doc(db, "users", getStoredUserId);
        const userSnap = await getDoc(userRef);
        setIsLoggedIn(userSnap.exists());
        setUserId(getStoredUserId);
      } else {
        setIsLoggedIn(false);
        router.push("/login");
      }
    };
    validateUserEntry();
  }, [router]);

  return (
    <>
      <Head>
        <title>SpendSense - Dashboard</title>
      </Head>

      {isLoggedIn && (
        <Layout
          handleSidebarOpen={handleSidebarOpen}
          handleSidebarClose={handleSidebarClose}
          sidebarIsOpen={sidebarIsOpen}
          userId={userId}
          handleSearchExpenses={handleSearchExpenses}
        >
          <Sidebar sidebarIsOpen={sidebarIsOpen} />
          <Container>
            <DashboardLayout
              expenses={expenses}
              filteredExpenses={filteredExpenses}
              handleSearchExpenses={handleSearchExpenses}
            />
          </Container>
        </Layout>
      )}

      {!isLoggedIn && <Loader />}
    </>
  );
};

export default Dashboard;
