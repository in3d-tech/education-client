import { useForm } from "react-hook-form";
// import useFetch from "../common/useFetch";
import { User } from "../App";

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export function Login({ setUser }: LoginProps) {
  const Form: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        setUser(res);
        return res;
      } catch {
        console.log("error with login");
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">דואר אלקטרוני:</label>
          <input
            placeholder="דואר אלקטרוני"
            {...register("email")} //, { required: "First Name Required" }
          />
        </div>

        <div>
          <label htmlFor="password">סיסמה: </label>
          <input
            placeholder="סיסמה"
            {...register("password")} // , { required: "First Name Required" }
          />
        </div>

        <button type="submit">שלך</button>
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
