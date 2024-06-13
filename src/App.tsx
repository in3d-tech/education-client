import "./App.css";
import { Authentification } from "./authentication/Authentification";
import { Homepage } from "./homepage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import { useAppContext } from "./context/appContext";
import { Suspense, lazy, useEffect } from "react";
import LessonNew from "./common/TestLesson";
import { MyOrganization } from "./portals/MyOrganization";
import { verifyToken } from "./authentication/validation/verifyToken";

const LazyLesson = lazy(() => import("./portals/lessons/Lesson"));
const LazyAccountDetails = lazy(() => import("./portals/MyAccountDetails"));

function App() {
  const { user, token, setUser, setToken } = useAppContext();

  useEffect(() => {
    if (token) {
      console.log("have token at least");
      if (!user) {
        verifyToken({ token, setUser, setToken });
      }
      localStorage.setItem("arken", token);
    } else {
      console.log("why are we awaitng token");
      localStorage.removeItem("arken");
    }
  }, [token]);

  Modal.setAppElement("#root");

  // https://www.youtube.com/watch?v=NIXJJoqM8BQ&ab_channel=AlvinTang aframe-ar/scan

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
                {user ? <LazyAccountDetails /> : null}
              </Suspense>
            }
          />
          <Route path="/testLesson" element={<LessonNew />} />
          <Route path="/myOrg" element={<MyOrganization />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

export type User = {
  name: string;
  email?: string;
  role?: string;
  userId: string;
  profilePic?: string;
  orgCode: string;
  orgName: string;
  isAdmin?: boolean;
} | null;
