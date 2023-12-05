import { useForm } from "react-hook-form";
// import useFetch from "../common/useFetch";
import { User } from "../App";

type SignupProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUserSignup: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SignUp({ setUser, setUserSignup }: SignupProps) {
  const Form: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
      if (data.password !== data.confirmPassword) {
        alert("passwords don't match");
        return;
      }
      try {
        const response = await fetch("http://192.168.1.224:3000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log("got a res back");
        console.log(res);
        if (res.user) setUser(res.user);
      } catch {
        console.log("error with signup");
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          {/* <label htmlFor="firstName">שם פרטי </label> */}
          <input
            placeholder="שם פרטי"
            {...register("firstName")} //, { required: "First Name Required" }
          />
        </div>

        <div className="input-container">
          {/* <label htmlFor="lastName">שם משפחה: </label> */}
          <input
            placeholder="שם משפחה"
            {...register("lastName")} // , { required: "First Name Required" }
          />
        </div>

        <div className="input-container">
          {/* <label htmlFor="email">דואר אלקטרוני </label> */}
          <input
            placeholder="דואר אלקטרוני"
            {...register("email", { required: "Email Required" })} // , { required: "Email Required" }
          />
        </div>

        <div className="input-container">
          {/* <label htmlFor="password">סיסמה</label> */}
          <input
            placeholder="סיסמה"
            {...register("password", { required: "Password Required" })} // , { required: "Email Required" }
          />
        </div>

        <div className="input-container">
          {/* <label htmlFor="confirmPassword">סיסמה confirm </label> */}
          <input
            placeholder="סיסמה"
            {...register("confirmPassword", { required: "Password Required" })} // , { required: "Email Required" }
          />
        </div>

        <div className="input-container">
          {/* <label htmlFor="phone">טלפון: </label> */}
          <input
            placeholder="טלפון"
            {...register("phone")} // , { required: "Phone Required" }
          />
        </div>

        <div className="input-container">
          {/* <label htmlFor="code">קוד: </label> */}
          <input
            placeholder="חברה קוד"
            {...register("orgCode", { required: "org code required" })} // , { required: "Phone Required" }
          />
        </div>

        <div style={{}} className="input-container">
          <label htmlFor="role" style={{ color: "black" }}>
            Role:
          </label>
          <select {...register("role")}>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        <input
          type="submit"
          value="Sign up"
          className="btn"
          style={{ width: "10em" }}
        />
        <button
          onClick={() => setUserSignup(false)}
          className="btn"
          type="submit"
          style={{ width: "10em" }}
        >
          Back to login
        </button>
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  orgCode: string;
  role: string;
};
