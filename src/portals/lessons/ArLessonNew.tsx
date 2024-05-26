// @ts-nocheck

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { handleMarkerData } from "./common/getMarkerData";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import { useGLTF, useProgress } from "@react-three/drei";

// import { stopTest } from "./logic/arLogic";
// const test = new FREE.
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

// tablet showed 1037 height and 753 width

// my iphone 669 height and 390 width

const initializeAR = ({
  setStartScanning,
  firstImage,
  secondImage,
  images,
  screenHeight,
  screenWidth,
}) => {
  if (typeof THREEx === "undefined") {
    throw new Error("THREE is not defined. Make sure three.js is loaded.");
  }
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
    // if (scene) return;
    scene = new THREE.Scene();

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // new THREE.DirectionalLight(); //(5242880, 0.5);
    scene.add(ambientLight);
    camera = new THREE.Camera();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    renderer.setSize(640, 480); //(screenWidth, screenHeight); //(640, 480);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    // renderer.domElement.style.margin = "0";

    // renderer.domElement.offsetLeft = "0";

    // console.log(
    //   { domElement: renderer.domElement },
    //   renderer.domElement.style.margin
    // );
    // console.log("Margin-left: ", renderer.domElement.style.marginLeft);

    document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock();

    deltaTime = 0;
    totalTime = 0;

    arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam",
      // ---------------------------------------------------------------- >>> note to uncomment and test these for layout/sizes
      // sourceHeight: window.innerHeight, // * 0.5,
      // sourceWidth: window.innerWidth, // * 0.5,
    });
    function onResize() {
      if (arToolkitSource) {
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement);
        // const aspectRatio = window.innerWidth / window.innerHeight;
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // }
        // if (arToolkitContext?.arController !== null) {
        if (arToolkitSource && arToolkitContext) {
          arToolkitSource.copyElementSizeTo(
            arToolkitContext.arController.canvas
          );
        }
      }
    }

    arToolkitSource.init(function onReady() {
      // onResize();
      setTimeout(function () {
        onResize(); // Call onResize after a short delay
      }, 200); // Adjust the delay as needed
    });
    window.addEventListener("resize", async function () {
      onResize();
    });

    arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: "/data/camera_para.dat",
      detectionMode: "mono",
      // maxDetectionRate: 60,
    });

    arToolkitContext.init(function onCompleted() {
      if (arToolkitContext) {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
      }
    });
    let loader = new THREE.TextureLoader();
    let texture = loader.load("/assets/images/border.png");
    // let patternArray = [
    //   "letterA",
    //   "letterB",
    //   "letterC",
    //   "letterD",
    //   "letterF",
    //   "kanji",
    //   "hiro",
    //   "pattern1",
    // ];
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
    let colorArray = [
      16711680, 16753920, 16776960, 52480, 255, 13434879, 13434828, 16711680,
    ];
    let mesh;
    let mesh0;

    for (let i = 0; i < 10; i++) {
      console.log("MADE IT INSIDE THE LOOPS AT LEAST");
      if (arToolkitContext) {
        let markerRoot = new THREE.Group();
        scene.add(markerRoot);
        let markerControls = new THREEx.ArMarkerControls(
          arToolkitContext,
          markerRoot,
          {
            type: "pattern",
            patternUrl: "/data/markers/" + patternArray[i] + ".patt",
          }
        );
        // if (patternArray[i] == "letterC") {

        // const belt = images.map((img, idx) => console.log(idx, img));

        // ----------------------------------------------------------------
        // regular photo

        if (images.length) {
          if (typeof images[i] !== "string") {
            let geometry1 = new THREE.PlaneBufferGeometry(2, 2, 4, 4);
            let loader = new THREE.TextureLoader();
            // let texture = loader.load( 'images/earth.jpg', render );
            let material1 = new THREE.MeshBasicMaterial({
              // color: 0x0000ff,
              opacity: 1,
            });
            mesh = new THREE.Mesh(geometry1, material1);
            // mesh.rotation.x = -Math.PI / 2;
            markerRoot.add(mesh);
            function onProgress(xhr) {
              console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            }
            function onError(xhr) {
              console.log("An error happened");
            }

            if (images[i]?.mtl) {
              const mtlLoader = new THREE.MTLLoader();

              mtlLoader.load(
                "https://res.cloudinary.com/dxminwnb3/raw/upload/v1716455491/models/blue_plus_sign_tubzc1.mtl",
                (materials) => {
                  materials.preload();

                  const objLoader = new THREE.OBJLoader();

                  objLoader.setMaterials(materials);

                  objLoader.load(
                    "https://res.cloudinary.com/dxminwnb3/raw/upload/v1716455491/models/ImageToStl.com_blue_plus_sign_mled07.obj",
                    (object) => {
                      object.scale.set(0.1, 0.1, 0.1);

                      object.rotation.x = 3; // rotation for  +

                      markerRoot.add(object);
                    }
                  );
                }
              );
            } else {
              const objLoader = new THREE.OBJLoader();

              objLoader.load(
                "/assets/models/ImageToStl.com_text.obj",
                (object) => {
                  object.scale.set(0.06, 0.06, 0.06);

                  object.rotation.x = 0;
                  object.rotation.y = 0;

                  // Optionally set a default material if no MTL is present

                  object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                      child.material = new THREE.MeshPhongMaterial({
                        color: 0x00ff00,
                      });
                    }
                  });

                  markerRoot.add(object);
                }
              );
            }

            console.log("just past the loaders");
          } else {
            handleMarkerData({
              mesh,
              markerRoot,
              image: images[i],
              marker: patternArray[i],
              mesh0,
            });
          }
        } else {
          // condition for if no urls/image. default to boxes and 1 image --------------

          if (patternArray[i] == "letterA") {
            let imgTexture = new THREE.TextureLoader().load(
              "/assets/images/aug-real.jpg"
              // "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/4.jpg"
            );
            planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
            planeMat = new THREE.MeshBasicMaterial({
              map: imgTexture,
              doubleSide: true,
            });
            mesh = new THREE.Mesh(planeGeo, planeMat);
            mesh.rotation.x = -1.5;
          } else {
            mesh = new THREE.Mesh(
              patternArray[i] == "pattern1"
                ? new THREE.BoxGeometry(3.25, 3.25, 3.25)
                : new THREE.BoxGeometry(1.25, 1.25, 1.25),
              new THREE.MeshBasicMaterial({
                color: colorArray[i],
                map: texture,
                transparent: true,
                opacity: 0.5,
              })
            );
            mesh.position.y = 1.25 / 2;
          }
        }

        markerRoot.add(mesh);
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
    videoElements.forEach((videoElement, idx) => {
      videoElement.pause();
      videoElement.srcObject = null;
      document.body.removeChild(videoElement);
    });

    scene.traverse(function (object) {
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
    if (arToolkitSource?.ready !== false)
      arToolkitContext?.update(arToolkitSource.domElement);
  }
  function render() {
    renderer?.render(scene, camera);
  }
  function animate() {
    requestAnimationFrame(animate);
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
  const arScript = React.useRef(null);

  console.log({ images });

  useEffect(() => {
    const arScriptInstance = initializeAR({
      setStartScanning,
      firstImage,
      secondImage,
      images,
      screenHeight,
      screenWidth,
    });

    arScriptInstance.initialize();

    const animateLoop = () => {
      if (arScriptInstance) {
        requestAnimationFrame(animateLoop);
        arScriptInstance.animate();
      }
    };

    animateLoop();

    return () => {
      if (arScriptInstance) {
        arScriptInstance.stop();
        arScriptInstance.scene = null;
      }
    };
  }, []);

  return (
    <div>
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

//  -------------------------------- mtl obj loader
// ----------------------------------------------------------------
// mesh.rotation.x = -1.5;
// // let geometry1 = new THREE.PlaneBufferGeometry(2, 2, 4, 4);
// // let loader = new THREE.TextureLoader();
// // // let texture = loader.load( 'images/earth.jpg', render );
// // let material1 = new THREE.MeshBasicMaterial({
// //   // color: 0x0000ff,
// //   opacity: 1,
// // });
// // mesh1 = new THREE.Mesh(geometry1, material1);
// // mesh1.rotation.x = -Math.PI / 2;
// // markerRoot.add(mesh1);
// // function onProgress(xhr) {
// //   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
// // }
// // function onError(xhr) {
// //   console.log("An error happened");
// // }
// // new THREE.MTLLoader()
// //   .setPath("/assets/models/")
// //   .load("Soldier_Statue.mtl", function (materials) {
// //     materials.preload();
// //     new THREE.OBJLoader()
// //       .setMaterials(materials)
// //       .setPath("/assets/models/")
// //       .load(
// //         "Soldier_Statue.obj",
// //         function (group) {
// //           group.children.forEach((child, index) => {
// //             // Access and add each part to the markerRoot
// //             mesh0 = child;
// //             mesh0.material = new THREE.MeshPhongMaterial({
// //               // color: 0x0000ff,
// //               // opacity: 0.8,
// //             });
// //             mesh0.scale.set(0.02, 0.02, 0.02);
// //             // mesh0.rotation.x = -Math.PI / 2;
// //             // mesh.position.y = 1.25 / 2;
// //             markerRoot.add(mesh0);
// //           });
// //         },
// //         onProgress,
// //         onError
// //       );
// //   });

// --------------------------- working with url -----------------------------------

// function loadModel(objUrl, mtlUrl, markerRoot) {
// WORKING OBJ MTL LOGIC ----------------------------------------------------------------
// const mtlLoader = new THREE.MTLLoader();

// mtlLoader.load(
//   "https://res.cloudinary.com/dxminwnb3/raw/upload/v1716455491/models/blue_plus_sign_tubzc1.mtl",
//   (materials) => {
//     materials.preload();

//     const objLoader = new THREE.OBJLoader();

//     objLoader.setMaterials(materials);

//     objLoader.load(
//       "https://res.cloudinary.com/dxminwnb3/raw/upload/v1716455491/models/ImageToStl.com_blue_plus_sign_mled07.obj",
//       (object) => {
//         object.scale.set(0.1, 0.1, 0.1);

//         object.rotation.x = 3; // rotation for  +

//         markerRoot.add(object);
//       }
//     );
//   }
// );
// WORKING OBJ MTL LOGIC ----------------------------------------------------------------

// }

// WORKING OBJ ONLY ------------------------------------------------------------
// const objLoader = new THREE.OBJLoader();

// objLoader.load(
//   "/assets/models/ImageToStl.com_text.obj",
//   (object) => {
//     object.scale.set(0.06, 0.06, 0.06);

//     object.rotation.x = 0;
//     object.rotation.y = 0;

//     // Optionally set a default material if no MTL is present

//     object.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         child.material = new THREE.MeshPhongMaterial({
//           color: 0x00ff00,
//         });
//       }
//     });

//     markerRoot.add(object);
//   }
// );
// WORKING OBJ ONLY ---------------------
