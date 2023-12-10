type ARComponentProps = {
  isSquare?: boolean;
  marker: string | undefined;
  selectedScan: any;
};
{
  /* <a-marker type='pattern' url='./assets/markers/pattern-4.patt'> */
}

const ARComponent = ({ isSquare, marker, selectedScan }: ARComponentProps) => {
  if (!navigator.mediaDevices) {
    return (
      <div>
        <p>
          {`${marker}`}
          WebRTC not supported in this browser. Please use a supported browser.
        </p>
      </div>
    );
  }

  const isCircleModel = `<a-circle position="0 0.5 0" radius="1" color="blue">
  <a-animation
    attribute="rotation"
    dur="12000"
    to="360 360 0"
    repeat="indefinite"
    easing="linear"
  ></a-animation>
</a-circle>`;

  const isSquareModel = `<a-box position="0 0.5 0" material="color: red;">
//       <a-animation
//         attribute="rotation"
//         dur="12000"
//         to="360 360 0"
//         repeat="indefinite"
//         easing="linear"
//       ></a-animation>
//     </a-box>`;

  const modelToUse =
    selectedScan.model == "square" ? isSquareModel : isCircleModel;

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
  <a-marker type='pattern' url='${marker}'>
  ${
    isSquare
      ? modelToUse
      : ` <a-entity gltf-model="#3D-model"
            cale="0.004 0.004 0.004 position="-3 0.01 -2">
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

// this one is example without custom QR ===>

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
//   <a-marker preset="hiro">
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
