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

  const { height, width } = useWindowDimensions();

  const imagesTest: any[] = [
    "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/4.jpg",
    "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/5.jpg",
    "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/6.jpg",
  ];

  // async function fetchImageAndCreateBlob(url: any) {
  //   const response = await fetch(url);
  //   const blob = await response.blob();
  //   return blob;
  // }

  // useEffect(() => {
  //   // Function to fetch all images and create Blobs
  //   async function fetchImagesAndCreateBlobs(imagesTest: string[]) {
  //     try {
  //       const blobPromises = imagesTest.map((url) =>
  //         fetchImageAndCreateBlob(url)
  //       );
  //       const blobs = await Promise.all(blobPromises);
  //       setPreloadedImages(blobs);
  //       // console.log({ blobs });

  //       // For example, you can create URLs for these Blobs
  //       const blobUrls = blobs.map((blob) => URL.createObjectURL(blob));
  //       console.log(blobUrls);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   // Fetch and preload images
  //   fetchImagesAndCreateBlobs(imagesTest);
  // }, []);

  const { error, response }: any = useFetch(
    "/fetchPhotos",
    JSON.stringify({ lessonId: activeLesson[0].lessonId })
  );

  useEffect(() => {
    const fetchPhotoDataArray = async () => {
      try {
        if (response && response.images) {
          setPhotoDataArray(response.images);
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

  const currentLesson = activeLesson[0];

  // console.log({ height, width });
  // confirm(`${height} and ${width}`);

  // tablet showed 1037 and 753

  {
    /* <video autoplay="" muted="" playsinline="" style="width: 933.333px; 
    height: 700px; position: absolute; top: 0px; left: 0px; z-index: -2; 
    margin-left: -124.667px; margin-top: 0px;"></video> */
  }

  // console.log(currentLesson);

  // const imagesTest: any[] = [
  //   "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/4.jpg",
  //   "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/5.jpg",
  //   "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/6.jpg",
  // ];

  // async function fetchImageAndCreateBlob(url: any) {
  //   const response = await fetch(url);
  //   const blob = await response.blob();
  //   return blob;
  // }

  // // Function to fetch all images and create Blobs
  // async function fetchImagesAndCreateBlobs(imagesTest: any[]) {
  //   const blobPromises = imagesTest.map((url: any) =>
  //     fetchImageAndCreateBlob(url)
  //   );
  //   const blobs = await Promise.all(blobPromises);
  //   console.log("the first BLOCK!");
  //   console.log({ blobs });
  //   return blobs;
  // }

  // // Example usage
  // fetchImagesAndCreateBlobs(imagesTest)
  //   .then((blobs) => {
  //     // Now 'blobs' is an array of Blobs, and you can use them as needed
  //     // console.log(blobs);
  //     if (!blobs.length) setBlobs(blobs);
  //     // For example, you can create URLs for these Blobs
  //     const blobUrls = blobs.map((blob) => URL.createObjectURL(blob));
  //     console.log(blobUrls);

  //     // Use blobUrls to display or manipulate the images on your frontend
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // const imageUrl =
  //   "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/4.jpg";

  // const loadImage = (url: any) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.onload = () => resolve(img);
  //     img.onerror = reject;
  //     img.src = url;
  //   });
  // };

  // const img = await loadImage(imageUrl);
  // Now you can use the preloaded image in your AR scene initialization

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
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="lesson-content-container">
            <h1 style={{ color: "black" }}>
              {currentLesson?.lessonData?.headline || "headline"}
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
            <span>תיאור:</span>
            <h3 style={{ color: "black" }}>
              {" "}
              {currentLesson?.lessonData?.description}
            </h3>
          </div>
          <div className="lesson-content-container">
            <span>הוראות: </span>
            <h3 style={{ color: "black" }}>
              {currentLesson?.lessonData?.instructions}
            </h3>
          </div>
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
