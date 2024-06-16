import { useAppContext } from "../context/appContext";
import { Navbar } from "../navigation/Navbar";

export function MyOrganization() {
  const { user } = useAppContext();
  return (
    <>
      <Navbar user={user} title={"Org Name"} />
      <div
        style={{
          // textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <div>search for Members of org</div> */}
        <div
          style={{
            marginTop: "2em",
            width: "90%",
            borderRadius: "4px",
            height: "60vh",
            background: "rgb(0,0,0,0.5)",
            padding: "12px",
            textAlign: "center",
            fontSize: "1.3em",
          }}
        >
          Your organization has 0 members
        </div>
      </div>
    </>
  );
}
