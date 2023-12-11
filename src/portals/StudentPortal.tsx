import Modal from "react-modal";
import { useState } from "react";
import { User } from "../App";
import { MyLessons } from "./lessons/MyLessons";
import { Navbar } from "../navigation/Navbar";
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
        {/* <MyLessonsModal
          user={user}
          role={user?.role}
          onCloseClick={onCloseClick}
          handleModel={handleModel}
          modalIsOpen={modalIsOpen}
        /> */}
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

        <a href="/assets/hello-cube.html">Quick jump to camera</a>

        <button className="student-btn" onClick={() => handleModel(false)}>
          My Lessons
        </button>

        <button
          style={{
            background: 'url("/assets/images/statistics.jpg") no-repeat center',
            color: "black",
            backgroundSize: "cover",
          }}
          className="student-btn"
        >
          My Statistics
        </button>
      </div>
    </div>
  );
}
