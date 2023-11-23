import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

export function TeacherPortal() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleModel = (prevState: boolean) => {
    setModalIsOpen(!prevState);
  };

  return (
    <div>
      <div>
        <h1>teacher portal</h1>
      </div>
      <div>
        <button onClick={() => handleModel(false)}>New Lesson</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleModel(modalIsOpen)}
          contentLabel="Create Lesson Modal"
        >
          <h1 style={{ color: "black" }}>Create Lesson</h1>
          <CreateLessonForm />
          <button onClick={() => handleModel(modalIsOpen)}>close</button>
          {/* Your form or any other content can go here */}
        </Modal>
        <button>Current Lessons</button>
      </div>
    </div>
  );
}

const CreateLessonForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:3000/create-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      return res;
    } catch {
      console.log("error with signup");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="headline">Headline: </label>
        <input
          placeholder="Headline"
          {...register("headline")} //, { required: "First Name Required" }
        />
      </div>

      <div>
        <label htmlFor="description">Description: </label>
        <input
          placeholder="Last Name"
          {...register("description")} // , { required: "First Name Required" }
        />
      </div>

      <div>
        <label htmlFor="instructions">Instructions: </label>
        <input
          placeholder="Instructions"
          {...register("instructions")} // , { required: "Email Required" }
        />
      </div>

      <div>
        <label htmlFor="language">Language: </label>
        <input
          placeholder="Language"
          {...register("language")} // , { required: "Phone Required" }
        />
      </div>

      <div>
        <label htmlFor="class">Class: </label>
        <select {...register("class")}>
          {[...Array(12).keys()].map((number) => (
            <option key={number + 1} value={number + 1}>
              {number + 1}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" />
    </form>
  );
};

type FormData = {
  headline: string;
  description: string;
  instructions: string;
  language: string;
  class: string | number;
};
