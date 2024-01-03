import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { formatDate } from "../../common/logic/formatDate";

type MyLessonsProps = {
  userId: string | undefined;
  role?: string | undefined | null;
  onCloseClick?: () => void;
};

export function MyLessons({ userId, onCloseClick }: MyLessonsProps) {
  const [lessonCode, setLessonCode] = useState<string>("");

  const { myLessons, setMyLessons, setActiveLesson } = useAppContext();

  const fetchMyLessons = async () => {
    try {
      const response = await fetch(
        "https://edu-server-ke5y.onrender.com/active-lessons",
        {
          // const response = await fetch("http://192.168.1.224:3000/active-lessons", {

          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        const myLessonsData = await response.json();
        setMyLessons(myLessonsData);
      } else {
        console.error("Error fetching my lessons. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching my lessons:", error);
      const newLesson: any = [
        {
          headline: "View First Models",
          description: "Scan the right QR codes",
          instructions: "See which QR to scan, and write down your results!",
          language: "he",
          classAgeGroup: "2",
          qrList: [
            {
              uniqueId: 1,
              model: "square",
            },
            {
              uniqueId: 2,
              model: "circle",
            },
            {
              uniqueId: 3,
              model: "square",
            },
          ],
          lessonId: 5,
        },
      ];
      setMyLessons(newLesson);
    }
  };

  useEffect(() => {
    fetchMyLessons();
  }, []);

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

      const response = await fetch(
        "https://edu-server-ke5y.onrender.com/join-lesson",
        {
          // const response = await fetch("http://192.168.1.224:3000/join-lesson", {

          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();

      alert(res ? "Successfully joined!" : "error joining lesson");
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
