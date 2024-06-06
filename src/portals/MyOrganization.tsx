import { useAppContext } from "../context/appContext";
import { Navbar } from "../navigation/Navbar";

export function MyOrganization() {
  const { user } = useAppContext();
  return (
    <>
      <Navbar user={user} title={"Org Name"} />
      <div>
        <div>search for Members of org</div>
        <div>add someone to org</div>
      </div>
    </>
  );
}
