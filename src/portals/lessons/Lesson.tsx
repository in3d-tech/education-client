// import { useEffect, useState, useMemo } from "react";
// import { useAppContext } from "../../context/appContext";
// import { Navbar } from "../../navigation/Navbar";
// import ArLessonNew from "./ArLessonNew";
// import { useFetch } from "../../common/logic/useFetch";
// import useWindowDimensions from "../../common/logic/getViewport";

// const classObj: any = {
//   1: "א",
//   2: "ב",
//   3: "ג",
//   4: "ד",
//   5: "ה",
//   6: "ו",
//   7: "ז",
//   8: "ח",
//   9: "ט",
//   10: "י",
//   11: "יא",
//   12: "יב",
// };

// const Lesson = () => {
//   const [startScanning, setStartScanning] = useState(false);
//   const [disabled, setDisabled] = useState(false);
//   const { activeLesson, user } = useAppContext();
//   const [photoDataArray, setPhotoDataArray] = useState([]);
//   const { height, width } = useWindowDimensions();

//   // Memoize your request body to avoid re-creating on every render

//   const fetchBody = useMemo(
//     () =>
//       JSON.stringify({
//         lessonId: activeLesson ? activeLesson[0].lessonId : null,
//       }),
//     [activeLesson],
//   );

//   // Ensure the fetchIs only called when necessary.

//   const { error, response } = useFetch(
//     "/fetchPhotos",
//     fetchBody,
//     "POST",
//     "application/json",
//   );

//   useEffect(() => {
//     if (!activeLesson) {
//       return;
//     }
//     const fetchPhotoDataArray = async () => {
//       try {
//         if (response) {
//           setPhotoDataArray(response);
//         }
//         if (error) {
//           console.log(error);
//         }
//       } catch (error) {
//         console.error("Error fetching photos:", error);
//       }
//     };

//     fetchPhotoDataArray();
//   }, [response, error, activeLesson]);

//   // Render Error Screen if no active lesson

//   if (!activeLesson) {
//     return (
//       <div>
//         <h1>Error Finding Lesson</h1>
//       </div>
//     );
//   }

//   const currentLesson = activeLesson[0];

//   console.log({ photoDataArray });

//   // ... (imports and logic remain exactly the same)

//   return (
//     <>
//       <Navbar title="Lesson - temp" user={user} />

//       {startScanning ? (
//         <ArLessonNew
//           setStartScanning={setStartScanning}
//           firstImage={photoDataArray.length > 0 ? photoDataArray[0] : null}
//           secondImage={photoDataArray.length > 1 ? photoDataArray[1] : null}
//           images={photoDataArray}
//           screenHeight={height}
//           screenWidth={width}
//         />
//       ) : (
//         <div className="lesson-page-wrapper">
//           <div className="lesson-glass-card">
//             {/* Headline Section */}
//             {currentLesson?.lessonData?.headline && (
//               <div className="info-group">
//                 <span className="info-label">כּוֹתֶרֶת:</span>
//                 <h1 className="info-headline" dir="auto">
//                   {currentLesson.lessonData.headline}
//                 </h1>
//               </div>
//             )}

//             {/* Meta Info (Creator & Class) */}
//             <div className="info-meta">
//               <div className="meta-item">
//                 <span className="info-label">נוצר על ידי:</span>
//                 <span className="meta-value" dir="auto">
//                   {currentLesson.createdByInfo?.firstName}{" "}
//                   {currentLesson.createdByInfo?.lastName}
//                 </span>
//               </div>
//               <div className="meta-item">
//                 <span className="info-label">כיתה:</span>
//                 <span className="meta-value">
//                   {classObj[currentLesson.classAgeGroup] || ""}
//                 </span>
//               </div>
//             </div>

//             <hr className="card-divider" />

//             {/* Description Section */}
//             {currentLesson?.lessonData?.description && (
//               <div className="info-group">
//                 <span className="info-label">תיאור:</span>
//                 <p className="info-body" dir="auto">
//                   {currentLesson.lessonData.description}
//                 </p>
//               </div>
//             )}

