import { useEffect } from "react";
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
  // onCloseClick,
  handleCurrentLessonsModal,
  currentLessonsModal = false,
}: MyLessonsProps) {
  // const [lessonCode, setLessonCode] = useState<string>("");

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

  // const joinLesson = async () => {
  //   try {
  //     const data = { lessonCode, userId };

  //     if (myLessons.length) {
  //       const isUserAlreadyInLesson = myLessons.some(
  //         (lesson) => lesson.lessonId == lessonCode
  //       );
  //       if (isUserAlreadyInLesson) {
  //         alert("Already enrolled in that lesson");
  //         setLessonCode("");
  //         return;
  //       }
  //     }

  //     const { error } = useFetch("/join-lesson", JSON.stringify(data));

  //     if (error) {
  //       console.log(error);
  //     }
  //     // do something with response
  //   } catch {
  //     alert("error with login ");
  //     console.log("error with login");
  //   }
  // };

  return (
    <div className="my-lesson-wrapper">
      <div style={{ position: "absolute", left: "1.3em", top: "1em" }}>
        <button
          style={{ borderRadius: "12px", width: "5em" }}
          onClick={() =>
            handleCurrentLessonsModal
              ? handleCurrentLessonsModal(currentLessonsModal)
              : null
          }
        >
          close
        </button>
      </div>
      <div className="my-lessons-list">
        <span
          style={{
            color: "black",
            height: ".1em",
            fontSize: "2.5em",
            // textDecoration: "underline",
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
        {/* <div className="join-lesson-container">
          <input
            onChange={(e) => setLessonCode(e.target.value)}
            type="text"
            placeholder="Lesson code"
            value={lessonCode}
          />
          <button onClick={joinLesson} className="btn" style={{ margin: 0 }}>
            Join Lesson
          </button>
        </div> */}
        {/* // up is join lesson ---- down is close modal (not functional) */}
        {/* <button
          style={{ borderRadius: "12px", width: "6em", marginBottom: "0.5em" }}
          onClick={onCloseClick}
        >
          close
        </button> */}
      </div>
    </div>
  );
}
