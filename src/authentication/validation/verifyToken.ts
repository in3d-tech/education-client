export const verifyToken = async ({ token, setToken, setUser }: any) => {
  console.log("just arrived EH!");

  if (!token) {
    console.log("NO ACCESS TOKEN");
    return;
  }

  try {
    const verifyToken: any = await fetch(
      // "http://192.168.1.224:3000/verify-token",
      "https://edu-server-ke5y.onrender.com/verify-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
      }
    );
    const response = await verifyToken.json();
    console.log("in verify token function");
    console.log({ response });
    if (response) {
      setUser(response);
    } else {
      setToken(null);
    }
  } catch (error) {
    console.error("Token verification error:", error);
    setToken(null);
  }
};
