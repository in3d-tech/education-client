import { useState, Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
import { User } from "../App";
import { MyLessons } from "./lessons/MyLessons";
// import { Link } from "react-router-dom";
import { Navbar } from "../navigation/Navbar";
import { CreateLessonForm } from "./lessons/CreateLesson";
import { Link } from "react-router-dom";

type TeacherPortalProps = {
  user: User;
};

export function TeacherPortal({ user }: TeacherPortalProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentLessonsModal, setCurrentLessonsModal] =
    useState<boolean>(false);

  const handleModel = (prevState: boolean) => {
    setModalIsOpen(!prevState);
  };

  const handleCurrentLessonsModal = (prevState: boolean) => {
    setCurrentLessonsModal(!prevState);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navbar user={user} title={"פורטל מורים"} />
      <div className="teacher-portal-wrapper">
        <CreateLesson
          handleModel={handleModel}
          modalIsOpen={modalIsOpen}
          user={user}
          setModalIsOpen={setModalIsOpen}
        />
        <MyLesson
          handleCurrentLessonsModal={handleCurrentLessonsModal}
          currentLessonsModal={currentLessonsModal}
          user={user}
        />
        <Link
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          to="/account"
        >
          <button className="btn" onClick={() => handleModel(false)}>
            My Account
          </button>
        </Link>
        {!user?.isAdmin ? (
          <Link
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            to="/myOrg"
          >
            <button className="btn" onClick={() => handleModel(false)}>
              My Organization
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

type CreateLessonProps = {
  user: User;
  handleModel: (prevState: boolean) => void;
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateLesson = ({
  handleModel,
  modalIsOpen,
  user,
  setModalIsOpen,
}: CreateLessonProps) => {
  return (
    <>
      <button className="btn" onClick={() => handleModel(false)}>
        New Lesson
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => handleModel(modalIsOpen)}
        contentLabel="Create Lesson Modal"
        style={{
          content: {
            background: "black",
            opacity: 0.8,
            padding: 0,
            overflowY: "scroll",
            boxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
            WebkitBoxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <div
          style={{
            height: "100%",
          }}
        >
          <CreateLessonForm
            setModalIsOpen={setModalIsOpen}
            userId={user?.userId}
            orgCode={user ? user.orgCode : 0}
          />
        </div>
      </Modal>
    </>
  );
};

type MyLessonProps = {
  user: User;
  handleCurrentLessonsModal: (prevState: boolean) => void;
  currentLessonsModal: boolean;
};

const MyLesson = ({
  handleCurrentLessonsModal,
  currentLessonsModal,
  user,
}: MyLessonProps) => {
  return (
    <>
      <button className="btn" onClick={() => handleCurrentLessonsModal(false)}>
        My Lessons
      </button>
      <Modal
        isOpen={currentLessonsModal}
        onRequestClose={() => handleCurrentLessonsModal(currentLessonsModal)}
        contentLabel="Create Lesson Modal"
        style={{
          content: {
            padding: 0,
            // overflow: "scroll",
            boxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
            WebkitBoxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        {/* <div>
          <button
            onClick={() => handleCurrentLessonsModal(currentLessonsModal)}
          >
            close
          </button>
        </div> */}
        <MyLessons
          userId={user?.userId}
          role={user?.role}
          handleCurrentLessonsModal={handleCurrentLessonsModal}
          currentLessonsModal={currentLessonsModal}
        />

        {/* </div> */}
      </Modal>
    </>
  );
};
