import { StudentPortal } from "../portals/StudentPortal";
import { TeacherPortal } from "../portals/TeacherPortal";

export function Homepage() {
  return true ? <StudentPortal /> : <TeacherPortal />;
}
