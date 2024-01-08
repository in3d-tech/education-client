import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Navbar } from "../../navigation/Navbar";
import ArLessonNew from "./ArLessonNew";
import { useFetch } from "../../common/logic/useFetch";
import useWindowDimensions from "../../common/logic/getViewport";

const classObj: any = {
  1: "א",
  2: "ב",
  3: "ג",
  4: "ד",
  5: "ה",
  6: "ו",
  7: "ז",
  8: "ח",
  9: "ט",
  10: "י",
  11: "יא",
  12: "יב",
};

export function Lesson() {
  const [startScanning, setStartScanning] = useState<boolean>(false);
  const { activeLesson, user } = useAppContext();
  const [photoDataArray, setPhotoDataArray] = useState([]);

  if (!activeLesson)
    return (
      <div>
        <h1>Error Finding Lesson</h1>
      </div>
    );

  const { height, width } = useWindowDimensions();

  // const fetchPhotoDataArray = async () => {
  //   try {
  //     const { error, response }: any = useFetch("/fetchPhotos", null, "GET");
  //     if (response && response.data) {
  //       setPhotoDataArray(response.data);
  //     }
  //     if (error) {
  //       console.log(error);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching photos:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchPhotoDataArray();
  // }, []);

  const { error, response }: any = useFetch("/fetchPhotos", null, "GET");
  // const [photoDataArray, setPhotoDataArray] = useState([]);

  useEffect(() => {
    if (response && response.data) {
      setPhotoDataArray(response.data);
    }
    if (error) {
      console.log(error);
    }
  }, [response, error]);

  const currentLesson = activeLesson[0];

  return (
    <>
      <Navbar title="Lesson" user={user} />
      {startScanning ? (
        <ArLessonNew
          setStartScanning={setStartScanning}
          firstImage={photoDataArray.length > 0 ? photoDataArray[0] : null}
          secondImage={photoDataArray.length > 1 ? photoDataArray[1] : null}
          images={photoDataArray}
          screenHeight={height}
          screenWidth={width}
        />
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="lesson-content-container">
            <h1 style={{ color: "black" }}>
              {currentLesson?.headline || "headline"}
            </h1>
          </div>
          <div className="lesson-content-container">
            נוצר על ידי:
            <span
              className="lesson-content-font"
              style={{ marginLeft: "10px" }}
            >
              {currentLesson.createdByInfo?.firstName}{" "}
              {currentLesson.createdByInfo?.lastName}
            </span>
            כיתה:{" "}
            <span className="lesson-content-font">
              {classObj[currentLesson.classAgeGroup] || "Error"}
            </span>
          </div>
          <div className="lesson-content-container">
            <h3 style={{ color: "black" }}>{currentLesson?.description}</h3>
          </div>
          <div className="lesson-content-container">
            <span>הוראות: </span>
            <h3 style={{ color: "black" }}>{currentLesson?.instructions}</h3>
          </div>
          <div
            style={{
              width: "96%",
              display: "flex",
              justifyContent: "center",
              marginTop: "4em",
            }}
          >
            <button
              style={{ textAlign: "center", fontSize: "1.3em" }}
              className="btn"
              onClick={() => setStartScanning(true)}
              // href="/hello-cube.html"
            >
              Start Scanning
            </button>
            {/* <img
              src="https://res.cloudinary.com/dxminwnb3/image/upload/v1702977460/llcjzexbkdh90d2w7moh.jpg" //https://asset.cloudinary.com/dxminwnb3/ea9ce3e5ef002228c8413cd0740053b7"
              alt="WTF"
              style={{ width: "300px", height: "300px" }}
            /> */}
          </div>
        </div>
      )}
    </>
  );
  // );
}
