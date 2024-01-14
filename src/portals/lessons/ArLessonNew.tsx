// @ts-nocheck

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { handleMarkerData } from "./common/getMarkerData";

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
    arToolkitContext;

  function initialize() {
    scene = new THREE.Scene();
    let ambientLight = new THREE.AmbientLight(5242880, 0.5);
    scene.add(ambientLight);
    camera = new THREE.Camera();
    scene.add(camera);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    renderer.setSize(640, 480); //(screenWidth, screenHeight); //(640, 480);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock();

    deltaTime = 0;
    totalTime = 0;
    arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam",
      // ---------------------------------------------------------------- >>> note to uncomment and test these for layout/sizes
      sourceHeight: window.innerHeight * 0.5,
      sourceWidth: window.innerWidth * 0.5,
    });
    function onResize() {
      // if (arToolkitSource) {
      //   arToolkitSource.onResizeElement();
      //   arToolkitSource.copyElementSizeTo(renderer.domElement);
      //   const aspectRatio = window.innerWidth / window.innerHeight;
      //   renderer.setSize(window.innerWidth, window.innerHeight);
      // }
      // if (arToolkitContext?.arController !== null) {
      //   if (arToolkitSource && arToolkitContext) {
      //     arToolkitSource.copyElementSizeTo(
      //       arToolkitContext.arController.canvas
      //     );
      //   }
      // }
      if (arToolkitSource) {
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement);
      }

      if (arToolkitContext?.arController !== null) {
        if (arToolkitSource && arToolkitContext) {
          arToolkitSource.copyElementSizeTo(
            arToolkitContext.arController.canvas
          );
        }
      }
    }

    arToolkitSource.init(function onReady() {
      onResize();
    });
    window.addEventListener("resize", function () {
      onResize();
    });

    arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: "/data/camera_para.dat",
      detectionMode: "mono",
      maxDetectionRate: 60,
    });

    arToolkitContext.init(function onCompleted() {
      if (arToolkitContext) {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
      }
    });
    let loader = new THREE.TextureLoader();
    let texture = loader.load("/assets/images/border.png");
    let patternArray = [
      "letterA",
      "letterB",
      "letterC",
      "letterD",
      "letterF",
      //"number1",
      "kanji",
      "hiro",
    ];
    let colorArray = [
      16711680, 16753920, 16776960, 52480, 255, 13434879, 13434828,
    ];
    let mesh;
    let mesh0;

    for (let i = 0; i < 7; i++) {
      if (arToolkitContext) {
        let markerRoot = new THREE.Group();
        scene.add(markerRoot);
        let markerControls = new THREEx.ArMarkerControls(
          arToolkitContext,
          markerRoot,
          { type: "pattern", patternUrl: "/data/" + patternArray[i] + ".patt" }
        );
        // if (patternArray[i] == "letterC") {

        // const belt = images.map((img, idx) => console.log(idx, img));

        // ----------------------------------------------------------------
        // regular photo

        if (images.length > 15) {
          const test = images.map((img, imagesArrIndex) => {
            if (imagesArrIndex == i) {
              handleMarkerData({
                mesh,
                markerRoot,
                image: img,
                marker: patternArray[i],
                mesh0,
              });
            }
          });
        } else {
          console.log("in here");
          mesh = new THREE.Mesh(
            new THREE.CubeGeometry(1.25, 1.25, 1.25),
            new THREE.MeshBasicMaterial({
              color: colorArray[i],
              map: texture,
              transparent: true,
              opacity: 0.5,
            })
          );
          mesh.position.y = 1.25 / 2;
          // mesh.position.x = 2;
        }
        // if (!mesh) {
        //   return;
        // }
        // mesh.position.y =
        //   patternArray[i] == "letterC" || patternArray[i] == "letterB"
        //     ? 0.1
        //     : 1.25 / 2;
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
      // console.log("in the renderer if: ", renderer.domElement);
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

  return { initialize, update, render, animate, scene, camera, stop };
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
