import React, { useState, useEffect } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

interface NotificationsData {
  id: string;
  title: string;
  currency: string;
  amount: string;
  date: string;
}

const NotificationsBox = () => {
  const [notifications, setNotifications] = useState<NotificationsData[]>([]);

  useEffect(() => {
    const getAllNotifications = async () => {
      const getCurrentUserId = localStorage.getItem("userId");

      if (getCurrentUserId !== null) {
        const notificationsRef = doc(db, "notifications", getCurrentUserId);

        const unsub = onSnapshot(notificationsRef, (doc) => {
          if (doc.exists()) {
            const getNotifications = doc.data().notifications;
            // Make sure 'getNotifications' is an array or transform it into one
            if (Array.isArray(getNotifications)) {
              setNotifications(getNotifications);
            } else {
              // If it's not an array, you can handle it accordingly
              console.error("Notifications data is not an array");
            }
          }
        });

        return () => unsub();
      }
    };

    getAllNotifications();
  }, []);

  return (
    <div className="bg-white rounded-lg p-3 h-[620px] flex flex-col gap-5">
      <h1 className="text-2xl font-medium text-slate-800 flex items-center gap-3">
        All Notifications <NotificationsActiveIcon />{" "}
      </h1>

      <div className="w-full overflow-auto bg-[rgba(179,179,179,0.3)] p-3 h-full rounded-lg">
        <ul className="flex w-full h-full flex-col gap-5 list-none">
          {notifications && notifications.length < 1 ? (
            <h1 className="text-center my-auto text-xl font-bold text-slate-800">
              You have ({notifications.length}) notifications
            </h1>
          ) : (
            notifications.map((data) => (
              <li
                className="grid gap-2 grid-cols-[0.5fr_4fr_1fr] items-center bg-[rgba(179,179,179,0.69)] px-3 py-3 cursor-pointer rounded-lg"
                key={data.id}
              >
                <EditNotificationsIcon className="text-blue-800" />
                <p className="text-[15px] font-medium text-blue-800">
                  {`You added ${
                    data.title
                  } to your expenses list which you bough ${
                    data.currency
                  }${data.amount.toLocaleString()}`}
                </p>
                <span className="text-sm font-light w-full bg-slate-800 p-3 rounded-lg text-white">
                  {data.date}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsBox;
