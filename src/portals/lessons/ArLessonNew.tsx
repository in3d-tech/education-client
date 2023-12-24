// @ts-nocheck

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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

const initializeAR = ({ setStartScanning, firstImage, secondImage }) => {
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
    renderer.setSize(640, 480);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0px";
    renderer.domElement.style.left = "0px";
    document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock();

    deltaTime = 0;
    totalTime = 0;
    arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam",
      sourceHeight: window.innerHeight * 0.5,
      sourceWidth: window.innerWidth * 0.5,
    });

    function onResize() {
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
      "kanji",
      "hiro",
    ];
    let colorArray = [
      16711680, 16753920, 16776960, 52480, 255, 13434879, 13434828,
    ];

    for (let i = 0; i < 7; i++) {
      if (arToolkitContext) {
        let markerRoot = new THREE.Group();
        scene.add(markerRoot);
        let markerControls = new THREEx.ArMarkerControls(
          arToolkitContext,
          markerRoot,
          { type: "pattern", patternUrl: "/data/" + patternArray[i] + ".patt" }
        );
        let mesh;
        if (patternArray[i] == "letterC") {
          //   let imgTexture = new THREE.TextureLoader().load(
          //     "/assets/images/aug-real.jpg"
          //   );
          //   let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
          //   let planeMat = new THREE.MeshBasicMaterial({ map: imgTexture });
          //   mesh = new THREE.Mesh(planeGeo, planeMat);
          //   mesh.rotation.x = -1.5;
          // } else if (patternArray[i] == "letterB") {
          //   mesh = new THREE.Mesh(
          //     new THREE.CylinderGeometry(1.25, 1.25, 1.25),
          //     new THREE.MeshBasicMaterial({
          //       color: colorArray[i],
          //       map: texture,
          //       transparent: true,
          //       opacity: 0.5,
          //     })
          //   );
          if (firstImage) {
            // Create a Blob from the base64 image data
            const byteCharacters = atob(firstImage.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let j = 0; j < byteCharacters.length; j++) {
              byteNumbers[j] = byteCharacters.charCodeAt(j);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/jpeg" });

            // Create a texture from the Blob
            const texture = new THREE.TextureLoader().load(
              URL.createObjectURL(blob)
            );

            let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
            let planeMat = new THREE.MeshBasicMaterial({ map: texture });
            mesh = new THREE.Mesh(planeGeo, planeMat);
            mesh.rotation.x = -1.5;
            mesh.position.y = 0.1;
            markerRoot.add(mesh);
          } else {
            let imgTexture = new THREE.TextureLoader().load(
              "/assets/images/aug-real.jpg"
            );
            let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
            let planeMat = new THREE.MeshBasicMaterial({ map: imgTexture });
            mesh = new THREE.Mesh(planeGeo, planeMat);
            mesh.rotation.x = -1.5;
          }
        } else if (patternArray[i] == "letterB") {
          if (secondImage) {
            // Create a Blob from the base64 image data
            const byteCharacters = atob(secondImage.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let j = 0; j < byteCharacters.length; j++) {
              byteNumbers[j] = byteCharacters.charCodeAt(j);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/jpeg" });

            // Create a texture from the Blob
            const texture = new THREE.TextureLoader().load(
              URL.createObjectURL(blob)
            );

            let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
            let planeMat = new THREE.MeshBasicMaterial({ map: texture });
            mesh = new THREE.Mesh(planeGeo, planeMat);
            mesh.rotation.x = -1.5;
            mesh.position.y = 0.1;
            markerRoot.add(mesh);
          } else {
            let imgTexture = new THREE.TextureLoader().load(
              "/assets/images/aug-real.jpg"
            );
            let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
            let planeMat = new THREE.MeshBasicMaterial({ map: imgTexture });
            mesh = new THREE.Mesh(planeGeo, planeMat);
            mesh.rotation.x = -1.5;
          }
        } else if (patternArray[i] == "letterF") {
          const geometry = new THREE.IcosahedronGeometry(0.5, 0);
          const material = new THREE.MeshBasicMaterial({
            color: colorArray[i],
            map: texture,
            transparent: true,
            opacity: 0.5,
          });
          mesh = new THREE.Mesh(geometry, material);
        } else if (patternArray[i] == "letterD") {
          const geometry = new THREE.ConeGeometry(0.6, 1.2, 0);
          const material = new THREE.MeshBasicMaterial({
            color: colorArray[i],
            map: texture,
            transparent: true,
            opacity: 0.5,
          });
          mesh = new THREE.Mesh(geometry, material);
        } else {
          mesh = new THREE.Mesh(
            new THREE.CubeGeometry(1.25, 1.25, 1.25),
            new THREE.MeshBasicMaterial({
              color: colorArray[i],
              map: texture,
              transparent: true,
              opacity: 0.5,
            })
          );
        }
        mesh.position.y =
          patternArray[i] == "letterC" || patternArray[i] == "letterB"
            ? 0.1
            : 1.25 / 2;
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
    videoElements.forEach((videoElement) => {
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

  return { initialize, update, render, animate, scene, camera, stop };
};

const MyComponent = ({ setStartScanning, firstImage, secondImage }) => {
  const arScript = React.useRef(null);

  useEffect(() => {
    const arScriptInstance = initializeAR({
      setStartScanning,
      firstImage,
      secondImage,
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
        console.log("Cleaning up AR component");
        arScriptInstance.stop();
        arScriptInstance.scene = null;
      }
    };
  }, []);

  return (
    <div>
      <button
        style={{ position: "absolute", zIndex: 500000000000 }}
        onClick={() => {
          setStartScanning(false);
        }}
      >
        HELLO World
      </button>
    </div>
  );
};

export default MyComponent;
