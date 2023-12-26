import { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { User } from "../App";
import { MyLessons } from "./lessons/MyLessons";
import { Link } from "react-router-dom";
import { Navbar } from "../navigation/Navbar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
      <div className="portal-wrapper">
        <button className="btn" onClick={() => handleModel(false)}>
          New Lesson
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleModel(modalIsOpen)}
          contentLabel="Create Lesson Modal"
          style={{
            content: {
              padding: 0,
              overflow: "scroll",
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
            <h1 style={{ textAlign: "center", color: "black" }}>הוסף שיעור</h1>
            <CreateLessonForm
              setModalIsOpen={setModalIsOpen}
              userId={user?.userId}
            />
          </div>
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
          style={{
            content: {
              padding: 0,
              // overflow: "scroll",
              boxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
              WebkitBoxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
            },
          }}
        >
          <div
            style={{
              border: "2px solid black",
            }}
          >
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
          <MyLessons userId={user?.userId} role={user?.role} />

          {/* </div> */}
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
  const [files, setFiles] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  let [uniqueId, setUniqueId] = useState(1); // To uniquely identify each form

  const formData = new FormData();

  const onSubmit = async (data: FormData) => {
    if (list.length) {
      data.qrList = list;
    }
    console.log({ data });

    confirm("Are you sure you're ready to send?");
    // return;
    data.userId = userId;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    if (files.length) {
      console.log({ lengthPfFiles: files.length });
      files.forEach((file, index) => {
        console.log(file, index);
        formData.append(`file`, file);
      });
    }

    try {
      const response = await fetch("http://192.168.1.224:3000/create-lesson", {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
      const res = await response.json();
      if (res.acknowledged == true) {
        setModalIsOpen(false);
      } else {
        alert("issue creating lesson");
      }
    } catch {
      console.log("error creating form");
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      setFiles((prevFiles) => [...prevFiles, selectedFile]);
    }
  };

  const handleAddQr = () => {
    if (list.length >= 5) return;
    const standardModel = "square";
    setList([
      ...list,
      { uniqueId, model: standardModel, selectedType: "image" },
    ]);
    // Each time a user added, increment the uniqueId
    setUniqueId(uniqueId + 1);
  };

  const handleDeleteQr = (id: any) => {
    console.log(id);
    setList(list.filter((item) => item.uniqueId !== id));
  };

  const handleModelSelect = (id: any, selectedModel: string) => {
    const updatedList = list.map((item) => {
      if (item.uniqueId === id) {
        return { ...item, model: selectedModel };
      }
      return item;
    });
    setList(updatedList);
  };

  // Handle the type selection
  const handleTypeSelect = (id: any, selectedType: string) => {
    const updatedList = list.map((item) => {
      if (item.uniqueId === id) {
        return { ...item, selectedType };
      }
      return item;
    });
    setList(updatedList);
  };

  // const handleFileUpload = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   id: number
  // ) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     const qrId = id;
  //     if (file && qrId) {
  //     }
  //     // do something with the file...
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-bg"
      encType="multipart/form-data"
    >
      <div className="input-container">
        {/* <label htmlFor="headline">Headline: </label> */}
        <input
          placeholder="כּוֹתֶרֶת"
          {...register("headline")} //, { required: "First Name Required" }
        />
      </div>
      <div className="input-container">
        {/* <label htmlFor="description">Description: </label> */}
        <input
          placeholder="תיאור"
          {...register("description")} // , { required: "First Name Required" }
        />
      </div>
      <div className="input-container" style={{ height: "6em" }}>
        {/* <label htmlFor="instructions">Instructions: </label> */}
        <input
          placeholder="הוראות"
          {...register("instructions")} // , { required: "Email Required" }
        />
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
        }}
      >
        <label htmlFor="language" style={{ color: "black" }}>
          שפה:
        </label>
        <select {...register("language")}>
          <option value="he">עיברית</option>
          <option value="ar">עֲרָבִית</option>
        </select>
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
        }}
      >
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
      <button
        style={{
          marginTop: "2em",
          color: "black",
          height: "2.5em",
          background: "white",
        }}
        className="btn"
        type="button"
        onClick={handleAddQr}
      >
        הוסף QR ובחר דגם תלת מימד
      </button>
      <div style={{ width: "80%", marginTop: "1em" }}>
        {list.length ? (
          <div
            style={{
              // width: "14em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1em",
              borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
              padding: "2px",
              color: "black",
            }}
          >
            <span>choose type:</span>
            <span>choose/upload:</span>
            <span>QR id:</span>
            <span>Delete</span>
          </div>
        ) : null}
        {list.map((item: any, idx) => (
          <div
            key={idx}
            style={{
              // width: "14em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1em",
              borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
              padding: "2px",
            }}
          >
            <div>
              <button
                style={{
                  backgroundColor:
                    item.selectedType === "image" ? "black" : "white",
                  color: item.selectedType === "image" ? "white" : "black",
                }}
                onClick={() => handleTypeSelect(item.uniqueId, "image")}
              >
                Image
              </button>
              <button
                style={{
                  backgroundColor:
                    item.selectedType === "3D Model" ? "black" : "white",
                  color: item.selectedType === "3D Model" ? "white" : "black",
                }}
                onClick={() => handleTypeSelect(item.uniqueId, "3D Model")}
              >
                3D Model
              </button>
            </div>

            <div>
              {item.selectedType === "3D Model" ? (
                <select
                  onChange={(e) =>
                    handleModelSelect(item.uniqueId, e.target.value)
                  }
                >
                  <option value="square">ריבוע</option>
                  <option value="circle">עיגול</option>
                  <option value="square">cone</option>
                  <option value="square">ריבוע</option>
                </select>
              ) : (
                <input
                  type="file"
                  // onChange={(e) => handleFileUpload(e, item.uniqueId)}
                  {...register(`photo-${idx}`)}
                  onChange={(e) => handleFileChange(e)}
                />
              )}
            </div>

            <div style={{ color: "black" }}>{`QR id: ${item.uniqueId}`}</div>
            <div>
              <button
                style={{ all: "unset" }}
                type="button"
                onClick={() => handleDeleteQr(item.uniqueId)}
              >
                <DeleteForeverIcon sx={{ fontSize: "large", color: "black" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <div style={{ marginTop: "2em" }}>
        <label htmlFor="upload"></label>
        <input type="file" />
      </div> */}
      <input
        className="btn"
        style={{ width: "20%" }}
        type="submit"
        value={"שלח"}
      />
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
  qrList?: any[];
  [key: string]: any;
};
