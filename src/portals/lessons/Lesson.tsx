import { useState } from "react";
import ARComponent from "./ArLesson";

export function Lesson() {
  const [scanQr, setScanQr] = useState<boolean>(false);

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
}

function ScanQrForModel() {
  return <ARComponent isSquare={true} />;
}
