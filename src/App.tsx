import { useState, useEffect } from "react";
import "./App.css";
import { Authentication } from "./authentication/Authentication";
import { Homepage } from "./homepage/Homepage";
import useFetch from "./common/useFetch";

function App() {
  const [count, setCount] = useState(0);

  const data = useFetch("");
  console.log({ data });

  // useEffect(() => {
  //   try {
  //     // fetch("http://localhost:3000")
  //     //   .then((response) => {
  //     //     return response.text();
  //     //   })
  //     //   .then((data) => {
  //     //     console.log({ data });
  //     //   });
  //     console.log("in 1");

  //     console.log("in 2");
  //     console.log({ data });
  //   } catch (err) {
  //     console.log("in the error");
  //     console.log(err);
  //   }
  // }, []);

  return (
    <>
      <Authentication />
      <Homepage />
    </>
  );
}

export default App;
