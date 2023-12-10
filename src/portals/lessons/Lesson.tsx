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

const translation: any = {
  square: "רבוע",
  circle: "עגול",
};

type QrData = {
  uniqueId: number | string;
  model: string;
};

export function Lesson() {
  const [scanQr, setScanQr] = useState<boolean>(false);
  const [isArScan, setIsArScan] = useState<boolean>(false);
  const [selectedScan, setSelectedScan] = useState<any>(null);

  const { activeLesson } = useAppContext();

  if (!activeLesson)
    return (
      <div>
        <h1>Error Finding Lesson</h1>
      </div>
    );

  const currentLesson = activeLesson[0];

  console.log(currentLesson.qrList);

  return scanQr ? (
    <ScanQrForModel
      isArScan={isArScan}
      setIsArScan={setIsArScan}
      selectedScan={selectedScan}
      setScanQr={setScanQr}
    />
  ) : (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <h3 style={{ color: "black" }}>
          {currentLesson?.headline || "headline"}
        </h3>
      </div>
      <div>
        <h3 style={{ color: "black" }}>{currentLesson?.description}</h3>
      </div>
      <div>
        <h3 style={{ color: "black" }}>{currentLesson?.instructions}</h3>
      </div>
      <div
        style={{
          width: "96%",
          // height: "50%",
        }}
      >
        {currentLesson.qrList.length ? (
          currentLesson.qrList.map((qrData: QrData, idx: number) => (
            <div
              key={idx}
              style={{
                height: "5em",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "0.5em",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  color: "black",
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <span>מספר QR:</span>
                <span style={{ marginRight: "4px", fontWeight: "bold" }}>
                  {qrData.uniqueId}
                </span>
              </div>
              <div style={{ color: "black", flex: 1 }}>
                {translation[qrData.model]}
              </div>
              <div>
                <button
                  style={{ color: "black", flex: 1 }}
                  onClick={() => {
                    setSelectedScan({
                      model: qrData.model,
                      id: qrData.uniqueId,
                    });
                    setScanQr(true);
                  }}
                >
                  Scan QR
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 style={{ color: "black" }}>no qr's added</h2>
        )}
      </div>

      {/* <button onClick={() => setScanQr(true)}>Scan QR</button> */}
    </div>
  );
}

function ScanQrForModel({
  isArScan,
  setIsArScan,
  selectedScan,
  setScanQr,
}: any) {
  const [scannedMarker, setScannedMarker] = useState<string | number>("");

  const marker: string | undefined = markers[scannedMarker] || undefined;

  return isArScan ? (
    <>
      <ARComponent
        isSquare={true}
        marker={marker}
        selectedScan={selectedScan}
      />
      <button
        onClick={() => {
          setScanQr(false);
          setIsArScan(false);
        }}
      >
        Close Camera
      </button>
    </>
  ) : (
    <QRScanner setIsArScan={setIsArScan} setScannedMarker={setScannedMarker} />
  );
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
