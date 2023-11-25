import "./App.css";
import { Authentification } from "./authentication/Authentification";
import { Homepage } from "./homepage/Homepage";
// import useFetch from "./common/useFetch";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Lesson } from "./portals/lessons/Lesson";
import Modal from "react-modal";

const tempUser = {
  userId: "26040550-3950-424e-ba29-ee5382d4c6e0",
  name: "jon",
  // lastName: "marks",
  email: "jmarks@put.com",
  phone: "0577777777",
  role: "teacher",
};

function App() {
  const [user, setUser] = useState<User | null>(tempUser);
  // const data = useFetch("");
  // console.log({ data });

  Modal.setAppElement("#root");

  // https://www.youtube.com/watch?v=NIXJJoqM8BQ&ab_channel=AlvinTang    ar/scan
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <Authentification setUser={setUser} />
              ) : (
                <Homepage user={user} />
              )
            }
          />
          <Route path="/lesson" element={<Lesson />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

export type User = {
  name: string;
  email: string;
  phone: string;
  role: string;
  userId: string;
} | null;
