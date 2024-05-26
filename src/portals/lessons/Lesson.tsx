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

function Lesson() {
  const [startScanning, setStartScanning] = useState<boolean>(false);
  const { activeLesson, user } = useAppContext();
  const [photoDataArray, setPhotoDataArray] = useState([]);
  // const [blobs, setBlobs] = useState<any>([]);
  // const [preloadedImages, setPreloadedImages] = useState<any>([]);

  if (!activeLesson) {
    return (
      <div>
        <h1>Error Finding Lesson</h1>
      </div>
    );
  }
  console.log("SHE CSELL ");

  const { height, width } = useWindowDimensions();

  if (true) {
    const { error, response }: any = useFetch(
      "/fetchPhotos",
      JSON.stringify({ lessonId: activeLesson[0].lessonId })
    );

    useEffect(() => {
      const fetchPhotoDataArray = async () => {
        try {
          if (response && response.sortedUrls) {
            setPhotoDataArray(response.sortedUrls);
          }
          if (error) {
            console.log(error);
          }
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      };

      fetchPhotoDataArray();
    }, [response, error]);
  }

  const currentLesson = activeLesson[0];

  console.log({ photoDataArray });

  return (
    <>
      <Navbar title="Lesson - temp" user={user} />
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
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {currentLesson?.lessonData?.headline ? (
            <div className="lesson-content-container">
              כּוֹתֶרֶת:
              <h1 style={{ color: "black" }}>
                {currentLesson?.lessonData?.headline}
              </h1>
            </div>
          ) : null}
          <div style={{ marginTop: "1em", color: "black" }}>
            נוצר על ידי:
            <span
              className="lesson-content-font"
              style={{ marginLeft: "10px" }}
            >
              {currentLesson.createdByInfo?.firstName}{" "}
              {currentLesson.createdByInfo?.lastName}
            </span>
            כיתה:
            <span className="lesson-content-font">
              {classObj[currentLesson.classAgeGroup] || ""}
            </span>
          </div>
          {currentLesson?.lessonData?.description ? (
            <div className="lesson-content-container">
              <span>תיאור:</span>
              <h3 style={{ color: "black" }}>
                {currentLesson?.lessonData.description}
              </h3>
            </div>
          ) : null}
          {currentLesson?.lessonData?.instructions ? (
            <div className="lesson-content-container">
              <span>הוראות: </span>
              <h3 style={{ color: "black" }}>
                {currentLesson?.lessonData?.instructions}
              </h3>
            </div>
          ) : null}
          <div
            style={{
              width: "96%",
              display: "flex",
              justifyContent: "center",
              // marginTop: "4em",
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

export default Lesson;
