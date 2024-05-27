import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { formatDate } from "../../common/logic/formatDate";
import { useFetch } from "../../common/logic/useFetch";

type MyLessonsProps = {
  userId: string | undefined;
  role?: string | undefined | null;
  // onCloseClick?: () => void;
  handleCurrentLessonsModal?: (prevState: boolean) => void;
  currentLessonsModal?: boolean;
};

export function MyLessons({
  userId,
  handleCurrentLessonsModal,
  currentLessonsModal = false,
}: MyLessonsProps) {
  const { myLessons, setMyLessons, setActiveLesson } = useAppContext();

  const fetchBody = useMemo(() => JSON.stringify({ userId }), [userId]);

  const { error, response } = useFetch(
    "/active-lessons",
    fetchBody,
    "POST",
    "application/json"
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
    <div className="my-lesson-wrapper">
      <div style={{ position: "absolute", right: "1em", top: "0.6em" }}>
        <button
          style={{
            borderRadius: "50%",
            width: "2em",
            height: "2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() =>
            handleCurrentLessonsModal
              ? handleCurrentLessonsModal(currentLessonsModal)
              : null
          }
        >
          x
        </button>
      </div>
      <div className="my-lessons-list">
        <span
          style={{
            color: "black",

            height: ".1em",

            fontSize: "2.5em",

            fontFamily: "gotham",
          }}
        >
          My Lessons
        </span>
        <div className="my-lessons-list-container">
          {myLessons.length ? (
            myLessons

              .map((lesson, idx) => {
                return (
                  <div
                    key={idx}
                    style={{
                      color: "black",

                      marginTop: "2em",

                      margin: 0,

                      width: "96%",
                    }}
                  >
                    <Link
                      to="/lesson"
                      style={{ width: "100%" }}
                      onClick={() => {
                        const activeLesson = myLessons.filter(
                          (__, idx2) => idx === idx2
                        );
                        setActiveLesson(activeLesson);
                      }}
                    >
                      <button
                        className="my-lessons-btn"
                        style={{ width: "100%" }}
                      >
                        <span className="my-lessons-created-by-headline">
                          {lesson?.lessonData?.headline}
                        </span>
                        <span className="my-lessons-created-by-name">
                          {lesson?.createdByInfo?.firstName}{" "}
                          {lesson?.createdByInfo?.lastName}
                          {lesson?.createdByInfo?.profilePic ? (
                            <img
                              className="my-lessons-created-by-pic"
                              src={lesson.createdByInfo.profilePic}
                              alt="prfl"
                            />
                          ) : null}
                        </span>
                        <span className="my-lessons-created-at-date">
                          {formatDate(lesson?.createdAt)}
                        </span>
                      </button>
                    </Link>
                  </div>
                );
              })
              .reverse()
          ) : (
            <div>
              <div style={{ color: "black" }}>No active lessons</div>
            </div>
          )}
        </div>
        {/* Additional UI components can be included here */}
      </div>
    </div>
  );
}
