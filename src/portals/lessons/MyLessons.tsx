// import { useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../../context/appContext";
// import { formatDate } from "../../common/logic/formatDate";
// import { useFetch } from "../../common/logic/useFetch";

// type MyLessonsProps = {
//   userId: string | undefined;
//   role?: string | undefined | null;
//   // onCloseClick?: () => void;
//   handleCurrentLessonsModal?: (prevState: boolean) => void;
//   currentLessonsModal?: boolean;
//   orgCode: string | undefined;
// };

// export function MyLessons({
//   userId,
//   handleCurrentLessonsModal,
//   currentLessonsModal = false,
//   orgCode,
// }: MyLessonsProps) {
//   const { myLessons, setMyLessons, setActiveLesson } = useAppContext();

//   const fetchBody = useMemo(
//     () => JSON.stringify(userId ? { userId } : { orgCode }),
//     [userId]
//   );

//   const { error, response } = useFetch(
//     "/active-lessons",
//     fetchBody,
//     "POST",
//     "application/json"
//   );

//   useEffect(() => {
//     if (response) {
//       setMyLessons(response);
//     }
//     if (error) {
//       console.error("Error fetching my lessons:", error);
//     }
//   }, [response, error, setMyLessons]);

//   return (
//     <div className="my-lesson-wrapper">
//       <div style={{ position: "absolute", right: "1em", top: "0.6em" }}>
//         <button
//           style={{
//             borderRadius: "50%",
//             width: "2em",
//             height: "2em",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           onClick={() =>
//             handleCurrentLessonsModal
//               ? handleCurrentLessonsModal(currentLessonsModal)
//               : null
//           }
//         >
//           x
//         </button>
//       </div>
//       <div className="my-lessons-list">
//         <span
//           style={{
//             color: "black",

//             height: ".1em",

//             fontSize: "2.5em",

//             fontFamily: "gotham",
//           }}
//         >
//           My Lessons
//         </span>
//         <div className="my-lessons-list-container">
//           {myLessons.length ? (
//             myLessons

//               .map((lesson, idx) => {
//                 return (
//                   <div
//                     key={idx}
//                     style={{
//                       color: "black",

//                       marginTop: "2em",

//                       margin: 0,

//                       width: "96%",
//                     }}
//                   >
//                     <Link
//                       to="/lesson"
//                       style={{ width: "100%" }}
//                       onClick={() => {
//                         const activeLesson = myLessons.filter(
//                           (__, idx2) => idx === idx2
//                         );
//                         setActiveLesson(activeLesson);
//                       }}
//                     >
//                       <button
//                         className="my-lessons-btn"
//                         style={{ width: "100%" }}
//                       >
//                         <span className="my-lessons-created-by-headline">
//                           {lesson?.lessonData?.headline}
//                         </span>
//                         <span className="my-lessons-created-by-name">
//                           {lesson?.createdByInfo?.firstName}{" "}
//                           {lesson?.createdByInfo?.lastName}
//                           {lesson?.createdByInfo?.profilePic ? (
//                             <img
//                               className="my-lessons-created-by-pic"
//                               src={lesson.createdByInfo.profilePic}
//                               alt="prfl"
//                             />
//                           ) : null}
//                         </span>
//                         <span className="my-lessons-created-at-date">
//                           {formatDate(lesson?.createdAt)}
//                         </span>
//                       </button>
//                     </Link>
//                   </div>
//                 );
//               })
//               .reverse()
//           ) : (
//             <div>
//               <div style={{ color: "black" }}>No active lessons</div>
//             </div>
//           )}
//         </div>
//         {/* Additional UI components can be included here */}
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { formatDate } from "../../common/logic/formatDate";
import { useFetch } from "../../common/logic/useFetch";
import "./MyLessons.css";

type MyLessonsProps = {
  userId: string | undefined;
  role?: string | undefined | null;
  handleCurrentLessonsModal?: (prevState: boolean) => void;
  currentLessonsModal?: boolean;
  orgCode: string | undefined;
};

export function MyLessons({
  userId,
  handleCurrentLessonsModal,
  currentLessonsModal = false,
  orgCode,
}: MyLessonsProps) {
  const { myLessons, setMyLessons, setActiveLesson } = useAppContext();

  const fetchBody = useMemo(
    () => JSON.stringify(userId ? { userId } : { orgCode }),
    [userId, orgCode],
  );

  const { error, response } = useFetch(
    "/active-lessons",
    fetchBody,
    "POST",
    "application/json",
  );

  useEffect(() => {
    if (response) {
      setMyLessons(response);
    }
    if (error) {
      console.error("Error fetching my lessons:", error);
    }
  }, [response, error, setMyLessons]);

  return (
    <div className="lessons-panel">
      {/* Header */}
      <div className="lessons-panel-header">
        <div className="lessons-panel-header-content">
          <span className="lessons-panel-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </span>
          <h2 className="lessons-panel-title">השיעורים שלי</h2>
          <span className="lessons-panel-count">
            {myLessons.length > 0 ? myLessons.length : ""}
          </span>
        </div>
        <button
          className="lessons-panel-close"
          onClick={() =>
            handleCurrentLessonsModal
              ? handleCurrentLessonsModal(currentLessonsModal)
              : null
          }
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Lesson List */}
      <div className="lessons-panel-body">
        {myLessons.length ? (
          <div className="lessons-list">
            {[...myLessons].reverse().map((lesson, idx) => (
              <Link
                key={idx}
                to="/lesson"
                className="lesson-card-link"
                onClick={() => {
                  const originalIdx = myLessons.length - 1 - idx;
                  const activeLesson = myLessons.filter(
                    (__, i) => i === originalIdx,
                  );
                  setActiveLesson(activeLesson);
                }}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <article className="lesson-card">
                  <div className="lesson-card-accent" />
                  <div className="lesson-card-content">
                    <div className="lesson-card-top-row">
                      <h3 className="lesson-card-headline">
                        {lesson?.lessonData?.headline}
                      </h3>
                      <span className="lesson-card-arrow">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </span>
                    </div>
                    <div className="lesson-card-meta">
                      <div className="lesson-card-author">
                        {lesson?.createdByInfo?.profilePic ? (
                          <img
                            className="lesson-card-avatar"
                            src={lesson.createdByInfo.profilePic}
                            alt=""
                          />
                        ) : (
                          <span className="lesson-card-avatar-fallback">
                            {lesson?.createdByInfo?.firstName?.[0] || "?"}
                          </span>
                        )}
                        <span className="lesson-card-author-name">
                          {lesson?.createdByInfo?.firstName}{" "}
                          {lesson?.createdByInfo?.lastName}
                        </span>
                      </div>
                      <time className="lesson-card-date">
                        {formatDate(lesson?.createdAt)}
                      </time>
                    </div>
                  </div>
                  <div className="lesson-card-glow" />
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="lessons-empty-state">
            <div className="lessons-empty-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <p className="lessons-empty-title">אין שיעורים פעילים</p>
            <p className="lessons-empty-subtitle">
              שיעורים חדשים יופיעו כאן כשהמורה יפעיל אותם
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
