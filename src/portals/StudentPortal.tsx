import Modal from "react-modal";
import { useState } from "react";
import { User } from "../App";
import { MyLessons } from "./lessons/MyLessons";
import { Navbar } from "../navigation/Navbar";

type StudentPortalProps = {
  user: User;
};

export function StudentPortal({ user }: StudentPortalProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleModel = (prevState: boolean) => {
    setModalIsOpen(!prevState);
  };
  return (
    <div>
      <Navbar user={user} title={"פורטל תלמידים"} />
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleModel(modalIsOpen)}
          contentLabel="Create Lesson Modal"
        >
          <MyLessons userId={user?.userId} role={user?.role} />
          <button onClick={() => handleModel(modalIsOpen)}>close</button>
          {/* Your form or any other content can go here */}
        </Modal>
        <button onClick={() => handleModel(false)}>My Lessons</button>
      </div>
    </div>
  );
}
