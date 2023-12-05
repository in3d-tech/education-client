import { useEffect, useState, useRef } from "react";
// import jsQR from "jsQR";
const jsQR = require("jsQR");

type ARComponentProps = {
  isSquare?: boolean;
};

const ARComponent = ({ isSquare }: ARComponentProps) => {
  const [qrContent, setQrContent] = useState(null);
  const videoElem: any = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          videoElem.current.srcObject = stream;
          videoElem.current.addEventListener("play", startScanning);
          videoElem.current.play();
        });
    }
    return () => {
      videoElem.current &&
        videoElem.current.removeEventListener("play", startScanning);
    };
  }, []);

  const startScanning = () => {
    const canvas = document.createElement("canvas");
    const context: any = canvas.getContext("2d");
    const scan = () => {
      context.drawImage(
        videoElem.current,
        0,
        0,
        videoElem.current.videoWidth,
        videoElem.current.videoHeight
      );
      const imageData = context.getImageData(
        0,
        0,
        videoElem.current.videoWidth,
        videoElem.current.videoHeight
      );

      const qrCode: any = jsQR(
        imageData.data,
        imageData.width,
        imageData.height
      );
      if (qrCode) {
        setQrContent(qrCode.data);
        videoElem.current.removeEventListener("play", scan);
      } else {
        requestAnimationFrame(scan);
      }
    };
    scan();
  };

  if (!qrContent) {
    return <video ref={videoElem}></video>;
  }

  const iframeHTML = `
        <html>
            <head>
                <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
                <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
            </head>
            <body style="margin: 0px; overflow: hidden">
                <a-scene embedded arjs>
                ${
                  !isSquare
                    ? `<a-assets>
                        <a-asset-item id="3D-model" src="./assets/models/new-tank/tanky future new.gltf"></a-asset-item>
                    </a-assets>`
                    : null
                }
                <a-marker type='pattern' url='./assets/markers/pattern-real-query-param.patt'>
                ${
                  isSquare
                    ? ` <a-box position="0 0.5 0" material="color: red;">
                <a-animation
                    attribute="rotation"
                    dur="3000"
                    to="360 360 0"
                    repeat="indefinite"
                    easing="linear"
                ></a-animation>
            </a-box>`
                    : ` <a-entity gltf-model="#3D-model"
                    scale="0.004 0.004 0.004 position="-3 0.01 -2">
                    <a-animation
                        attribute="rotation"
                        dur="11000"
                        to="0 360 0"
                        repeat="indefinite"
                        easing="linear"
                    ></a-animation>
                  </a-entity>`
                }  
                    </a-marker>
                    <a-entity camera></a-entity>
                </a-scene>
            </body>
        </html>`;

  return (
    <iframe
      srcDoc={iframeHTML}
      style={{ width: "100vw", height: "100vh", border: "none" }}
    ></iframe>
  );
};

export default ARComponent;

// const ARComponent = ({ isSquare }: ARComponentProps) => {
//   if (!navigator.mediaDevices) {
//     return (
//       <div>
//         <p>
//           WebRTC not supported in this browser. Please use a supported browser.
//         </p>
//       </div>
//     );
//   }

//   const iframeHTML = `
// <html>
// <head>
//   <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
//   <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
// </head>
// <body style="margin: 0px; overflow: hidden">
//   <a-scene embedded arjs>
//   ${
//     !isSquare
//       ? `<a-assets>
//           <a-asset-item id="3D-model" src="./assets/models/new-tank/tanky future new.gltf"></a-asset-item>
//         </a-assets>`
//       : null
//   }
//   <a-marker type='pattern' url='./assets/markers/pattern-real-query-param.patt'>
//   ${
//     isSquare
//       ? ` <a-box position="0 0.5 0" material="color: red;">
//   //       <a-animation
//   //         attribute="rotation"
//   //         dur="3000"
//   //         to="360 360 0"
//   //         repeat="indefinite"
//   //         easing="linear"
//   //       ></a-animation>
//   //     </a-box>`
//       : ` <a-entity gltf-model="#3D-model"
//             cale="0.004 0.004 0.004 position="-3 0.01 -2">
//             <a-animation
//               attribute="rotation"
//               dur="11000"
//               to="0 360 0"
//               repeat="indefinite"
//               easing="linear"
//             ></a-animation>
//           </a-entity>`
//   }
//     </a-marker>
//     <a-entity camera></a-entity>
//   </a-scene>
// </body>
// </html>`;

//   return (
//     <iframe
//       srcDoc={iframeHTML}
//       style={{ width: "100vw", height: "100vh", border: "none" }}
//     ></iframe>
//   );
// };

// export default ARComponent;

// first rendition of model spinnning --->

// const iframeHTML = `
// <html>
// <head>
//   <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
//   <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
// </head>
// <body style="margin: 0px; overflow: hidden">
//   <a-scene embedded arjs>
//     <a-assets>
//       <a-asset-item id="3D-model" src="./assets/models/new-tank/tanky future new.gltf"></a-asset-item>
//     </a-assets>
//     <a-marker preset="hiro">
//       <a-entity gltf-model="#3D-model"
//       scale="0.002 0.002 0.002 position="-3 0.01 -2">
//         <a-animation
//             attribute="rotation"
//             dur="11000"
//             to="360 360 0"
//             repeat="indefinite"
//             easing="linear"
//         ></a-animation>
//       </a-entity>
//     </a-marker>
//     <a-entity camera></a-entity>
//   </a-scene>
// </body>
// </html>`;

// this is with custom code::::

// const iframeHTML = `
// <html>
// <head>
//   <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
//   <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
// </head>
// <body style="margin: 0px; overflow: hidden">
//   <a-scene embedded arjs>
//   ${
//     !isSquare
//       ? `<a-assets>
//           <a-asset-item id="3D-model" src="./assets/models/new-tank/tanky future new.gltf"></a-asset-item>
//         </a-assets>`
//       : null
//   }
//   <a-marker type='pattern' url='./assets/markers/pattern-real-query-param.patt'>
//   ${
//     isSquare
//       ? ` <a-box position="0 0.5 0" material="color: red;">
//   //       <a-animation
//   //         attribute="rotation"
//   //         dur="3000"
//   //         to="360 360 0"
//   //         repeat="indefinite"
//   //         easing="linear"
//   //       ></a-animation>
//   //     </a-box>`
//       : ` <a-entity gltf-model="#3D-model"
//             cale="0.004 0.004 0.004 position="-3 0.01 -2">
//             <a-animation
//               attribute="rotation"
//               dur="11000"
//               to="0 360 0"
//               repeat="indefinite"
//               easing="linear"
//             ></a-animation>
//           </a-entity>`
//   }
//     </a-marker>
//     <a-entity camera></a-entity>
//   </a-scene>
// </body>
// </html>`;
