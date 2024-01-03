import { ChangeEvent, useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Navbar } from "../navigation/Navbar";

type AccountDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | number;
  profilePic?: string;
} | null;

const defaultUserPic =
  "https://res.cloudinary.com/dxminwnb3/image/upload/v1702805169/fake-user_kwwbfv.png";

export function MyAccountDetails() {
  const [accountDetails, setAccountDetails] = useState<AccountDetails>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { user } = useAppContext();

  const getUserData = async () => {
    try {
      setIsFetching(true);
      const response = await fetch("http://192.168.1.224:3000/account", {
        // const response = await fetch("http://192.168.1.224:3000/account", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.userId,
          method: "getAccountDetails",
        }),
      });

      if (response.ok) {
        const accountData = await response.json();
        setAccountDetails(accountData);
        setIsFetching(false);
      } else {
        console.error("Error fetching my lessons. Status:", response.status);
      }
    } catch (error) {
      setIsFetching(false);
      console.error("Error fetching my lessons:", error);
      console.log(isFetching);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("no file to send");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file!);
      formData.append("userId", user?.userId!);

      const response = await fetch(
        "https://edu-server-ke5y.onrender.com/upload",
        {
          // const response = await fetch("http://192.168.1.224:3000/upload", {

          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Error uploading file. Status:", response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <Navbar title="My Account" />
      {!accountDetails ? null : (
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <div
            style={{
              color: "black",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{
                height: "50%",
                width: "50%",
                marginTop: "2em",
                borderRadius: "50%",
              }}
              className="profile-pic"
              // src="/assets/images/default-user.webp"
              src={
                accountDetails?.profilePic
                  ? accountDetails.profilePic
                  : defaultUserPic
              }
            />
            <div
              className="my-account-details-container"
              style={{ marginTop: "5.3em" }}
            >
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload</button>
            </div>
          </div>
          {accountDetails ? (
            <div style={{ flex: 1 }}>
              <div className="my-account-details-container">
                <div>שם פרטי:</div>
                <div className="my-account-deets-row">
                  {accountDetails.firstName}
                </div>
              </div>
              <div className="my-account-details-container">
                <div>שם משפחה: </div>
                <div className="my-account-deets-row">
                  {accountDetails.lastName}
                </div>
              </div>
              <div className="my-account-details-container">
                <div>דואר אלקטרוני</div>
                <div className="my-account-deets-row">
                  {accountDetails.email}
                </div>
              </div>
              <div className="my-account-details-container">
                <div>טלפון:</div>
                <div className="my-account-deets-row">
                  {accountDetails.phone}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: "black" }}>Loading details...</div>
          )}
          {accountDetails ? (
            <button
              style={{ position: "absolute", bottom: "16em", right: "30%" }}
              className="btn"
            >
              Edit
            </button>
          ) : null}
        </div>
      )}
    </>
  );
}
