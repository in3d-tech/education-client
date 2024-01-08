import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { formatDate } from "../../common/logic/formatDate";
import { useFetch } from "../../common/logic/useFetch";

type MyLessonsProps = {
  userId: string | undefined;
  role?: string | undefined | null;
  onCloseClick?: () => void;
};

export function MyLessons({ userId, onCloseClick }: MyLessonsProps) {
  const [lessonCode, setLessonCode] = useState<string>("");

  const { myLessons, setMyLessons, setActiveLesson } = useAppContext();
  try {
    const { error, response } = useFetch(
      "/active-lessons",
      JSON.stringify({ userId })
    );

    // useEffect which updates myLessons when response is updated
    useEffect(() => {
      if (response) {
        setMyLessons(response);
      }
      if (error) {
        console.error("Error fetching my lessons:", error);
      }
    }, [response, error]);
  } catch (err) {
    console.error(err);
  }

  const joinLesson = async () => {
    try {
      const data = { lessonCode, userId };

      if (myLessons.length) {
        const isUserAlreadyInLesson = myLessons.some(
          (lesson) => lesson.lessonId == lessonCode
        );
        if (isUserAlreadyInLesson) {
          alert("Already enrolled in that lesson");
          setLessonCode("");
          return;
        }
      }

      const { error } = useFetch("/join-lesson", JSON.stringify(data));

      if (error) {
        console.log(error);
      }
      // do something with response
    } catch {
      alert("error with login ");
      console.log("error with login");
    }
  };

  return (
    <div className="my-lesson-wrapper">
      <div className="my-lessons-list">
        <span
          style={{
            color: "black",
            height: ".1em",
            fontSize: "1.2em",
            textDecoration: "underline",
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
                          (__, idx2) => idx == idx2
                        );
                        setActiveLesson(activeLesson);
                      }}
                    >
                      <button
                        className="my-lessons-btn"
                        style={{ width: "100%" }}
                      >
                        <span className="my-lessons-created-by-headline">
                          {lesson?.headline}
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
                          {formatDate(lesson.createdAt)}
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
        <div className="join-lesson-container">
          <input
            onChange={(e) => setLessonCode(e.target.value)}
            type="text"
            placeholder="Lesson code"
            value={lessonCode}
          />
          <button onClick={joinLesson} className="btn" style={{ margin: 0 }}>
            Join Lesson
          </button>
        </div>
        <button onClick={onCloseClick}>close</button>
      </div>
    </div>
  );
}
