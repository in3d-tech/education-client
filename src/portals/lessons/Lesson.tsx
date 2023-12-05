import { useState, Component } from "react";
import ARComponent from "./ArLesson";
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

class Test extends Component {
  state = {
    result: "No result",
  };

  handleScan = (data: any) => {
    if (data) {
      this.setState({ result: data });
    }
  };

  handleError = (err: any) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <QrReader
          scanDelay={300}
          constraints={{ facingMode: "user" }}
          // onError={this.handleError}
          onResult={this.handleScan}
          videoStyle={{ width: "100%" }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}
