import { ChangeEvent, useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Navbar } from "../navigation/Navbar";
import { useFetch } from "../common/logic/useFetch";

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

  const { user } = useAppContext();

  try {
    const { error, response } = useFetch(
      "/account",
      JSON.stringify({
        userId: user?.userId,
        method: "getAccountDetails",
      })
    );

    useEffect(() => {
      if (response) {
        setAccountDetails(response);
      }
      if (error) {
        console.error("Error fetching my lessons:", error);
      }
    }, [response, error]);
  } catch (error) {
    console.error("Error fetching my lessons:", error);
  }

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

      const { error }: any = useFetch("/upload", formData);
      // add something if uploaded correctly
      if (error) {
        console.log(error);
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
