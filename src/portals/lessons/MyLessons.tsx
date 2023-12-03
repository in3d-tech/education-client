import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type MyLessonsProps = {
  userId: string | undefined;
  role?: string | undefined | null;
};

export function MyLessons({ userId, role }: MyLessonsProps) {
  const [myLessons, setMyLessons] = useState<any[]>([]);
  const [lessonCode, setLessonCode] = useState<string>("");

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
      console.log("joining lessson", data);
      const response = await fetch("http://localhost:3000/join-lesson", {
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
        <div>
          <input
            onChange={(e) => setLessonCode(e.target.value)}
            type="text"
            placeholder="Lesson code"
            value={lessonCode}
          />
          <button onClick={() => joinLesson()} className="btn">
            Join Lesson
          </button>
        </div>
        {myLessons.length ? (
          myLessons.map((lesson, idx) => {
            return (
              <div
                key={idx}
                style={{
                  color: "black",
                  width: "80%",
                  marginTop: "2em",
                  margin: 0,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link to="/lesson">
                  <button className="btn" style={{ width: "30vw" }}>
                    {lesson.headline}
                  </button>
                </Link>
              </div>
            );
          })
        ) : (
          <div>
            <div style={{ color: "black" }}>No active lessons</div>
            {role == "student" ? (
              <div>
                <input
                  onChange={(e) => setLessonCode(e.target.value)}
                  type="text"
                  placeholder="Lesson code"
                  value={lessonCode}
                />
                <button className="btn">Join Lesson</button>
              </div>
            ) : null}
          </div>
        )}
      </div>
      {/* <div>
        <Link to="/lesson">
          <button> {"fake click this for camera"}</button>
        </Link>
      </div> */}
    </div>
  );
}
