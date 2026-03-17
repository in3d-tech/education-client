// // @ts-nocheck

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { handleMarkerData } from "./common/getMarkerData";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
// import { useGLTF, useProgress } from "@react-three/drei";

// // import { stopTest } from "./logic/arLogic";
// // const test = new FREE.
// function cleanMaterial(material) {
//   material.dispose();
//   for (const key of Object.keys(material)) {
//     const value = material[key];
//     if (value && typeof value === "object" && "minFilter" in value) {
//       if (typeof value.dispose === "function") {
//         value.dispose();
//       }
//     }
//   }
// }

// // tablet showed 1037 height and 753 width

// // my iphone 669 height and 390 width

// const initializeAR = ({
//   setStartScanning,
//   firstImage,
//   secondImage,
//   images,
//   screenHeight,
//   screenWidth,
// }) => {
//   if (typeof THREEx === "undefined") {
//     throw new Error("THREE is not defined. Make sure three.js is loaded.");
//   }
//   var scene,
//     camera,
//     renderer,
//     clock,
//     deltaTime,
//     totalTime,
//     arToolkitSource,
//     arToolkitContext,
//     planeGeo,
//     planeMat,
//     mesh1,
//     mesh0;

//   function initialize() {
//     // if (scene) return;
//     scene = new THREE.Scene();

//     let ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // new THREE.DirectionalLight(); //(5242880, 0.5);
//     scene.add(ambientLight);
//     camera = new THREE.Camera();
//     scene.add(camera);

//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setClearColor(new THREE.Color("lightgrey"), 0);
//     renderer.setSize(640, 480); //(screenWidth, screenHeight); //(640, 480);
//     renderer.domElement.style.position = "absolute";
//     renderer.domElement.style.top = "0";
//     renderer.domElement.style.left = "0";
//     // renderer.domElement.style.margin = "0";

//     // renderer.domElement.offsetLeft = "0";

//     // console.log(
//     //   { domElement: renderer.domElement },
//     //   renderer.domElement.style.margin
//     // );
//     // console.log("Margin-left: ", renderer.domElement.style.marginLeft);

//     document.body.appendChild(renderer.domElement);
//     clock = new THREE.Clock();

//     deltaTime = 0;
//     totalTime = 0;

//     arToolkitSource = new THREEx.ArToolkitSource({
//       sourceType: "webcam",
//       // ---------------------------------------------------------------- >>> note to uncomment and test these for layout/sizes
//       // sourceHeight: window.innerHeight, // * 0.5,
//       // sourceWidth: window.innerWidth, // * 0.5,
//     });
//     function onResize() {
//       if (arToolkitSource) {
//         arToolkitSource.onResizeElement();
//         arToolkitSource.copyElementSizeTo(renderer.domElement);
//         // const aspectRatio = window.innerWidth / window.innerHeight;
//         // renderer.setSize(window.innerWidth, window.innerHeight);
//         // }
//         // if (arToolkitContext?.arController !== null) {
//         if (arToolkitSource && arToolkitContext) {
//           arToolkitSource.copyElementSizeTo(
//             arToolkitContext.arController.canvas,
//           );
//         }
//       }
//     }

//     arToolkitSource.init(function onReady() {
//       // onResize();
//       setTimeout(function () {
//         onResize(); // Call onResize after a short delay
//       }, 200); // Adjust the delay as needed
//     });
//     window.addEventListener("resize", async function () {
//       onResize();
//     });

//     arToolkitContext = new THREEx.ArToolkitContext({
//       cameraParametersUrl: "/data/camera_para.dat",
//       detectionMode: "mono",
//       // maxDetectionRate: 60,
//       maxDetectionRate: 30, // Processes AR tracking at 30 FPS instead of 60
//       canvasWidth: 640, // Hardcoding processing resolution can also boost performance
//       canvasHeight: 480,
//     });