//             {/* Instructions Section */}
//             {currentLesson?.lessonData?.instructions && (
//               <div className="info-group">
//                 <span className="info-label">הוראות:</span>
//                 <p className="info-body" dir="auto">
//                   {currentLesson.lessonData.instructions}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Call to Action Button */}
//           <div className="action-container">
//             <button
//               disabled={disabled}
//               className={`primary-scan-btn ${disabled ? "disabled" : ""}`}
//               onClick={() => {
//                 setDisabled(true);
//                 setTimeout(() => {
//                   setDisabled(false);
//                   setStartScanning(true);
//                 }, 1000);
//               }}
//             >
//               START SCANNING
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// // return (
// //   <>
// //     <Navbar title="Lesson - temp" user={user} />

// //     {startScanning ? (
// //       <ArLessonNew
// //         setStartScanning={setStartScanning}
// //         firstImage={photoDataArray.length > 0 ? photoDataArray[0] : null}
// //         secondImage={photoDataArray.length > 1 ? photoDataArray[1] : null}
// //         images={photoDataArray}
// //         screenHeight={height}
// //         screenWidth={width}
// //       />
// //     ) : (
// //       <div
// //         style={{
// //           height: "100%",

// //           display: "flex",

// //           flexDirection: "column",

// //           alignItems: "center",
// //         }}
// //       >
// //         {currentLesson?.lessonData?.headline ? (
// //           <div className="lesson-content-container">
// //             כּוֹתֶרֶת:
// //             <h1 style={{ color: "black" }}>
// //               {currentLesson?.lessonData?.headline}
// //             </h1>
// //           </div>
// //         ) : null}

// //         <div style={{ marginTop: "1em", color: "black" }}>
// //           נוצר על ידי:
// //           <span
// //             className="lesson-content-font"
// //             style={{ marginLeft: "10px" }}
// //           >
// //             {currentLesson.createdByInfo?.firstName}{" "}
// //             {currentLesson.createdByInfo?.lastName}
// //           </span>
// //           כיתה:
// //           <span className="lesson-content-font">
// //             {classObj[currentLesson.classAgeGroup] || ""}
// //           </span>
// //         </div>

// //         {currentLesson?.lessonData?.description ? (
// //           <div className="lesson-content-container">
// //             <span>תיאור:</span>

// //             <h3 style={{ color: "black" }}>
// //               {currentLesson?.lessonData.description}
// //             </h3>
// //           </div>
// //         ) : null}

// //         {currentLesson?.lessonData?.instructions ? (
// //           <div className="lesson-content-container">
// //             <span>הוראות:</span>

// //             <h3 style={{ color: "black" }}>
// //               {currentLesson?.lessonData?.instructions}
// //             </h3>
// //           </div>
// //         ) : null}
// //         <div
// //           style={{
// //             width: "96%",
// //             display: "flex",
// //             justifyContent: "center",
// //           }}
// //         >
// //           <button
// //             disabled={disabled}
// //             style={{ textAlign: "center", fontSize: "1.3em" }}
// //             className="btn"
// //             onClick={() => {
// //               setDisabled(true);
// //               setTimeout(() => {
// //                 setDisabled(false);
// //                 setStartScanning(true);
// //               }, 1000);
// //             }}
// //           >
// //             Start Scanning
// //           </button>
// //         </div>
// //       </div>
// //     )}
// //   </>
// // );
// // };

// export default Lesson;

import { useEffect, useState, useMemo } from "react";
import { useAppContext } from "../../context/appContext";
import { Navbar } from "../../navigation/Navbar";
import ArLessonNew from "./ArLessonNew";
import { useFetch } from "../../common/logic/useFetch";
import useWindowDimensions from "../../common/logic/getViewport";
import "./Lesson.css";

