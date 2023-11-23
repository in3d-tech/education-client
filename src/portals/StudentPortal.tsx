import Modal from "react-modal";
import { useState } from "react";

export function StudentPortal() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [activeLessons, setActiveLessons] = useState<any[]>([
    { title: "first lesson" },
    { title: "second lesson" },
  ]);

  const handleModel = (prevState: boolean) => {
    setModalIsOpen(!prevState);
  };
  return (
    <div>
      <div>
        <h1>Student portal</h1>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleModel(modalIsOpen)}
          contentLabel="Create Lesson Modal"
        >
          {activeLessons.length
            ? activeLessons.map((lesson) => {
                return (
                  <div>
                    <button>{lesson.title}</button>
                  </div>
                );
              })
            : null}
          <h1 style={{ color: "black" }}>Create Lesson</h1>
          <button onClick={() => handleModel(modalIsOpen)}>close</button>
          {/* Your form or any other content can go here */}
        </Modal>
        <button onClick={() => handleModel(false)}>My Lessons</button>
      </div>
    </div>
  );
}