//     arToolkitContext.init(function onCompleted() {
//       if (arToolkitContext) {
//         camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
//       }
//     });
//     let loader = new THREE.TextureLoader();
//     let texture = loader.load("/assets/images/border.png");
//     // let patternArray = [
//     //   "letterA",
//     //   "letterB",
//     //   "letterC",
//     //   "letterD",
//     //   "letterF",
//     //   "kanji",
//     //   "hiro",
//     //   "pattern1",
//     // ];
//     let patternArray = [
//       "pattern-01",
//       "pattern-02",
//       "pattern-03",
//       "pattern-04",
//       "pattern-05",
//       "pattern-06",
//       "pattern-07",
//       "pattern-08",
//       "pattern-09",
//       "pattern-10",
//     ];
//     let colorArray = [
//       16711680, 16753920, 16776960, 52480, 255, 13434879, 13434828, 16711680,
//     ];
//     let mesh;
//     let mesh0;

//     // for (let i = 0; i < 10; i++) {
//     //   if (arToolkitContext) {
//     //     let markerRoot = new THREE.Group();
//     //     scene.add(markerRoot);
//     //     let markerControls = new THREEx.ArMarkerControls(
//     //       arToolkitContext,
//     //       markerRoot,
//     //       {
//     //         type: "pattern",
//     //         patternUrl: "/data/markers/" + patternArray[i] + ".patt",
//     //         smooth: true, // Turn on smoothing
//     //         smoothCount: 5, // Number of frames to smooth over
//     //         smoothTolerance: 0.01, // Tolerance for smoothing
//     //         smoothThreshold: 2, // Threshold for ignoring bad frames
//     //       },
//     //     );
//     //     // if (patternArray[i] == "letterC") {

//     //     // const belt = images.map((img, idx) => console.log(idx, img));

//     //     // ----------------------------------------------------------------
//     //     // regular photo

//     //     if (images.length && images[i]) {
//     //       if (images[i]?.mtl || images[i]?.obj) {
//     //         // let geometry1 = new THREE.PlaneBufferGeometry(2, 2, 4, 4);
//     //         // let loader = new THREE.TextureLoader();
//     //         // // let texture = loader.load( 'images/earth.jpg', render );
//     //         // let material1 = new THREE.MeshBasicMaterial({
//     //         //   // color: 0x0000ff,
//     //         //   opacity: 1,
//     //         // });
//     //         // mesh = new THREE.Mesh(geometry1, material1);
//     //         // // mesh.rotation.x = -Math.PI / 2;
//     //         // markerRoot.add(mesh);
//     //         // function onProgress(xhr) {
//     //         //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//     //         // }
//     //         // function onError(xhr) {
//     //         //   console.log("An error happened");
//     //         // }

//     //         if (images[i]?.mtl) {
//     //           console.log(images[i]);
//     //           const mtlLoader = new THREE.MTLLoader();

//     //           mtlLoader.load(
//     //             // "https://res.cloudinary.com/dxminwnb3/raw/upload/v1716455491/models/blue_plus_sign_tubzc1.mtl",
//     //             images[i].mtl,
//     //             // "/assets/models/apple.mtl",
//     //             (materials) => {
//     //               materials.preload();

//     //               const objLoader = new THREE.OBJLoader();

//     //               objLoader.setMaterials(materials);

//     //               objLoader.load(
//     //                 // "https://res.cloudinary.com/dxminwnb3/raw/upload/v1716455491/models/ImageToStl.com_blue_plus_sign_mled07.obj",
//     //                 images[i].obj,
//     //                 // "/assets/models/ImageToStl.com_apple.obj",
//     //                 (object) => {
//     //                   i != 4
//     //                     ? object.scale.set(0.1, 0.1, 0.1)
//     //                     : object.scale.set(1, 1, 1);
//     //                   // object.scale.set(1, 1, 1);
//     //                   // object.position.z = -1;
//     //                   // object.rotation.x = 3; // rotation for  +

//     //                   markerRoot.add(object);
//     //                 },
//     //               );
//     //             },
//     //           );
//     //         } else {
//     //           const objLoader = new THREE.OBJLoader();

//     //           objLoader.load(images[i]?.obj, (object) => {
//     //             object.scale.set(0.03, 0.03, 0.03);

//     //             object.rotation.x = -0.5;
//     //             object.rotation.y = 0;

//     //             // Optionally set a default material if no MTL is present

//     //             object.traverse((child) => {
//     //               if (child instanceof THREE.Mesh) {
//     //                 child.material = new THREE.MeshPhongMaterial({
//     //                   color: "black", //0x00ff00,
//     //                 });
//     //               }
//     //             });

