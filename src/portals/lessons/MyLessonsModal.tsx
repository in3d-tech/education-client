// import Modal from "react-modal";
// import { MyLessons } from "./MyLessons";
// import { User } from "../../App";

// type StudentPortalProps = {
//   user: User;
//   role?: string | undefined | null;
//   onCloseClick?: () => void;
//   handleModel: (prevState: boolean) => void;
//   modalIsOpen?: boolean;
// };

// export function MyLessonsModal({
//   user,
//   onCloseClick,
//   handleModel,
//   modalIsOpen,
// }: StudentPortalProps) {
//   return (
//     <Modal
//       isOpen={modalIsOpen}
//       onRequestClose={() => handleModel(modalIsOpen)}
//       contentLabel="My lessons"
//       style={{
//         content: {
//           padding: 0,
//           overflow: "hidden",
//           boxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
//           WebkitBoxShadow: "-2px 2px 15px 1px rgba(0, 0, 0, 0.75)",
//         },
//       }}
//     >
//       <MyLessons
//         userId={user?.userId}
//         role={user?.role}
//         onCloseClick={onCloseClick}
//       />
//       {/* Your form or any other content can go here */}
//     </Modal>
//   );
// }
