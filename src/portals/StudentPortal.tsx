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

  const onCloseClick = () => {
    handleModel(modalIsOpen);
  };
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
            userId={user?.userId}
            role={user?.role}
            onCloseClick={onCloseClick}
          />
        </Modal>

        {/* <a href="/hello-cube.html">Quick jump to camera</a>
        <Link to="/test">jumpTo module</Link> */}
        {/* <div>
          HEloo world!
          <div>
            <Link
              className="student-btn"
              onClick={() => handleModel(false)}
              style={{
                background:
                  'url("/assets/images/my-account.jpg") no-repeat center',
                color: "black",
                backgroundSize: "contain",
              }}
              to="/testLesson"
            >
              TO TEST LESSON
            </Link>
          </div>
        </div> */}
        <div
          style={{
            width: "90%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "1em",
          }}
        >
          <button className="student-btn" onClick={() => handleModel(false)}>
            My Lessons
          </button>
          {/* <img src="https://res.cloudinary.com/dxminwnb3/image/upload/v1702805169/fake-user_kwwbfv.png" /> */}
          {/* https://res.cloudinary.com/dxminwnb3/image/upload/v1702822789/HJNb7FR.md_b6btwm.jpg */}
          <Link to="/account">
            <button
              className="student-btn"
              onClick={() => handleModel(false)}
              style={{
                background:
                  'url("/assets/images/my-account.jpg") no-repeat center',
                color: "black",
                backgroundSize: "contain",
              }}
            >
              My Account
            </button>
          </Link>
          <button
            style={{
              background:
                'url("/assets/images/statistics.jpg") no-repeat center',
              color: "black",
              backgroundSize: "contain",
              opacity: 0.8,
            }}
            className="student-btn"
          >
            Feature Coming Soon
          </button>
          <button
            style={{
              background:
                'url("/assets/images/statistics.jpg") no-repeat center',
              color: "black",
              backgroundSize: "contain",
            }}
            className="student-btn"
          >
            My Statistics
          </button>
        </div>
      </div>
    </div>
  );
}