//     //             let geometry1 = new THREE.PlaneBufferGeometry(
//     //               2.5,
//     //               2.5,
//     //               4.5,
//     //               4.5,
//     //             );
//     //             let loader = new THREE.TextureLoader();
//     //             // let texture = loader.load( 'images/earth.jpg', render );
//     //             let material1 = new THREE.MeshBasicMaterial({
//     //               // color: 0x0000ff,
//     //               opacity: 1,
//     //             });
//     //             mesh = new THREE.Mesh(geometry1, material1);
//     //             mesh.rotation.x = -0.5;
//     //             mesh.position.z = -1;
//     //             mesh.position.y = -0.5;

//     //             markerRoot.add(mesh);

//     //             markerRoot.add(object);
//     //           });
//     //         }

//     //         console.log("just past the loaders");
//     //       } else {
//     //         handleMarkerData({
//     //           mesh,
//     //           markerRoot,
//     //           image: images[i].image,
//     //           marker: patternArray[i],
//     //           mesh0,
//     //         });
//     //       }
//     //     } else {
//     //       // condition for if no urls/image. default to boxes and 1 image --------------

//     //       if (patternArray[i] == "letterA") {
//     //         let imgTexture = new THREE.TextureLoader().load(
//     //           "/assets/images/aug-real.jpg",
//     //           // "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/4.jpg"
//     //         );
//     //         planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
//     //         planeMat = new THREE.MeshBasicMaterial({
//     //           map: imgTexture,
//     //           doubleSide: true,
//     //         });
//     //         mesh = new THREE.Mesh(planeGeo, planeMat);
//     //         mesh.rotation.x = -1.5;
//     //       } else {
//     //         mesh = new THREE.Mesh(
//     //           patternArray[i] == "pattern1"
//     //             ? new THREE.BoxGeometry(3.25, 3.25, 3.25)
//     //             : new THREE.BoxGeometry(1.25, 1.25, 1.25),
//     //           new THREE.MeshBasicMaterial({
//     //             color: colorArray[i],
//     //             map: texture,
//     //             transparent: true,
//     //             opacity: 0.5,
//     //           }),
//     //         );
//     //         mesh.position.y = 1.25 / 2;
//     //       }
//     //       markerRoot.add(mesh);
//     //     }

//     //     // markerRoot.add(mesh);
//     //   }
//     // }

//     // 1. Initialize the GLTFLoader before the loop
//     const gltfLoader = new GLTFLoader();

//     // 2. Create a Promise that loads the model only once
//     const loadEngineer = new Promise((resolve, reject) => {
//       gltfLoader.load(
//         "/assets/models/engenir_model.glb",
//         (gltf) => resolve(gltf),
//         undefined,
//         (error) => reject(error),
//       );
//     });

//     // 3. Loop through your markers
//     for (let i = 0; i < 10; i++) {
//       if (arToolkitContext) {
//         let markerRoot = new THREE.Group();
//         scene.add(markerRoot);

//         let markerControls = new THREEx.ArMarkerControls(
//           arToolkitContext,
//           markerRoot,
//           {
//             type: "pattern",
//             patternUrl: "/data/markers/" + patternArray[i] + ".patt",
//             smooth: true,
//             smoothCount: 5,
//             smoothTolerance: 0.01,
//             smoothThreshold: 2,
//           },
//         );

//         // 4. Wait for the GLB to load, then clone it onto this marker
//         loadEngineer
//           .then((gltf) => {
//             const model = gltf.scene.clone();

//             // --- THE NUCLEAR FIX ---
//             model.traverse((child) => {
//               if (child.isMesh) {
//                 // Strip away the complex materials and textures entirely.
//                 // This renders the raw geometry as a colorful, shaded object.
//                 child.material = new THREE.MeshNormalMaterial();
//               }
//             });
//             // -----------------------

//             model.scale.set(0.1, 0.1, 0.1);
//             markerRoot.add(model);
//           })
//           .catch((err) => {
//             console.error("Failed to load engineer.glb:", err);
//           });
//       }
//     }
//   }

//   function stop() {
//     if (arToolkitSource && arToolkitSource.domElement.srcObject) {
//       const tracks = arToolkitSource.domElement.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//       arToolkitSource.domElement.srcObject = null;
//       arToolkitSource.domElement.load();
//     }

