import "./App.css";
import { Authentification } from "./authentication/Authentification";
import { Homepage } from "./homepage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import { useAppContext } from "./context/appContext";
import { Suspense, lazy } from "react";

const LazyLesson = lazy(() => import("./portals/lessons/Lesson"));
const LazyAccountDetails = lazy(() => import("./portals/MyAccountDetails"));

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
          <Route
            path="/lesson"
            element={
              <Suspense fallback="Loading Lesson....">
                <LazyLesson />
              </Suspense>
            }
          />
          <Route
            path="/account"
            element={
              <Suspense fallback="Loading AccountDetails">
                <LazyAccountDetails />
              </Suspense>
            }
          />
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
  profilePic?: string;
} | null;
