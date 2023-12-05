import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { User } from "../App";
import { MyLessons } from "./lessons/MyLessons";
import { Link } from "react-router-dom";
import { Navbar } from "../navigation/Navbar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import QRCode from "qrcode";

type TeacherPortalProps = {
  user: User;
};

export function TeacherPortal({ user }: TeacherPortalProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [qrTest, setQrTest] = useState<any>();
  const [qrErr, setQrErr] = useState<any>();
  const [currentLessonsModal, setCurrentLessonsModal] =
    useState<boolean>(false);

  const handleModel = (prevState: boolean) => {
    setModalIsOpen(!prevState);
  };

  const handleCurrentLessonsModal = (prevState: boolean) => {
    setCurrentLessonsModal(!prevState);
  };

  const generateQr = async () => {
    // QRCode.toString("JEREMY", function (err, string) {
    //   if (err) setQrErr(err);
    //   setQrTest(string);
    // });
    const data = { hello: "world" };
    try {
      alert("attempting login");
      const response = await fetch("http://192.168.1.224:3000/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log({ res });
    } catch {
      alert("error with login ");
      console.log("error with login");
    }
  };

  return (
    <div
      style={{
        // height: "100vh",
        // width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2em",
      }}
    >
      <Navbar user={user} title={"פורטל מורים"} />
      <div>{/* <h1 className="portal-title">פורטל מורים</h1> */}</div>
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
              overflow: "hidden",
              boxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
              WebkitBoxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
            },
          }}

          // className="test"
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
            {/* <button onClick={() => handleModel(modalIsOpen)}>close</button> */}
            {/* Your form or any other content can go here */}
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
        >
          <div className="form-bg lessons-center">
            <h2 className="portal-title" style={{ fontSize: "2em" }}>
              My Lessons
            </h2>

            <MyLessons userId={user?.userId} role={user?.role} />
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
        <div style={{ border: "2px solid red", height: "5em", width: "5em" }}>
          <img src={qrTest}></img>
          <button
            style={{ width: "100%", height: "50%" }}
            type="button"
            onClick={generateQr}
          >
            hell oworld
          </button>
          <div>
            {qrTest}
            {qrErr}
          </div>
        </div>
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
  // const [modelForm, setModelForm] = useState<any>();

  const [list, setList] = useState<any[]>([]);
  let [uniqueId, setUniqueId] = useState(1); // To uniquely identify each form

  const onSubmit = async (data: FormData) => {
    if (list.length) {
      data.qrList = list;
    }
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

  const handleAddQr = () => {
    const standardModel = "square";
    setList([...list, { uniqueId, model: standardModel }]);
    // Each time a user added, increment the uniqueId
    setUniqueId(uniqueId + 1);
  };

  const handleDeleteQr = (id: any) => {
    console.log(id);
    setList(list.filter((item) => item.uniqueId !== id));
  };

  const handleSelectChange = (id: any, selectedModel: string) => {
    const updatedList = list.map((item) => {
      if (item.uniqueId === id) {
        return { ...item, model: selectedModel };
      }
      return item;
    });
    setList(updatedList);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-bg">
      <div className="input-container">
        {/* <label htmlFor="headline">Headline: </label> */}
        <input
          placeholder="כּוֹתֶרֶת"
          {...register("headline")} //, { required: "First Name Required" }
          style={{ color: "black" }}
        />
      </div>
      <div className="input-container">
        {/* <label htmlFor="description">Description: </label> */}
        <input
          placeholder="תיאור"
          {...register("description")} // , { required: "First Name Required" }
          style={{ color: "black" }}
        />
      </div>
      <div className="input-container">
        {/* <label htmlFor="instructions">Instructions: </label> */}
        <input
          placeholder="הוראות"
          {...register("instructions")} // , { required: "Email Required" }
          style={{ color: "black" }}
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
      <div style={{ width: "50%", marginTop: "1em" }}>
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
            <label htmlFor={`model${idx}`} style={{ color: "black" }}>
              לבחור דגם:
            </label>
            <select
              onChange={(e) =>
                handleSelectChange(item.uniqueId, e.target.value)
              }
            >
              // Unique name per model
              <option value="square">Square</option>
              <option value="circle">Circle</option>
              <option value="doctor">Doctor</option>
              <option value="tank">Tank</option>
            </select>
            <div style={{ color: "black" }}>{`QR id: ${item.uniqueId}`}</div>
            <button
              style={{ all: "unset" }}
              type="button"
              onClick={() => handleDeleteQr(item.uniqueId)}
            >
              <DeleteForeverIcon sx={{ fontSize: "large", color: "black" }} />
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "2em" }}>
        <label htmlFor="upload"></label>
        <input type="file" />
      </div>
      {/* <Temp /> */}
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
};

// const Temp = () => {
//   return (
//     <div className="sec-center">
//       <input
//         className="dropdown"
//         type="checkbox"
//         id="dropdown"
//         name="dropdown"
//       />
//       <label className="for-dropdown" htmlFor="dropdown">
//         Dropdown Menu <i className="uil uil-arrow-down"></i>
//       </label>
//       <div className="section-dropdown">
//         <a href="#">
//           Dropdown Link <i className="uil uil-arrow-right"></i>
//         </a>
//         <input
//           className="dropdown-sub"
//           type="checkbox"
//           id="dropdown-sub"
//           name="dropdown-sub"
//         />
//         <label className="for-dropdown-sub" htmlFor="dropdown-sub">
//           Dropdown Sub <i className="uil uil-plus"></i>
//         </label>
//         <div className="section-dropdown-sub">
//           <a href="#">
//             Dropdown Link <i className="uil uil-arrow-right"></i>
//           </a>
//           <a href="#">
//             Dropdown Link <i className="uil uil-arrow-right"></i>
//           </a>
//         </div>
//         <a href="#">
//           Dropdown Link <i className="uil uil-arrow-right"></i>
//         </a>
//         <a href="#">
//           Dropdown Link <i className="uil uil-arrow-right"></i>
//         </a>
//       </div>
//     </div>
//   );
// };
