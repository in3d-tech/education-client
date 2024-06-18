export const onSubmit = async (
  data: FormData,
  isStudentLogin: boolean,
  setError: React.Dispatch<React.SetStateAction<any>>,
  setUser: React.Dispatch<React.SetStateAction<any>>,
  setToken: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const validatedLoginData = validateLogin(data, isStudentLogin);

    if (validatedLoginData !== true) {
      if (
        validatedLoginData == "emailLengthError" ||
        validatedLoginData == "passwordLengthError" ||
        validatedLoginData == "invalidOrgCode"
      )
        setError("There was an issue with your credentials. Please try again");
      return;
    }

    // const response = await fetch("http://192.168.1.224:3000/login", {
    const response = await fetch("https://edu-server-ke5y.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    console.log("THE LOGIN RES");
    console.log({ res });

    if (isStudentLogin && res) {
      // const studentLoginData = data as StudentLogin;
      // if (studentLoginData.orgCode === "0") {
      setUser(res);
      if (res.token) {
        setToken(res.token);
      }

      // }
    }

    if (!isStudentLogin && res && res.userObj) {
      setUser(res.userObj);
      if (res.token) {
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
