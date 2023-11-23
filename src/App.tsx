import "./App.css";
import { Authentification } from "./authentication/Authentification";
import { Homepage } from "./homepage/Homepage";
// import useFetch from "./common/useFetch";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateLesson } from "./portals/lessons/CreateLesson";
import { Lesson } from "./portals/lessons/Lesson";

function App() {
  const [user, setUser] = useState<User | null>(null);
  // const data = useFetch("");
  // console.log({ data });

  // https://www.youtube.com/watch?v=NIXJJoqM8BQ&ab_channel=AlvinTang    ar/scan
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !user ? <Authentification setUser={setUser} /> : <Homepage />
            }
          />
          <Route path="/new-lesson" element={<CreateLesson />} />
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
};
