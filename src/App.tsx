import "./App.css";
import { Authentification } from "./authentication/Authentification";
import { Homepage } from "./homepage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Lesson } from "./portals/lessons/Lesson";
import Modal from "react-modal";
import { useAppContext } from "./context/appContext";
import { MyAccountDetails } from "./portals/MyAccountDetails";

function App() {
  const { user } = useAppContext();

  Modal.setAppElement("#root");

  // https://www.youtube.com/watch?v=NIXJJoqM8BQ&ab_channel=AlvinTang    ar/scan
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={!user ? <Authentification /> : <Homepage user={user} />}
          />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/account" element={<MyAccountDetails />} />
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
