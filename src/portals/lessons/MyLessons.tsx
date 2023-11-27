import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type MyLessonsProps = {
  userId: string | undefined;
};

export function MyLessons({ userId }: MyLessonsProps) {
  const [myLessons, setMyLessons] = useState<any[]>([]);

  const fetchMyLessons = async () => {
    try {
      const response = await fetch("http://localhost:3000/active-lessons", {
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
    <div>
      {myLessons.length ? (
        myLessons.map((lesson, idx) => {
          return (
            <div key={idx} style={{ color: "black" }}>
              <Link to="/lesson">
                <button> {lesson.headline}</button>
              </Link>
            </div>
          );
        })
      ) : (
        <div style={{ color: "black" }}>No active lessons</div>
      )}
      <Link to="/lesson">
        <button> {"fake click this for camera"}</button>
      </Link>
    </div>
  );
}
