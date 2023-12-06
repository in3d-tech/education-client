import { useForm } from "react-hook-form";
import { useAppContext } from "../context/appContext";

type LoginProps = {
  setUserSignup: React.Dispatch<React.SetStateAction<boolean>>;
};

const tempUser = {
  userId: "26040550-3950-424e-ba29-ee5382d4c6e0",
  name: "jon",
  // lastName: "marks",
  email: "jmarks@put.com",
  phone: "0577777777",
  role: "teacher",
};

export function Login({ setUserSignup }: LoginProps) {
  const { setUser } = useAppContext();

  const Form: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
      if (data.email == "jeremy@gmail.il") {
        setUser(tempUser);
      } else {
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
        } catch {
          alert("error with login ");
          console.log("error with login");
        }
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
            שלך (x2)
          </button>
          <button
            onClick={() => setUserSignup(true)}
            className="btn"
            type="submit"
          >
            Signup
          </button>
        </div>
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
