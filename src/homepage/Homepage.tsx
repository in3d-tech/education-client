// import { StudentPortal } from "../portals/StudentPortal";
// import { TeacherPortal } from "../portals/TeacherPortal";
// import { User } from "../App";

// type HomePageProps = { user: User };

// export function Homepage({ user }: HomePageProps) {
//   return user && user.role == "student" ? (
//     <StudentPortal user={user} />
//   ) : (
//     <TeacherPortal user={user} />
//   );
// }

import { MyLessons } from "../portals/lessons/MyLessons";
import { Navbar } from "../navigation/Navbar";

export function Homepage() {
  return (
    <div className="homepage-screen">
      <Navbar user={null} title={"הלימודים שלי"} />
      <MyLessons />
    </div>
  );
}
