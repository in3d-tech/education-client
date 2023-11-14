import { useForm } from "react-hook-form";
import useFetch from "../common/useFetch";

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
    console.log("submitting sign-in");
    console.log(data);
    try {
      //   const res = fetch("http://localhost:3000/signup");
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: null,
          endDate: null,
        }),
      }); //useFetch("/signup");
      console.log("this is the signup res!~");
      console.log({ res });
      const data = await res.json();
      console.log("dataaaaa", { data });
    } catch (error) {
      console.log(error);
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
        <label htmlFor="role">Role: </label>
        <select {...register("role")}>
          <option value="administrator">Administrator</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="other">Other</option>
        </select>
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
  role: string;
};
