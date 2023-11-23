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
        <label htmlFor="lastName">Last Name: </label>
        <input
          placeholder="Last Name"
          {...register("lastName")} // , { required: "First Name Required" }
        />
      </div>

      <div>
        <label htmlFor="email">Email: </label>
        <input
          placeholder="Email"
          {...register("email", { required: "Email Required" })} // , { required: "Email Required" }
        />
      </div>

      <div>
        <label htmlFor="phone">Phone: </label>
        <input
          placeholder="Phone"
          {...register("phone")} // , { required: "Phone Required" }
        />
      </div>

      <div>
        <label htmlFor="code">code: </label>
        <input
          placeholder="code"
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
  phone: string;
  code: string;
};
