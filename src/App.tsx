// import "./App.css";
// import "./ar-theme.css";
// import { Authentification } from "./authentication/Authentification";
// import { Homepage } from "./homepage/Homepage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Modal from "react-modal";
// import { useAppContext } from "./context/appContext";
// import { Suspense, lazy, useEffect } from "react";
// import LessonNew from "./common/TestLesson";
// import { MyOrganization } from "./portals/MyOrganization";
// import { verifyToken } from "./authentication/validation/verifyToken";

// const LazyLesson = lazy(() => import("./portals/lessons/Lesson"));
// const LazyAccountDetails = lazy(() => import("./portals/MyAccountDetails"));

// function App() {
//   const { user, token, setUser, setToken } = useAppContext();

//   useEffect(() => {
//     if (token) {
//       console.log("have token at least");
//       if (!user) {
//         verifyToken({ token, setUser, setToken });
//       }
//       localStorage.setItem("arken", token);
//     } else {
//       console.log("why are we awaitng token");
//       localStorage.removeItem("arken");
//     }
//   }, [token]);

//   Modal.setAppElement("#root");

//   // https://www.youtube.com/watch?v=NIXJJoqM8BQ&ab_channel=AlvinTang aframe-ar/scan

//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={!user ? <Authentification /> : <Homepage user={user} />}
//           />
//           <Route
//             path="/lesson"
//             element={
//               <Suspense fallback="Loading Lesson....">
//                 <LazyLesson />
//               </Suspense>
//             }
//           />
//           <Route
//             path="/account"
//             element={
//               <Suspense fallback="Loading AccountDetails">
//                 {user ? <LazyAccountDetails /> : null}
//               </Suspense>
//             }
//           />
//           <Route path="/testLesson" element={<LessonNew />} />
//           <Route path="/myOrg" element={<MyOrganization />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

// export type User = {
//   name: string;
//   email?: string;
//   role?: string;
//   userId: string;
//   profilePic?: string;
//   orgCode: string;
//   orgName: string;
//   isAdmin?: boolean;
// } | null;

import "./App.css";
import "./ar-theme.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { PinLogin } from "./authentication/PinLogin";
import { Homepage } from "./homepage/Homepage";

const LazyLesson = lazy(() => import("./portals/lessons/Lesson"));
// const SERVER_URL = "http://localhost:3000";
const SERVER_URL = "https://edu-server-ke5y.onrender.com";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("arken_pin") === "true";
  });
  const [serverUp, setServerUp] = useState(false);

  const checkServer = useCallback(async () => {
    try {
      const res = await fetch(`${SERVER_URL}/health`, { method: "GET" });
      setServerUp(res.ok);
    } catch {
      setServerUp(false);
    }
  }, []);

  useEffect(() => {
    checkServer();
    const interval = setInterval(checkServer, 30000); // re-check every 30s
    return () => clearInterval(interval);
  }, [checkServer]);

  const handlePinSuccess = () => {
    sessionStorage.setItem("arken_pin", "true");
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Homepage serverUp={serverUp} />
            ) : (
              <PinLogin onSuccess={handlePinSuccess} />
            )
          }
        />
        <Route
          path="/my-lessons"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <PinLogin onSuccess={handlePinSuccess} />
            )
          }
        />
        <Route
          path="/lesson"
          element={
            <Suspense
              fallback={<div className="loading-fallback">טוען שיעור...</div>}
            >
              <LazyLesson />
            </Suspense>
          }
        />
      </Routes>
    </Router>
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
