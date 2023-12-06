import { useState } from "react";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Navbar } from "../navigation/Navbar";

// type AuthentificationProps = {
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// };

export function Authentification() {
  const [userSignup, setUserSignup] = useState<boolean>(false);

  return (
    <div className="auth-wrapper">
      <Navbar title={userSignup ? "נעים להכיר!" : "Login"} />
      {userSignup ? (
        <SignUp setUserSignup={setUserSignup} />
      ) : (
        <Login setUserSignup={setUserSignup} />
      )}
    </div>
  );
}
