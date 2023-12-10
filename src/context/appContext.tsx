import React, { createContext, useContext, useState } from "react";
import { User } from "../App";

type AppContextProviderProps = {
  children: React.ReactNode;
};

type Context = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  myLessons: any[];
  setMyLessons: React.Dispatch<React.SetStateAction<any[]>>;
  activeLesson: any;
  setActiveLesson: React.Dispatch<any>;
};

// const tempUser = {
//   userId: "26040550-3950-424e-ba29-ee5382d4c6e0",
//   name: "jon",
//   // lastName: "marks",
//   email: "jmarks@put.com",
//   phone: "0577777777",
//   role: "teacher",
// };

const tempUser2 = {
  userId: "f1fb123f-f6fc-4a67-aaaf-2499ce2081cc",
  name: "Paul",
  // lastName: "marks",
  email: "Pm@pm.com",
  phone: "454545",
  role: "student",
};

export const AppContext = createContext<Context | null>(null);

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [user, setUser] = useState<User | null>(tempUser2);
  const [myLessons, setMyLessons] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        myLessons,
        setMyLessons,
        activeLesson,
        setActiveLesson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    console.log(
      "Error with a Context - likely that must be used within AppContextProvider"
    );
    return {
      user: null,
      setUser: () => {},
      myLessons: [],
      setMyLessons: () => {},
      activeLesson: null,
      setActiveLesson: () => {},
    };
  }

  return context;
}
