import { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { MyDropzone } from "../../common/components/Dropzone";

type LessonFormProps = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
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
  file?: any;
};

export const CreateLessonForm = ({
  setModalIsOpen,
  userId,
}: LessonFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [files, setFiles] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  let [uniqueId, setUniqueId] = useState(1); // To uniquely identify each form

  const formData = new FormData();

  const onSubmit = async (data: FormData) => {
    if (list.length) {
      data.qrList = list;
    }

    confirm("Are you sure you're ready to send?");
    // return;
    data.userId = userId;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    if (files.length) {
      console.log("files LEfgnth ", files.length);
      files.forEach((file) => {
        formData.append(`files`, file);
      });
    }

    try {
      const response = await fetch(
        "https://edu-server-ke5y.onrender.com/create-lesson",
        // "http://localhost:3000/create-lesson",
        {
          // const response = await fetch("http://192.168.1.224:3000/signup", {
          method: "POST",
          body: formData,
        }
      );
      const res = await response.json();

      if (res.ok) {
        setModalIsOpen(false);
      } else {
        console.log("issue creating lesson");
      }
    } catch (error) {
      console.log("error creating form", error);
    }
  };

  const handleFileChange = (files: any) => {
    const selectedFile = files.length && files[0];

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
    // Each time a marker is added, increment uniqueId
    //-- remember to make sure after one is deleted the next continues the cycle
    setUniqueId(uniqueId + 1);
  };

  const handleDeleteQr = (id: any) => {
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

  // const handleTypeSelect = (event: any, id: any, selectedType: string) => {
  //   event.preventDefault();
  //   const updatedList = list.map((item) => {
  //     if (item.uniqueId === id) {
  //       return { ...item, selectedType };
  //     }
  //     return item;
  //   });
  //   setList(updatedList);
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-bg"
      encType="multipart/form-data"
    >
      <div className="form-bg-image"></div>
      <h1 style={{ textAlign: "center", color: "white" }}>הוסף שיעור</h1>

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
          {/* <option value="ar">עֲרָבִית</option> */}
        </select>
      </div>
      {/* <div
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
      </div> */}
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
      <div
        style={{
          width: "80%",
          marginTop: "1em",
          zIndex: 24,
        }}
      >
        {list.length ? (
          <div
            style={{
              // width: "14em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1em",
              borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
              padding: "2px",
              color: "black",
            }}
          >
            {/* <span>choose type:</span> */}
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
              borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
              padding: "2px",
              height: "3em",
            }}
          >
            {/* <div>
              <button
                style={{
                  backgroundColor:
                    item.selectedType === "image" ? "black" : "white",
                  color: item.selectedType === "image" ? "white" : "black",
                }}
                onClick={(e) => handleTypeSelect(e, item.uniqueId, "image")}
              >
                Image
              </button>
              <button
                style={{
                  backgroundColor:
                    item.selectedType === "3D Model" ? "black" : "white",
                  color: item.selectedType === "3D Model" ? "white" : "black",
                }}
                onClick={(e) => handleTypeSelect(e, item.uniqueId, "3D Model")}
              >
                3D Model
              </button>
            </div> */}

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
                // <input
                //   type="file"
                //   // onChange={(e) => handleFileUpload(e, item.uniqueId)}
                //   {...register(`photo-${idx}`)}
                //   onChange={(e) => handleFileChange(e)}
                // />
                <MyDropzone
                  // register={{ ...register(`photo-${idx}`) }}
                  handleFileChange={handleFileChange}
                />
              )}
            </div>

            {/* <div style={{ color: "white" }}>{`QR id: ${item.uniqueId}`}</div> */}
            <div style={{ display: "flex" }}>
              <div style={{ color: "white" }}>{`מס' QR: `} </div>
              <span style={{ marginRight: "4px" }}>{idx + 1}</span>
            </div>

            <div>
              <button
                style={{ all: "unset" }}
                type="button"
                onClick={() => handleDeleteQr(item.uniqueId)}
              >
                <DeleteForeverIcon sx={{ fontSize: "large", color: "white" }} />
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
      {/* <div style={{ height: "60px", marginTop: "2em" }}></div> */}
    </form>
  );
};
