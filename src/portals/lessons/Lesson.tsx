import { useLocation } from "react-router-dom";
import ARComponent from "./ArLesson";

export function Lesson() {
  const location = useLocation();
  const user: any = location.state && location.state.lesson;
  return (
    <ARComponent />
    // <div>
    //   <h1>we made it the lesson page!</h1>
    //   <
    // </div>
  );
}
