import { useState } from "react";
// import ARComponent from "./ArLesson";
import { QrReader } from "react-qr-reader";

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
  return <Test />;
  // return <ARComponent isSquare={true} />;
}

const Test = () => {
  const [data, setData] = useState<any>("No result");

  return (
    <>
      <QrReader
        constraints={{ facingMode: "user" }}
        onResult={(result, error) => {
          if (!!result) {
            alert(result);
            setData(result?.getText());
          }

          if (!!error) {
            console.info(error);
          }
        }}
        videoStyle={{ width: "100%" }}
      />
      <p>{data}</p>
    </>
  );
};
