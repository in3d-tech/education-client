import { StudentPortal } from "../portals/StudentPortal";
import { TeacherPortal } from "../portals/TeacherPortal";
import { User } from "../App";

type HomePageProps = { user: User };

export function Homepage({ user }: HomePageProps) {
  return !true ? <StudentPortal user={user} /> : <TeacherPortal user={user} />;
}
