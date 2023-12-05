import React, { useState } from "react";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { User } from "../App";
import { Navbar } from "../navigation/Navbar";

type AuthentificationProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export function Authentification({ setUser }: AuthentificationProps) {
  const [userSignup, setUserSignup] = useState<boolean>(false);

  return (
    <div className="auth-wrapper">
      <Navbar title={userSignup ? "Sign up" : "Login"} />
      {userSignup ? (
        <SignUp setUser={setUser} setUserSignup={setUserSignup} />
      ) : (
        <Login setUser={setUser} setUserSignup={setUserSignup} />
      )}
    </div>
  );
}
