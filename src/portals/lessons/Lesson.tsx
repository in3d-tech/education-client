import { useState, useRef, useEffect } from "react";
import ARComponent from "./ArLesson";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useAppContext } from "../../context/appContext";

const markers: any = {
  1: "./assets/markers/pattern-1.patt",
  2: "./assets/markers/pattern-2.patt",
  3: "./assets/markers/pattern-3.patt",
  4: "./assets/markers/pattern-4.patt",
  5: "./assets/markers/pattern-5.patt",
};

export function Lesson() {
  const [scanQr, setScanQr] = useState<boolean>(false);
  const [isArScan, setIsArScan] = useState<boolean>(false);

  const { activeLesson } = useAppContext();

  return scanQr ? (
    <ScanQrForModel isArScan={isArScan} setIsArScan={setIsArScan} />
  ) : (
    <div style={{ height: "100vh" }}>
      <div>
        <h3 style={{ color: "black" }}>
          {activeLesson?.headline || "headline"}
        </h3>
      </div>
      <div>
        <h3 style={{ color: "black" }}>{activeLesson?.description}</h3>
      </div>
      <div>
        <h3 style={{ color: "black" }}>{activeLesson?.instructions}</h3>
      </div>
      <button onClick={() => setScanQr(true)}>Scan QR</button>
    </div>
  );
}

function ScanQrForModel({ isArScan, setIsArScan }: any) {
  const [scannedMarker, setScannedMarker] = useState<string | number>("");

  const marker: string | undefined = markers[scannedMarker] || undefined;

  return isArScan ? (
    <ARComponent isSquare={true} marker={marker} />
  ) : (
    <QRScanner setIsArScan={setIsArScan} setScannedMarker={setScannedMarker} />
  );
  // return <ARComponent isSquare={true} />;
}

export const QRScanner = ({ setIsArScan, setScannedMarker }: any) => {
  const scannerRef: any = useRef(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scanner: any = new Html5QrcodeScanner(scannerRef.current.id, {
      fps: 20,
      qrbox: { width: 250, height: 250 },
    });

    const success = (result: string) => {
      if (resultRef.current) {
        setScannedMarker(result);
        setIsArScan(true);
        // resultRef.current.innerHTML = `
        //   <h2>Success!</h2>
        //   <p><a href="${result}">${result}</a></p>
        // `;
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
