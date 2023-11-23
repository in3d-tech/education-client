import { useForm } from "react-hook-form";
// import useFetch from "../common/useFetch";

export function SignUp() {
  return (
    <div className="auth-child signup-wrapper">
      <Form />
    </div>
  );
}

const Form: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      return res;
    } catch {
      console.log("error with signup");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">שם פרטי </label>
        <input
          placeholder="שם פרטי"
          {...register("firstName")} //, { required: "First Name Required" }
        />
      </div>

      <div>
        <label htmlFor="lastName">שם משפחה: </label>
        <input
          placeholder="שם משפחה"
          {...register("lastName")} // , { required: "First Name Required" }
        />
      </div>

      <div>
        <label htmlFor="email">דואר אלקטרוני </label>
        <input
          placeholder="דואר אלקטרוני"
          {...register("email", { required: "Email Required" })} // , { required: "Email Required" }
        />
      </div>

      <div>
        <label htmlFor="password">סיסמה</label>
        <input
          placeholder="סיסמה"
          {...register("password", { required: "Password Required" })} // , { required: "Email Required" }
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">סיסמה confirm </label>
        <input
          placeholder="סיסמה"
          {...register("confirmPassword", { required: "Password Required" })} // , { required: "Email Required" }
        />
      </div>

      <div>
        <label htmlFor="phone">טלפון: </label>
        <input
          placeholder="טלפון"
          {...register("phone")} // , { required: "Phone Required" }
        />
      </div>

      <div>
        <label htmlFor="code">קוד: </label>
        <input
          placeholder="קוד"
          {...register("code")} // , { required: "Phone Required" }
        />
      </div>

      <input type="submit" />
    </form>
  );
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  code: string;
};
