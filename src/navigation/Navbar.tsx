import { User } from "../App";
import { capitalizeFirstLetter } from "../common/logic/capitalizeFirstLetter";

type NavbarProps = { user?: User; title: string };

export function Navbar({ user, title }: NavbarProps) {
  return (
    <div className="nav-wrapper">
      <div className="nav-left-corner">
        <img
          style={{ width: "50%", height: "90%", marginLeft: "2em" }}
          src="/assets/images/logo.png"
        />
      </div>
      <div className="nav-title">
        <h3 className="portal-title">{title}</h3>
      </div>
      <div className="nav-name">
        <h3
          style={{ color: "black", fontFamily: "gotham", marginRight: "2em" }}
        >
          {user ? `היי ${capitalizeFirstLetter(user?.name)}` : ""}
          <a type="button" href="/hello-cube.html">
            Quick look
          </a>
        </h3>
      </div>
    </div>
  );
}
