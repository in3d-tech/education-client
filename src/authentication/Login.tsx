import { useForm } from "react-hook-form";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";

type LoginProps = {
  setUserSignup: React.Dispatch<React.SetStateAction<boolean>>;
  isStudentLogin: boolean;
  setIsStudentLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const tempUser = {
  userId: "26040550-3950-424e-ba29-ee5382d4c6e0",
  name: "Demo User",
  role: "teacher",
  orgCode: "Gy1jU4",
  orgName: "Demo",
};

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

    const onSubmit = async (data: FormData) => {
      try {
        const validatedLoginData = validateLogin(data, isStudentLogin);

        if (validatedLoginData !== true) {
          console.log("dont wanna be here", { validatedLoginData });
          if (
            validatedLoginData == "emailLengthError" ||
            validatedLoginData == "passwordLengthError" ||
            validatedLoginData == "invalidOrgCode"
          )
            setError(
              "There was an issue with your credentials. Please try again"
            );
          return;
        }

        if (isStudentLogin) {
          const studentLoginData = data as StudentLogin;
          if (studentLoginData.orgCode === "0") {
            setUser(tempUser);
            return;
          }
        }

        const response = await fetch("http://192.168.1.224:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const res = await response.json();
        console.log("THE LOGIN RES");
        console.log({ res });

        if (res && res.userObj) {
          setUser(res.userObj);
          if (res.token) {
            console.log("supppp login");
            setToken(res.token);
          }
        } else if (!res || res.error) {
          setError(`${res.error}`);
        }
      } catch {
        alert("error with login ");
        console.log("error with login 5");
      }
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            width: "4em",
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
            bottom: "3em",
            width: "80%",
            textAlign: "center",
            color: "black",
          }}
        >
          *In order to try our demo, just type the number '0' as the
          organization code
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

const validateLogin = (loginData: FormData, isStudentLogin: boolean) => {
  if (!loginData) {
    return null;
  }
  if (isStudentLogin) {
    const studentLogin = loginData as StudentLogin;
    if (studentLogin.orgCode != "0") {
      if (studentLogin.orgCode.length !== 6) {
        return "invalidOrgCode";
      }
    }
  }
  if (!isStudentLogin) {
    const teacherAdminLogin = loginData as TeacherAdminLogin;

    if (teacherAdminLogin.email.length < 5) return "emailLengthError";
    if (teacherAdminLogin.password.length < 6) return "passwordLengthError";
  }

  return true;
};

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