//     const videoElements = document.querySelectorAll("video");
//     videoElements.forEach((videoElement, idx) => {
//       videoElement.pause();
//       videoElement.srcObject = null;
//       document.body.removeChild(videoElement);
//     });

//     scene.traverse(function (object) {
//       if (!object.isMesh) return;

//       object.geometry.dispose();

//       if (object.material.isMaterial) {
//         cleanMaterial(object.material);
//       } else {
//         for (const material of object.material) cleanMaterial(material);
//       }
//     });

//     if (renderer && renderer.domElement) {
//       document.body.removeChild(renderer.domElement);
//     }

//     if (renderer) {
//       renderer.forceContextLoss();
//       renderer.context = null;
//       renderer.domElement = null;
//       renderer = null;
//     }

//     arToolkitSource = null;
//     if (arToolkitContext) {
//       arToolkitContext = null;
//     }
//   }

//   function update() {
//     if (arToolkitSource?.ready !== false)
//       arToolkitContext?.update(arToolkitSource.domElement);
//   }
//   function render() {
//     renderer?.render(scene, camera);
//   }
//   function animate() {
//     requestAnimationFrame(animate);
//     deltaTime = clock?.getDelta();
//     totalTime += deltaTime;
//     update();
//     render();
//   }

//   return { initialize, animate, scene, stop };
// };

// const ArLessonNew = ({
//   setStartScanning,
//   firstImage,
//   secondImage,
//   images,
//   screenHeight,
//   screenWidth,
// }) => {
//   const arScript = React.useRef(null);

//   console.log({ images });

//   useEffect(() => {
//     const arScriptInstance = initializeAR({
//       setStartScanning,
//       firstImage,
//       secondImage,
//       images,
//       screenHeight,
//       screenWidth,
//     });

//     arScriptInstance.initialize();

//     // const animateLoop = () => {
//     //   if (arScriptInstance) {
//     //     requestAnimationFrame(animateLoop);
//     arScriptInstance.animate();
//     //   }
//     // };

//     // animateLoop();

//     return () => {
//       if (arScriptInstance) {
//         arScriptInstance.stop();
//         arScriptInstance.scene = null;
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <button
//         className="btn"
//         style={{ position: "absolute", zIndex: 1, width: "7em" }}
//         onClick={() => {
//           setStartScanning(false);
//         }}
//       >
//         Back
//       </button>
//     </div>
//   );
// };

// export default ArLessonNew;

// //  -------------------------------- mtl obj loader
// // ----------------------------------------------------------------
// // mesh.rotation.x = -1.5;
// // // let geometry1 = new THREE.PlaneBufferGeometry(2, 2, 4, 4);
// // // let loader = new THREE.TextureLoader();
// // // // let texture = loader.load( 'images/earth.jpg', render );
// // // let material1 = new THREE.MeshBasicMaterial({
// // //   // color: 0x0000ff,
// // //   opacity: 1,
// // // });
// // // mesh1 = new THREE.Mesh(geometry1, material1);
// // // mesh1.rotation.x = -Math.PI / 2;
// // // markerRoot.add(mesh1);
// // // function onProgress(xhr) {
// // //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
// // // }
// // // function onError(xhr) {
// // //   console.log("An error happened");
// // // }
// // // new THREE.MTLLoader()
// // //   .setPath("/assets/models/")
// // //   .load("Soldier_Statue.mtl", function (materials) {
// // //     materials.preload();
// // //     new THREE.OBJLoader()
// // //       .setMaterials(materials)
// // //       .setPath("/assets/models/")
// // //       .load(
// // //         "Soldier_Statue.obj",
// // //         function (group) {
// // //           group.children.forEach((child, index) => {
// // //             // Access and add each part to the markerRoot
// // //             mesh0 = child;
// // //             mesh0.material = new THREE.MeshPhongMaterial({
// // //               // color: 0x0000ff,
// // //               // opacity: 0.8,
// // //             });
// // //             mesh0.scale.set(0.02, 0.02, 0.02);
// // //             // mesh0.rotation.x = -Math.PI / 2;
// // //             // mesh.position.y = 1.25 / 2;
// // //             markerRoot.add(mesh0);
// // //           });
// // //         },
// // //         onProgress,
// // //         onError
// // //       );
// // //   });

