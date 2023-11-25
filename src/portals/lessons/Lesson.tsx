import { useLocation } from "react-router-dom";

export function Lesson() {
  const location = useLocation();
  const user: any = location.state && location.state.lesson;
  return (
    <div>
      <h1>we made it the lesson page!</h1>
    </div>
  );
}
