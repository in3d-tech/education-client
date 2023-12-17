import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Navbar } from "../navigation/Navbar";

type AccountDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | number;
} | null;

export function MyAccountDetails() {
  const [accountDetails, setAccountDetails] = useState<AccountDetails>(null);
  const { user } = useAppContext();

  console.log(user);
  const getUserData = async () => {
    try {
      const response = await fetch("http://192.168.1.224:3000/account", {
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
      } else {
        console.error("Error fetching my lessons. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching my lessons:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Navbar title="My Account" />
      {accountDetails ? (
        <div>
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
            <div className="my-account-deets-row">{accountDetails.email}</div>
          </div>
          <div className="my-account-details-container">
            <div>טלפון:</div>
            <div className="my-account-deets-row">{accountDetails.phone}</div>
          </div>
        </div>
      ) : (
        <div style={{ color: "black" }}>Loading details...</div>
      )}
    </>
  );
}
