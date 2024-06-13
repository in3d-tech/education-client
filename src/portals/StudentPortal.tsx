import Modal from "react-modal";
import { useState } from "react";
import { User } from "../App";
import { MyLessons } from "./lessons/MyLessons";
import { Navbar } from "../navigation/Navbar";
import { Link } from "react-router-dom";
// import { MyLessonsModal } from "./lessons/MyLessonsModal";

type StudentPortalProps = {
  user: User;
};

export function StudentPortal({ user }: StudentPortalProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleModel = (prevState: boolean) => {
    setModalIsOpen(!prevState);
  };

  // const onCloseClick = () => {
  //   handleModel(modalIsOpen);
  // };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navbar user={user} title={"פורטל תלמידים"} />
      <div className="portal-wrapper">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleModel(modalIsOpen)}
          contentLabel="My lessons"
          style={{
            content: {
              padding: 0,
              overflow: "hidden",
              boxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
              WebkitBoxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
            },
          }}
        >
          <MyLessons
            orgCode={user?.orgCode}
            userId={user?.userId}
            role={user?.role}
            // onCloseClick={onCloseClick}
          />
        </Modal>
        <button className="student-btn" onClick={() => handleModel(false)}>
          My Lessons
        </button>

        <Link
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          to="/account"
        >
          <button
            className="student-btn"
            style={{
              background:
                'url("/assets/images/my-account.jpg") no-repeat center',
              color: "black",
              backgroundSize: "contain",
            }}
            onClick={() => handleModel(false)}
          >
            My Account
          </button>
        </Link>

        <button
          className="student-btn"
          style={{
            background: 'url("/assets/images/statistics.jpg") no-repeat center',
            color: "black",
            backgroundSize: "contain",
            opacity: 0.6,
          }}
        >
          Feature Coming Soon
        </button>

        <button
          className="student-btn"
          style={{
            background: 'url("/assets/images/statistics.jpg") no-repeat center',
            color: "black",
            backgroundSize: "contain",
            opacity: 0.6,
          }}
        >
          My Statistics
        </button>
      </div>
    </div>
  );
}
