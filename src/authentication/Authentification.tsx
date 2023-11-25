import React, { useState } from "react";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { User } from "../App";

type AuthentificationProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export function Authentification({ setUser }: AuthentificationProps) {
  const [userSignup, setUserSignup] = useState<boolean>(false);

  return (
    <div className="auth-wrapper">
      {userSignup ? <SignUp /> : <Login setUser={setUser} />}
      <button onClick={() => setUserSignup(!userSignup)}>sign up</button>
    </div>
  );
}
