import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

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
      const response = await fetch("http://192.168.1.224:3000/active-lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const myLessonsData = await response.json();
        setMyLessons(myLessonsData);
      } else {
        console.error("Error fetching my lessons. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching my lessons:", error);
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

      const response = await fetch("http://192.168.1.224:3000/join-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      alert(res);
    } catch {
      alert("error with login ");
      console.log("error with login");
    }
  };

  return (
    <div className="my-lesson-wrapper">
      <div className="my-lessons-list">
        <span style={{ color: "black" }}>My Lessons</span>
        <div className="my-lessons-list-container">
          {myLessons.length ? (
            myLessons.map((lesson, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    color: "black",
                    marginTop: "2em",
                    margin: 0,
                    width: "96%",
                    height: "190%",
                    // display: "flex",
                    // justifyContent: "center",
                  }}
                >
                  {/* <li> */}
                  <Link
                    to="/lesson"
                    style={{ width: "100%" }}
                    onClick={() => {
                      const activeLesson = myLessons.map(
                        (__, idx2) => idx == idx2
                      );
                      setActiveLesson(activeLesson);
                    }}
                  >
                    <button
                      className="my-lessons-btn"
                      style={{ width: "100%" }}
                    >
                      {lesson.headline}
                    </button>
                  </Link>
                  {/* </li> */}
                </div>
              );
            })
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
