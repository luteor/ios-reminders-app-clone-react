import { createContext } from "react";
import { useState } from "react";

import data from "@assets/reminders.json";

export const DataContext = createContext(null);

export const DataContextProvider = ({ children }) => {
  const [reminderLists, setReminderLists] = useState(data.reminderLists);

  return (
    <DataContext.Provider value={{ reminderLists, setReminderLists }}>
      {children}
    </DataContext.Provider>
  );
};
