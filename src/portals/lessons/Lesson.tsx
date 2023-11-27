// import { useLocation } from "react-router-dom";
import { useState } from "react";
import ARComponent from "./ArLesson";

export function Lesson() {
  const [scanQr, setScanQr] = useState<boolean>(false);
  // const location = useLocation();
  // const user: any = location.state && location.state.lesson;
  return scanQr ? (
    <ScanQrForModel />
  ) : (
    <div style={{ height: "100vh" }}>
      <div>
        <h3 style={{ color: "black" }}>Headline:</h3>
      </div>
      <div>
        <h3 style={{ color: "black" }}>Description here</h3>
      </div>
      <div>
        <h3 style={{ color: "black" }}>Instructions here</h3>
      </div>
      <button onClick={() => setScanQr(true)}>Scan QR</button>
    </div>
  );
  // <div>
  //   <h1>we made it the lesson page!</h1>
  //   <
  // </div>
}

function ScanQrForModel() {
  return <ARComponent />;
}