// // --------------------------- working with url -----------------------------------

// // function loadModel(objUrl, mtlUrl, markerRoot) {
// // WORKING OBJ MTL LOGIC ----------------------------------------------------------------
// // const mtlLoader = new THREE.MTLLoader();

// // mtlLoader.load(
// //   "https://res.cloudinary.com/dxminwnb3/raw/upload/v1716455491/models/blue_plus_sign_tubzc1.mtl",
// //   (materials) => {
// //     materials.preload();

// //     const objLoader = new THREE.OBJLoader();

// //     objLoader.setMaterials(materials);

// //     objLoader.load(
// //       "https://res.cloudinary.com/dxminwnb3/raw/upload/v1716455491/models/ImageToStl.com_blue_plus_sign_mled07.obj",
// //       (object) => {
// //         object.scale.set(0.1, 0.1, 0.1);

// //         object.rotation.x = 3; // rotation for  +

// //         markerRoot.add(object);
// //       }
// //     );
// //   }
// // );
// // WORKING OBJ MTL LOGIC ----------------------------------------------------------------

// // }

// // WORKING OBJ ONLY ------------------------------------------------------------
// // const objLoader = new THREE.OBJLoader();

// // objLoader.load(
// //   "/assets/models/ImageToStl.com_text.obj",
// //   (object) => {
// //     object.scale.set(0.06, 0.06, 0.06);

// //     object.rotation.x = 0;
// //     object.rotation.y = 0;

// //     // Optionally set a default material if no MTL is present

// //     object.traverse((child) => {
// //       if (child instanceof THREE.Mesh) {
// //         child.material = new THREE.MeshPhongMaterial({
// //           color: 0x00ff00,
// //         });
// //       }
// //     });

// //     markerRoot.add(object);
// //   }
// // );
// // WORKING OBJ ONLY ---------------------

// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { handleMarkerData } from "./common/getMarkerData";

// 1. IMPORT MODERN THREE.JS FROM NPM
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import { useGLTF, useProgress } from "@react-three/drei";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";

// 2. THE BRIDGE: Bind modern Three.js to the global window
// so the older THREEx scripts can find it.
window.THREE = THREE;

function cleanMaterial(material) {
  material.dispose();
  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === "object" && "minFilter" in value) {
      if (typeof value.dispose === "function") {
        value.dispose();
      }
    }
  }
}

