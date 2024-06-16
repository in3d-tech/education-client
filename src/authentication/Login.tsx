import { useForm } from "react-hook-form";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import { onSubmit } from "./logic/submitAuthForms";

type LoginProps = {
  setUserSignup: React.Dispatch<React.SetStateAction<boolean>>;
  isStudentLogin: boolean;
  setIsStudentLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

// const tempUser = {
//   userId: "26040550-3950-424e-ba29-ee5382d4c6e0",
//   name: "Demo User",
//   role: "teacher",
//   orgCode: "Gy1jU4",
//   orgName: "Demo",
// };

export function Login({
  setUserSignup,
  setIsStudentLogin,
  isStudentLogin,
}: LoginProps) {
  const [error, setError] = useState("");
  const { setUser, setToken } = useAppContext();

  useEffect(() => {
    if (!error) {
      return;
    }
    const errorTimeout = setTimeout(() => setError(""), 2300);
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [error]);

  const Form: React.FC = () => {
    const {
      register,
      handleSubmit,
      // formState: { errors },
    } = useForm<StudentLogin | TeacherAdminLogin>();

    // const onSubmit = async (data: FormData) => {
    //   try {
    //     const validatedLoginData = validateLogin(data, isStudentLogin);

    //     if (validatedLoginData !== true) {
    //       if (
    //         validatedLoginData == "emailLengthError" ||
    //         validatedLoginData == "passwordLengthError" ||
    //         validatedLoginData == "invalidOrgCode"
    //       )
    //         setError(
    //           "There was an issue with your credentials. Please try again"
    //         );
    //       return;
    //     }

    //     const response = await fetch("http://192.168.1.224:3000/login", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(data),
    //     });

    //     const res = await response.json();
    //     console.log("THE LOGIN RES");
    //     console.log({ res });

    //     if (isStudentLogin && res) {
    //       // const studentLoginData = data as StudentLogin;
    //       // if (studentLoginData.orgCode === "0") {
    //       setUser(res);
    //       return;

    //       // }
    //     }

    //     if (!isStudentLogin && res && res.userObj) {
    //       setUser(res.userObj);
    //       if (res.token) {
    //         setToken(res.token);
    //       }
    //     } else if (!res || res.error) {
    //       setError(`${res.error}`);
    //     }
    //   } catch {
    //     alert("error with login ");
    //     console.log("error with login 5");
    //   }
    // };

    return (
      <form
        onSubmit={handleSubmit((data: FormData) =>
          onSubmit(data, isStudentLogin, setError, setUser, setToken)
        )}
        className="signup-form-wrapper"
        style={{ marginTop: "8em" }}
      >
        {isStudentLogin ? (
          <StudentLogin register={register} />
        ) : (
          <TeacherAdminLogin register={register} />
        )}
        <div className="auth-btns-wrapper">
          <button className="btn" type="submit">
            התחבר
          </button>
          {isStudentLogin ? null : (
            <button
              onClick={() => setUserSignup(true)}
              className="btn"
              type="submit"
            >
              להירשם
            </button>
          )}
        </div>
      </form>
    );
  };

  return (
    <div className="auth-child signup-wrapper">
      <Form />
      <div
        style={{
          display: "flex",
          width: "20em",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "3em",
          color: "black",
        }}
      >
        {isStudentLogin ? "מורה או מנהל? היכנס" : ""}
        <button
          className=""
          style={{
            border: "1px solid rgb(0, 0, 0, 0.4)",
            borderRadius: "12px",
            width: "4.5em",
            background: "unset",
            fontSize: "1.2em",
            textDecoration: "underline",
            boxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.25)",

            // -webkit-box-shadow: '-2px 2px 15px 1px rgba(0, 0, 0, 0.25)',
            // -moz-box-shadow: '-2px 2px 15px 1px rgba(0, 0, 0, 0.25)'
          }}
          onClick={() => setIsStudentLogin(!isStudentLogin)}
        >
          {isStudentLogin ? "כאן" : "חזור"}
        </button>
      </div>
      {error ? (
        <h4 style={{ color: "red", textAlign: "center" }}>{`${error}`}</h4>
      ) : null}
      {isStudentLogin ? (
        <div
          style={{
            position: "absolute",
            bottom: "3.5em",
            width: "70%",
            textAlign: "center",
            color: "black",
            fontSize: "1.1em",
            fontWeight: 600,
          }}
        >
          כדי לנסות את ההדגמה שלנו, הקלד את המספר '0' בתור קוד הארגון
          {/* *In order to try our demo, just type the number '0' as the
          organization code */}
        </div>
      ) : null}
    </div>
  );
}

type StudentLogin = {
  orgCode: string;
};

type TeacherAdminLogin = {
  email: string;
  password: string;
};

type FormData = StudentLogin | TeacherAdminLogin;

const TeacherAdminLogin = ({ register }: any) => {
  return (
    <>
      <div className="input-container">
        <input
          style={{ color: "black" }}
          placeholder="שם משתמש" //"דואר אלקטרוני"
          {...register("email", { required: "Email is required" })} //, { required: "First Name Required" }
        />
      </div>

      <div className="input-container">
        <input
          style={{ color: "black" }}
          placeholder="סיסמה"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
      </div>
    </>
  );
};

const StudentLogin = ({ register }: any) => {
  return (
    <>
      <div className="input-container">
        <input
          style={{ color: "black" }}
          placeholder="קוד ארגון" //"דואר אלקטרוני"
          {...register("orgCode", {
            required: "Organization Code is required",
          })} //, { required: "First Name Required" }
        />
      </div>
    </>
  );
};
