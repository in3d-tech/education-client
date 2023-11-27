import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { User } from "../App";
import { MyLessons } from "./lessons/MyLessons";
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
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2em",
      }}
    >
      <div>
        <h1 style={{ color: "black" }}>teacher portal</h1>
      </div>
      <div className="portal-wrapper">
        <button className="btn" onClick={() => handleModel(false)}>
          New Lesson
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleModel(modalIsOpen)}
          contentLabel="Create Lesson Modal"
        >
          <h1 style={{ textAlign: "center", color: "black" }}>Create Lesson</h1>
          <CreateLessonForm
            setModalIsOpen={setModalIsOpen}
            userId={user?.userId}
          />
          {/* <button onClick={() => handleModel(modalIsOpen)}>close</button> */}
          {/* Your form or any other content can go here */}
        </Modal>
        <button
          className="btn"
          onClick={() => handleCurrentLessonsModal(false)}
        >
          My Lessons
        </button>
        <Modal
          isOpen={currentLessonsModal}
          onRequestClose={() => handleCurrentLessonsModal(currentLessonsModal)}
          contentLabel="Create Lesson Modal"
        >
          <div className="form-bg lessons-center">
            <h2 style={{ color: "black" }}>My Lessons</h2>

            <MyLessons userId={user?.userId} />
            <div>
              <Link to="/lesson">
                <button> {"fake click this for camera"}</button>
              </Link>
            </div>
            <button
              onClick={() => handleCurrentLessonsModal(currentLessonsModal)}
            >
              close
            </button>
          </div>

          {/* Your form or any other content can go here */}
        </Modal>
      </div>
    </div>
  );
}

type LessonFormProps = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
};

const CreateLessonForm = ({ setModalIsOpen, userId }: LessonFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    data.userId = userId;
    try {
      const response = await fetch("http://192.168.1.224:3000/create-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log({ res });
      if (res.acknowledged == true) {
        setModalIsOpen(false);
      } else {
        alert("issue creating lesson");
      }
    } catch {
      console.log("error with signup");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-bg">
      <div className="input-container">
        {/* <label htmlFor="headline">Headline: </label> */}
        <input
          placeholder="Headline"
          {...register("headline")} //, { required: "First Name Required" }
          style={{ color: "black" }}
        />
      </div>

      <div className="input-container">
        {/* <label htmlFor="description">Description: </label> */}
        <input
          placeholder="Description"
          {...register("description")} // , { required: "First Name Required" }
          style={{ color: "black" }}
        />
      </div>

      <div className="input-container">
        {/* <label htmlFor="instructions">Instructions: </label> */}
        <input
          placeholder="Instructions"
          {...register("instructions")} // , { required: "Email Required" }
          style={{ color: "black" }}
        />
      </div>

      <div>
        <label htmlFor="language" style={{ color: "black" }}>
          שפה:
        </label>
        <select {...register("language")}>
          <option value="he">Hebrew</option>
          <option value="ar">Arabic</option>
        </select>
      </div>

      <div>
        <label htmlFor="class" style={{ color: "black" }}>
          כיתה:
        </label>
        <select {...register("class")}>
          {[...Array(12).keys()].map((number) => (
            <option key={number + 1} value={number + 1}>
              {number + 1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="model" style={{ color: "black" }}>
          Choose Model:
        </label>
        <select {...register("model")}>
          <option value="square">Square</option>
          <option value="circle">Circle</option>
        </select>
      </div>

      <div>
        <label htmlFor="upload"></label>
        <input type="file" />
      </div>

      <input className="btn" style={{ width: "20%" }} type="submit" />
    </form>
  );
};

type FormData = {
  headline: string;
  description: string;
  instructions: string;
  language: string;
  class: string | number;
  userId?: string;
  model: string;
};
