import { useForm } from "react-hook-form";
// import useFetch from "../common/useFetch";
import { User } from "../App";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUserSignup: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Login({ setUser, setUserSignup }: LoginProps) {
  const Form: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
      try {
        alert("attempting login");
        const response = await fetch("http://192.168.1.224:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const res = await response.json();
        alert(res);
        console.log({ res });
        setUser(res);
        return;
      } catch {
        alert("error with login ");
        console.log("error with login");
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          {/* <label style={{ color: "black" }} htmlFor="email">
            דואר אלקטרוני:
          </label> */}

          <input
            style={{ color: "black" }}
            placeholder="דואר אלקטרוני"
            {...register("email")} //, { required: "First Name Required" }
          />
        </div>

        <div className="input-container">
          {/* <label htmlFor="password">סיסמה: </label> */}
          <input
            style={{ color: "black" }}
            placeholder="סיסמה"
            {...register("password")} // , { required: "First Name Required" }
          />
        </div>
        <div className="auth-btns-wrapper">
          <button className="btn" type="submit">
            שלך
          </button>
          <button
            onClick={() => setUserSignup(true)}
            className="btn"
            type="submit"
          >
            Signup
          </button>
        </div>

        {/* <Box>
          <div>
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              variant="standard"
            />
            <TextField
              id="standard-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
              variant="standard"
            />
          </div>
        </Box> */}
      </form>
    );
  };
  return (
    <div className="auth-child signup-wrapper">
      <Form />
    </div>
  );
}

type FormData = {
  email: string;
  password: string;
};
