/* eslint-disable perfectionist/sort-objects */
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { DataContextProvider } from "@contexts/DataContext";
import { AllRemindersList } from "@routes/AllRemindersList";
import { CompletedRemindersList } from "@routes/CompletedRemindersList";
import { FlaggedRemindersList } from "@routes/FlaggedRemindersList";
import { Home } from "@routes/Home";
import { ReminderList } from "@routes/ReminderList";
import { Root } from "@routes/Root.jsx";
import { ScheduledRemindersList } from "@routes/ScheduledRemindersList";
import { TodayRemindersList } from "@routes/TodayRemindersList";
import ReactDOM from "react-dom/client";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "today-reminders-list",
        element: <TodayRemindersList />,
      },
      {
        path: "scheduled-reminders-list",
        element: <ScheduledRemindersList />,
      },
      {
        path: "all-reminders-list",
        element: <AllRemindersList />,
      },
      {
        path: "flagged-reminders-list",
        element: <FlaggedRemindersList />,
      },
      {
        path: "completed-reminders-list",
        element: <CompletedRemindersList />,
      },
      {
        path: "reminder-lists/:listId",
        element: <ReminderList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  </React.StrictMode>,
);
