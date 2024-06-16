import { ChangeEvent, useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Navbar } from "../navigation/Navbar";
import { useFetch } from "../common/logic/useFetch";
import { Link } from "react-router-dom";

type AccountDetails = {
  firstName: string;
  lastName: string;
  email: string;
  profilePic?: string;
} | null;

const defaultUserPic =
  "https://res.cloudinary.com/dxminwnb3/image/upload/v1702805169/fake-user_kwwbfv.png";

function MyAccountDetails() {
  const [accountDetails, setAccountDetails] = useState<AccountDetails>(null);
  const [file, setFile] = useState<File | null>(null);

  const { user, setUser, setToken } = useAppContext();

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
          }}
        >
          <div
            style={{
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              // width: "50%",
            }}
          >
            <img
              style={{
                height: "10em",
                width: "10em",
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
              style={{
                marginTop: "5.3em",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <input
                type="file"
                onChange={handleFileChange}
                // style={{ borderRadius: "12px", width:'4em' }}
              />
              <button className="edit-profile-pic-btn" onClick={handleUpload}>
                שלח
              </button>
            </div>

            {accountDetails ? (
              <div
                style={{
                  border: "1px solid grey",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="my-account-details-container">
                  <div>שם:</div>
                  <div className="my-account-deets-row">
                    {accountDetails.firstName}{" "}
                    <span>{accountDetails.lastName}</span>
                  </div>
                </div>

                <div className="my-account-details-container">
                  <div>דואר אלקטרוני</div>
                  <div className="my-account-deets-row">
                    {accountDetails.email}
                  </div>
                </div>

                {/* <button style={{}} className="btn">
                  Edit
                </button> */}
                <div
                  style={{
                    width: "90%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to={"/"}
                    onClick={() => {
                      setUser(null);
                      setToken(null);
                    }}
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button className="btn"> להתנתק</button>
                  </Link>
                </div>
                <div style={{ height: "50px" }}></div>
              </div>
            ) : (
              <div style={{ color: "black" }}>Loading details...</div>
            )}
          </div>

          {/* {accountDetails ? (
            <button style={{}} className="btn">
              Edit
            </button>
          ) : null} */}
        </div>
      )}
    </>
  );
}

export default MyAccountDetails;