const classObj: Record<number, string> = {
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

const Lesson = () => {
  const [startScanning, setStartScanning] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { activeLesson, user } = useAppContext();
  const [photoDataArray, setPhotoDataArray] = useState([]);
  const { height, width } = useWindowDimensions();

  const fetchBody = useMemo(
    () =>
      JSON.stringify({
        lessonId: activeLesson ? activeLesson[0].lessonId : null,
      }),
    [activeLesson],
  );

  const { error, response } = useFetch(
    "/fetchPhotos",
    fetchBody,
    "POST",
    "application/json",
  );

  useEffect(() => {
    if (!activeLesson) return;
    try {
      if (response) setPhotoDataArray(response);
      if (error) console.error(error);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  }, [response, error, activeLesson]);

  // ── Error state ──
  if (!activeLesson) {
    return (
      <div className="lesson-error-screen">
        <div className="lesson-error-icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="lesson-error-title">לא נמצא שיעור</h2>
        <p className="lesson-error-subtitle">חזור ובחר שיעור מהרשימה</p>
      </div>
    );
  }

  const currentLesson = activeLesson[0];

  return (
    <>
      <Navbar
        title={currentLesson?.lessonData?.headline || "שיעור"}
        user={user}
      />

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
        <div className="lesson-page">
          {/* ── Top: Lesson Status Indicator ── */}
          <div className="lesson-status-bar">
            <span className="lesson-status-dot" />
            <span className="lesson-status-text">שיעור פעיל</span>
          </div>

          {/* ── Briefing Card ── */}
          <article className="lesson-briefing-card">
            {/* Headline */}
            {currentLesson?.lessonData?.headline && (
              <header className="lesson-briefing-header">
                <h1 className="lesson-briefing-title" dir="auto">
                  {currentLesson.lessonData.headline}
                </h1>
              </header>
            )}

            {/* Meta chips */}
            <div className="lesson-meta-row">
              {currentLesson.createdByInfo && (
                <div className="lesson-meta-chip">
                  <svg
                    className="lesson-meta-chip-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span dir="auto">
                    {currentLesson.createdByInfo.firstName}{" "}
                    {currentLesson.createdByInfo.lastName}
                  </span>
                </div>
              )}
              {currentLesson.classAgeGroup && (
                <div className="lesson-meta-chip">
                  <svg
                    className="lesson-meta-chip-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span>
                    כיתה {classObj[currentLesson.classAgeGroup] || ""}
                  </span>
                </div>
              )}
            </div>

            <div className="lesson-briefing-divider" />

            {/* Description */}
            {currentLesson?.lessonData?.description && (
              <section className="lesson-briefing-section">
                <h3 className="lesson-section-label">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="17" y1="10" x2="3" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="17" y1="18" x2="3" y2="18" />
                  </svg>
                  תיאור
                </h3>
                <p className="lesson-section-body" dir="auto">
                  {currentLesson.lessonData.description}
                </p>
              </section>
            )}

            {/* Instructions */}
            {currentLesson?.lessonData?.instructions && (
              <section className="lesson-briefing-section">
                <h3 className="lesson-section-label">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  הוראות
                </h3>
                <p className="lesson-section-body" dir="auto">
                  {currentLesson.lessonData.instructions}
                </p>
              </section>
            )}
          </article>

          {/* ── Launch Button ── */}
          <div className="lesson-launch-area">
            <button
              disabled={disabled}
              className={`lesson-launch-btn ${disabled ? "lesson-launch-btn--loading" : ""}`}
              onClick={() => {
                setDisabled(true);
                setTimeout(() => {
                  setDisabled(false);
                  setStartScanning(true);
                }, 1000);
              }}
            >
              {disabled ? (
                <span className="lesson-launch-btn-inner">
                  <span className="lesson-launch-spinner" />
                  <span>מאתחל מצלמה...</span>
                </span>
              ) : (
                <span className="lesson-launch-btn-inner">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span>התחל סריקה</span>
                </span>
              )}
            </button>
            <p className="lesson-launch-hint">
              כוון את המצלמה לעבר הסמנים כדי להציג אובייקטים תלת-ממדיים
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Lesson;
