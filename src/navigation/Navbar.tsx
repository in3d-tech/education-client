// import { Link } from "react-router-dom";
// import { User } from "../App";
// import { capitalizeFirstLetter } from "../common/logic/capitalizeFirstLetter";

// type NavbarProps = { user?: User; title: string };

// export function Navbar({ user, title }: NavbarProps) {
//   return (
//     <div className="nav-wrapper">
//       {/* <div> */}
//       <Link to={"/"} className="nav-left-corner">
//         <img
//           style={{ width: "9em", marginLeft: "0.5em" }}
//           src="/assets/images/logo.png"
//         />
//       </Link>
//       {/* </div> */}
//       <div className="nav-title">
//         <h3 className="portal-title">{title}</h3>
//       </div>
//       <div className="nav-name">
//         <h3
//           style={{ color: "black", fontFamily: "gotham", marginRight: "2em" }}
//         >
//           {user ? `היי ${capitalizeFirstLetter(user?.name)}` : ""}
//           {/* <a type="button" href="/hello-cube.html">
//             Quick look
//           </a> */}
//         </h3>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { User } from "../App";
import { capitalizeFirstLetter } from "../common/logic/capitalizeFirstLetter";
import "./Navbar.css";

type NavbarProps = { user?: User; title: string; serverUp?: boolean };

export function Navbar({ user, title, serverUp = false }: NavbarProps) {
  return (
    <nav className="holo-nav">
      {/* Logo / Home link */}
      <Link to="/" className="holo-nav-logo-link">
        <img
          className="holo-nav-logo"
          src="/assets/images/logo.png"
          alt="Logo"
        />
      </Link>

      {/* Page title */}
      <h1 className="holo-nav-title">{title}</h1>
      <span
        className={`server-dot ${serverUp ? "server-dot--up" : "server-dot--down"}`}
        title={serverUp ? "Server connected" : "Server offline"}
      />

      {/* User greeting */}
      <div className="holo-nav-user">
        {user ? (
          <>
            <span className="holo-nav-greeting">
              היי {capitalizeFirstLetter(user.name)}
            </span>
            <span className="holo-nav-avatar">
              {user.name?.[0]?.toUpperCase() || "?"}
            </span>
          </>
        ) : (
          <span className="holo-nav-spacer" />
        )}
      </div>
    </nav>
  );
}