const initializeAR = ({
  setStartScanning,
  firstImage,
  secondImage,
  images,
  screenHeight,
  screenWidth,
}) => {
  var scene,
    camera,
    renderer,
    clock,
    deltaTime,
    totalTime,
    arToolkitSource,
    arToolkitContext,
    planeGeo,
    planeMat,
    mesh1,
    mesh0;

  function initialize() {
    // Safety check moved inside initialize so it runs AFTER scripts load
    if (typeof THREEx === "undefined") {
      throw new Error("THREEx is not defined. Scripts did not load correctly.");
    }

    scene = new THREE.Scene();

    // Added a Directional Light so the GLB materials are visible
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    camera = new THREE.Camera();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    renderer.setSize(640, 480);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";

    document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock();
    deltaTime = 0;
    totalTime = 0;

    arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam",
    });

    function onResize() {
      if (arToolkitSource) {
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement);
        if (arToolkitContext && arToolkitContext.arController !== null) {
          arToolkitSource.copyElementSizeTo(
            arToolkitContext.arController.canvas,
          );
        }
      }
    }

    arToolkitSource.init(function onReady() {
      setTimeout(function () {
        onResize();
      }, 200);
    });

    window.addEventListener("resize", async function () {
      onResize();
    });

    arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: "/data/camera_para.dat",
      detectionMode: "mono",
      maxDetectionRate: 30, // Optimized FPS
      canvasWidth: 640,
      canvasHeight: 480,
    });

    arToolkitContext.init(function onCompleted() {
      if (arToolkitContext) {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
      }
    });

    let patternArray = [
      "pattern-01",
      "pattern-02",
      "pattern-03",
      "pattern-04",
      "pattern-05",
      "pattern-06",
      "pattern-07",
      "pattern-08",
      "pattern-09",
      "pattern-10",
    ];

    // Initialize the GLTFLoader
    const gltfLoader = new GLTFLoader();

    // Create a Promise that loads the model only once
    const loadEngineer = new Promise((resolve, reject) => {
      gltfLoader.load(
        "/assets/models/engenir_model.glb",
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error),
      );
    });

    const loadCustomize = new Promise((resolve, reject) => {
      gltfLoader.load(
        "/assets/models/costimize__model_v04 (1).glb",
        (gltf) => resolve(gltf),
        undefined,
        (error) => reject(error),
      );
    });

    // Loop through your markers
    for (let i = 0; i < 10; i++) {
      if (arToolkitContext) {
        let markerRoot = new THREE.Group();
        scene.add(markerRoot);

        let markerControls = new THREEx.ArMarkerControls(
          arToolkitContext,
          markerRoot,
          {
            type: "pattern",
            patternUrl: "/data/markers/" + patternArray[i] + ".patt",
            smooth: true,
            smoothCount: 5,
            smoothTolerance: 0.01,
            smoothThreshold: 2,
          },
        );
        if (i % 2 === 0) {
          loadEngineer
            .then((gltf) => {
              const model = skeletonClone(gltf.scene); // proper skinned mesh clone

              model.traverse((child) => {
                child.frustumCulled = false;

                // if (child.isSkinnedMesh) {
                //   child.material = new THREE.MeshBasicMaterial({
                //     color: 0x88aaff,
                //     skinning: true,
                //     wireframe: true,
                //   });
                //   child.material.needsUpdate = true;
                //   // NO skeleton recalculation — let the original bind pose stay intact
                // } else if (child.isMesh) {
                //   child.material = new THREE.MeshBasicMaterial({
                //     color: 0x88aaff,
                //     wireframe: true,
                //   });
                //   child.material.needsUpdate = true;
                // }
              });

              const box = new THREE.Box3().setFromObject(model);
              const size = box.getSize(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z);
              model.scale.set(1, 1, 1);

              const scaledBox = new THREE.Box3().setFromObject(model);
              model.position.y -= scaledBox.min.y;

              markerRoot.add(model);
            })
            .catch((err) => {
              console.error("Failed to load engenir_model.glb:", err);
            });
        } else {
          // Wait for the GLB to load, then clone it onto this marker
          loadCustomize
            .then((gltf) => {
              const model = skeletonClone(gltf.scene); // proper skinned mesh clone

              model.traverse((child) => {
                child.frustumCulled = false;

                // if (child.isSkinnedMesh) {
                //   child.material = new THREE.MeshBasicMaterial({
                //     color: 0x88aaff,
                //     skinning: true,
                //     wireframe: true,
                //   });
                //   child.material.needsUpdate = true;
                //   // NO skeleton recalculation — let the original bind pose stay intact
                // } else if (child.isMesh) {
                //   child.material = new THREE.MeshBasicMaterial({
                //     color: 0x88aaff,
                //     wireframe: true,
                //   });
                //   child.material.needsUpdate = true;
                // }
              });

              const box = new THREE.Box3().setFromObject(model);
              const size = box.getSize(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z);
              model.scale.set(1, 1, 1);

              const scaledBox = new THREE.Box3().setFromObject(model);
              model.position.y -= scaledBox.min.y;

              markerRoot.add(model);
            })
            .catch((err) => {
              console.error("Failed to load engenir_model.glb:", err);
            });
        }
      }
    }
  }

  function stop() {
    if (arToolkitSource && arToolkitSource.domElement.srcObject) {
      const tracks = arToolkitSource.domElement.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      arToolkitSource.domElement.srcObject = null;
      arToolkitSource.domElement.load();
    }

    const videoElements = document.querySelectorAll("video");
    videoElements.forEach((videoElement) => {
      videoElement.pause();
      videoElement.srcObject = null;
      document.body.removeChild(videoElement);
    });

    scene?.traverse(function (object) {
      if (!object.isMesh) return;
      object.geometry.dispose();
      if (object.material.isMaterial) {
        cleanMaterial(object.material);
      } else {
        for (const material of object.material) cleanMaterial(material);
      }
    });

    if (renderer && renderer.domElement) {
      document.body.removeChild(renderer.domElement);
    }

    if (renderer) {
      renderer.forceContextLoss();
      renderer.context = null;
      renderer.domElement = null;
      renderer = null;
    }

    arToolkitSource = null;
    if (arToolkitContext) {
      arToolkitContext = null;
    }
  }

  function update() {
    if (arToolkitSource?.ready !== false && arToolkitContext) {
      arToolkitContext.update(arToolkitSource.domElement);
    }
  }

  function render() {
    if (renderer) renderer.render(scene, camera);
  }

  // NOTE: We only handle updating data here, we let React handle the loop scheduling
  function animate() {
    deltaTime = clock?.getDelta();
    totalTime += deltaTime;
    update();
    render();
  }

  return { initialize, animate, scene, stop };
};

