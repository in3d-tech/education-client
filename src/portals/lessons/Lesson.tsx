import { useState, useRef, useEffect } from "react";
import ARComponent from "./ArLesson";
import { Html5QrcodeScanner } from "html5-qrcode";

export function Lesson() {
  const [scanQr, setScanQr] = useState<boolean>(false);
  const [isArScan, setIsArScan] = useState<boolean>(false);

  return scanQr ? (
    <ScanQrForModel isArScan={isArScan} setIsArScan={setIsArScan} />
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

function ScanQrForModel({ isArScan, setIsArScan }: any) {
  return isArScan ? (
    <ARComponent isSquare={true} />
  ) : (
    <QRScanner setIsArScan={setIsArScan} />
  );
  // return <ARComponent isSquare={true} />;
}

export const QRScanner = ({ setIsArScan }: any) => {
  const scannerRef: any = useRef(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scanner: any = new Html5QrcodeScanner(scannerRef.current.id, {
      fps: 20,
      qrbox: { width: 250, height: 250 },
    });

    const success = (result: string) => {
      if (resultRef.current) {
        if (result == "4") {
          alert(`result is somehow equal to 4???`);
          setIsArScan(true);
        }
        resultRef.current.innerHTML = `
          <h2>Success!</h2>
          <p><a href="${result}">${result}</a></p>
        `;
        scanner.clear();
        if (scannerRef.current) scannerRef.current.remove();
      }
    };

    const error = (err: Error) => {
      console.error(err);
    };

    scanner.render(success, error);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div id="reader" ref={scannerRef} style={{ width: 600 }}></div>
      <div
        id="result"
        ref={resultRef}
        style={{ textAlign: "center", fontSize: "1.5rem" }}
      ></div>
    </main>
  );
};
