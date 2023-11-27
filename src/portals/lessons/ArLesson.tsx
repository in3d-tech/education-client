// import React from "react";

// const frameHTML = `<a-scene embedded arjs>
// <a-marker preset="hiro">
// <a-box position="0 0.5 0" material="color: red;">
//   <a-animation
//     attribute="rotation"
//     dur="3000"
//     to="360 360 0"
//     repeat="indefinite"
//     easing="linear"
//   ></a-animation>
// </a-box>
// </a-marker>
// <a-entity camera></a-entity>
//                   </a-scene>`;

// const ARComponent = () => {
//   return (
//     <div key={Date.now()} dangerouslySetInnerHTML={{ __html: frameHTML }} />
//   );
// };

// export default ARComponent;

// const frameHTML = `<html><body style="margin: 0px; overflow: hidden">
// <a-scene embedded arjs>
//   <a-marker preset="hiro">
//     <a-box position="0 0.5 0" material="color: red;">
//       <a-animation
//         attribute="rotation"
//         dur="3000"
//         to="360 360 0"
//         repeat="indefinite"
//         easing="linear"
//       ></a-animation>
//     </a-box>
//   </a-marker>
//   <a-entity camera></a-entity>
// </a-scene>
// </body></html>`;

// const ARComponent = () => {
//   return (
//     <iframe
//       srcDoc={frameHTML}
//       style={{ width: "100vw", height: "100vh", border: "none" }}
//     ></iframe>
//   );
// };

const ARComponent = () => {
  if (!navigator.mediaDevices) {
    return (
      <div>
        <p>
          WebRTC not supported in this browser. Please use a supported browser.
        </p>
      </div>
    );
  }
  // const iframeHTML = `
  //   <html>
  //     <head>
  //       <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  //       <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
  //     </head>
  //     <body style="margin: 0px; overflow: hidden">
  //       <a-scene embedded arjs>
  //         <a-marker preset="hiro">
  //           <a-box position="0 0.5 0" material="color: red;">
  //             <a-animation
  //               attribute="rotation"
  //               dur="3000"
  //               to="360 360 0"
  //               repeat="indefinite"
  //               easing="linear"
  //             ></a-animation>
  //           </a-box>
  //         </a-marker>
  //         <a-entity camera></a-entity>
  //       </a-scene>
  //     </body>
  //   </html>`;
  const iframeHTML = `
  <html>
  <head>
    <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
    <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
  </head>
  <body style="margin: 0px; overflow: hidden">
    <a-scene embedded arjs>
      <a-assets>
        <a-asset-item id="3D-model" src="./assets/models/new-tank/tanky future new.gltf"></a-asset-item>
      </a-assets>
      <a-marker preset="hiro">
        <a-entity gltf-model="#3D-model"
        scale="0.5 0.5 0.5 position="0 0.5 0">
          <a-animation
              attribute="rotation"
              dur="5000"
              to="360 360 0"
              repeat="indefinite"
              easing="linear"
          ></a-animation>
        </a-entity>
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
