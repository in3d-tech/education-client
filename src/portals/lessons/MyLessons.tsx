import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type MyLessonsProps = {
  userId: string | undefined;
};

export function MyLessons({ userId }: MyLessonsProps) {
  const [myLessons, setMyLessons] = useState<any[]>([]);

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

  return (
    <div className="my-lesson-wrapper">
      <div className="my-lessons-list">
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
                  <button className="btn" style={{ width: "100%" }}>
                    {lesson.headline}
                  </button>
                </Link>
              </div>
            );
          })
        ) : (
          <div style={{ color: "black" }}>No active lessons</div>
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
