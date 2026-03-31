// import { useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../../context/appContext";
// import { formatDate } from "../../common/logic/formatDate";
// import { useFetch } from "../../common/logic/useFetch";
// import "./MyLessons.css";

// type MyLessonsProps = {
//   userId: string | undefined;
//   role?: string | undefined | null;
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
//     [userId, orgCode],
//   );

//   const { error, response } = useFetch(
//     "/active-lessons",
//     fetchBody,
//     "POST",
//     "application/json",
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
//     <div className="lessons-panel">
//       {/* Header */}
//       <div className="lessons-panel-header">
//         <div className="lessons-panel-header-content">
//           <span className="lessons-panel-icon">
//             <svg
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//               <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//             </svg>
//           </span>
//           <h2 className="lessons-panel-title">השיעורים שלי</h2>
//           <span className="lessons-panel-count">
//             {myLessons.length > 0 ? myLessons.length : ""}
//           </span>
//         </div>
//         <button
//           className="lessons-panel-close"
//           onClick={() =>
//             handleCurrentLessonsModal
//               ? handleCurrentLessonsModal(currentLessonsModal)
//               : null
//           }
//           aria-label="Close"
//         >
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="18" y1="6" x2="6" y2="18" />
//             <line x1="6" y1="6" x2="18" y2="18" />
//           </svg>
//         </button>
//       </div>

//       {/* Lesson List */}
//       <div className="lessons-panel-body">
//         {myLessons.length ? (
//           <div className="lessons-list">
//             {[...myLessons].reverse().map((lesson, idx) => (
//               <Link
//                 key={idx}
//                 to="/lesson"
//                 className="lesson-card-link"
//                 onClick={() => {
//                   const originalIdx = myLessons.length - 1 - idx;
//                   const activeLesson = myLessons.filter(
//                     (__, i) => i === originalIdx,
//                   );
//                   setActiveLesson(activeLesson);
//                 }}
//                 style={{ animationDelay: `${idx * 0.06}s` }}
//               >
//                 <article className="lesson-card">
//                   <div className="lesson-card-accent" />
//                   <div className="lesson-card-content">
//                     <div className="lesson-card-top-row">
//                       <h3 className="lesson-card-headline">
//                         {lesson?.lessonData?.headline}
//                       </h3>
//                       <span className="lesson-card-arrow">
//                         <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <polyline points="15 18 9 12 15 6" />
//                         </svg>
//                       </span>
//                     </div>
//                     <div className="lesson-card-meta">
//                       <div className="lesson-card-author">
//                         {lesson?.createdByInfo?.profilePic ? (
//                           <img
//                             className="lesson-card-avatar"
//                             src={lesson.createdByInfo.profilePic}
//                             alt=""
//                           />
//                         ) : (
//                           <span className="lesson-card-avatar-fallback">
//                             {lesson?.createdByInfo?.firstName?.[0] || "?"}
//                           </span>
//                         )}
//                         <span className="lesson-card-author-name">
//                           {lesson?.createdByInfo?.firstName}{" "}
//                           {lesson?.createdByInfo?.lastName}
//                         </span>
//                       </div>
//                       <time className="lesson-card-date">
//                         {formatDate(lesson?.createdAt)}
//                       </time>
//                     </div>
//                   </div>
//                   <div className="lesson-card-glow" />
//                 </article>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="lessons-empty-state">
//             <div className="lessons-empty-icon">
//               <svg
//                 width="48"
//                 height="48"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//                 <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//               </svg>
//             </div>
//             <p className="lessons-empty-title">אין שיעורים פעילים</p>
//             <p className="lessons-empty-subtitle">
//               שיעורים חדשים יופיעו כאן כשהמורה יפעיל אותם
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { formatDate } from "../../common/logic/formatDate";
import "./MyLessons.css";

// ── Dummy lesson data ──
const DUMMY_LESSONS = [
  {
    lessonId: "lesson-001",
    lessonData: {
      headline: "מערכת השמש",
      description: "למדו על כוכבי הלכת במערכת השמש באמצעות מודלים תלת-ממדיים",
      instructions: "סרקו את הסמן כדי להציג את כוכבי הלכת",
    },
    createdByInfo: {
      firstName: "דנה",
      lastName: "כהן",
      profilePic: null,
    },
    createdAt: new Date("2025-03-20").toISOString(),
    classAgeGroup: 6,
  },
  {
    lessonId: "lesson-002",
    lessonData: {
      headline: "גוף האדם",
      description: "חקרו את איברי הגוף דרך מציאות רבודה",
      instructions: "כוונו את המצלמה אל הסמנים המודפסים",
    },
    createdByInfo: {
      firstName: "יוסי",
      lastName: "לוי",
      profilePic: null,
    },
    createdAt: new Date("2025-03-25").toISOString(),
    classAgeGroup: 5,
  },
  {
    lessonId: "lesson-003",
    lessonData: {
      headline: "צורות גיאומטריות",
      description: "היכרות עם צורות תלת-ממדיות: תיבה, גליל, חרוט וכדור",
      instructions: "סרקו כל סמן כדי לראות צורה שונה",
    },
    createdByInfo: {
      firstName: "מיכל",
      lastName: "אברהם",
      profilePic: null,
    },
    createdAt: new Date("2025-03-28").toISOString(),
    classAgeGroup: 3,
  },
  {
    lessonId: "lesson-004",
    lessonData: {
      headline: "Demo",
      description: "Create your own Model using AI",
      instructions:
        "Type a prompt, and wait for your model to be built! (Example prompt: 'Short man in a top hat')",
    },
    createdByInfo: {
      firstName: "מיכל",
      lastName: "אברהם",
      profilePic: null,
    },
    createdAt: new Date("2025-03-28").toISOString(),
    classAgeGroup: 3,
  },
];

export function MyLessons({}: any) {
  const { setActiveLesson } = useAppContext();
  const lessons = DUMMY_LESSONS;

  return (
    <div className="lessons-page">
      {/* Page Header */}
      <div className="lessons-page-header">
        <span className="lessons-page-icon">
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
        <h2 className="lessons-page-title">השיעורים שלי</h2>
        {lessons.length > 0 && (
          <span className="lessons-page-count">{lessons.length}</span>
        )}
      </div>

      {/* Lesson List */}
      <div className="lessons-page-body">
        {lessons.length ? (
          <div className="lessons-list">
            {[...lessons].reverse().map((lesson, idx) => (
              <Link
                key={lesson.lessonId}
                to="/lesson"
                className="lesson-card-link"
                onClick={() => {
                  const originalIdx = lessons.length - 1 - idx;
                  setActiveLesson([lessons[originalIdx]]);
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
                        <span className="lesson-card-avatar-fallback">
                          {lesson?.createdByInfo?.firstName?.[0] || "?"}
                        </span>
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