const ArLessonNew = ({
  setStartScanning,
  firstImage,
  secondImage,
  images,
  screenHeight,
  screenWidth,
}) => {
  const [arLoaded, setArLoaded] = useState(false);
  const requestRef = useRef();
  const arScriptInstance = useRef(null);

  // --- HOOK 1: Sequentially load the legacy THREEx scripts ---
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false; // Forces scripts to load in order
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadArScripts = async () => {
      try {
        await loadScript("/threex/threex-artoolkitsource.js");
        await loadScript("/threex/threex-artoolkitcontext.js");
        await loadScript("/threex/threex-arbasecontrols.js");
        await loadScript("/threex/threex-armarkercontrols.js");

        // --- THE EXPANDED PROTOTYPE PATCH ---
        // THREEx fails to copy modern ES6 class methods automatically.
        // We manually attach them to ALL THREEx modules here.
        const dispatcherMethods = [
          "addEventListener",
          "hasEventListener",
          "removeEventListener",
          "dispatchEvent",
        ];

        dispatcherMethods.forEach((method) => {
          if (window.THREEx) {
            if (window.THREEx.ArToolkitContext)
              window.THREEx.ArToolkitContext.prototype[method] =
                THREE.EventDispatcher.prototype[method];
            if (window.THREEx.ArToolkitSource)
              window.THREEx.ArToolkitSource.prototype[method] =
                THREE.EventDispatcher.prototype[method];
            if (window.THREEx.ArMarkerControls)
              window.THREEx.ArMarkerControls.prototype[method] =
                THREE.EventDispatcher.prototype[method];
            if (window.THREEx.ArBaseControls)
              window.THREEx.ArBaseControls.prototype[method] =
                THREE.EventDispatcher.prototype[method];
          }
        });
        // ------------------------------------

        console.log("Local THREEx scripts loaded and fully patched!");
        setArLoaded(true); // Unlock AR Initialization
      } catch (error) {
        console.error("Failed to load AR scripts", error);
      }
    };

    loadArScripts();

    return () => {
      // Cleanup scripts if component unmounts quickly
      const scripts = document.querySelectorAll('script[src^="/threex/"]');
      scripts.forEach((script) => document.body.removeChild(script));
    };
  }, []);

  // --- HOOK 2: Initialize AR ONLY after scripts are loaded ---
  useEffect(() => {
    if (!arLoaded) return; // Wait until ready

    arScriptInstance.current = initializeAR({
      setStartScanning,
      firstImage,
      secondImage,
      images,
      screenHeight,
      screenWidth,
    });

    arScriptInstance.current.initialize();

    // The perfectly sealed React animation loop!
    const animateLoop = () => {
      if (arScriptInstance.current) {
        arScriptInstance.current.animate();
        requestRef.current = requestAnimationFrame(animateLoop);
      }
    };

    requestRef.current = requestAnimationFrame(animateLoop);

    return () => {
      cancelAnimationFrame(requestRef.current);
      if (arScriptInstance.current) {
        arScriptInstance.current.stop();
        arScriptInstance.current = null;
      }
    };
  }, [arLoaded]);

  return (
    <div>
      {!arLoaded && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            background: "white",
            padding: "10px",
          }}
        >
          Initializing AR Engine...
        </div>
      )}
      <button
        className="btn"
        style={{ position: "absolute", zIndex: 1, width: "7em" }}
        onClick={() => {
          setStartScanning(false);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default ArLessonNew;
