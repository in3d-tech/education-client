// @ts-nocheck

import React, { useEffect } from "react";
// import initializeAR from "./ARScript";
import { Link } from "react-router-dom";

const initializeAR = () => {
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
    arToolkitSource = new THREEx.ArToolkitSource({ sourceType: "webcam" });
    function onResize() {
      arToolkitSource.onResize();
      arToolkitSource.copySizeTo(renderer.domElement);

      if (arToolkitContext.arController !== null) {
        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
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
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
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
      let markerRoot = new THREE.Group();
      scene.add(markerRoot);
      let markerControls = new THREEx.ArMarkerControls(
        arToolkitContext,
        markerRoot,
        { type: "pattern", patternUrl: "/data/" + patternArray[i] + ".patt" }
      );
      let mesh;
      if (patternArray[i] == "letterC") {
        let imgTexture = new THREE.TextureLoader().load(
          "/assets/images/aug-real.jpg"
        );
        let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
        let planeMat = new THREE.MeshBasicMaterial({ map: imgTexture });
        mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = -1.5;
      } else if (patternArray[i] == "letterB") {
        mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(1.25, 1.25, 1.25),
          new THREE.MeshBasicMaterial({
            color: colorArray[i],
            map: texture,
            transparent: true,
            opacity: 0.5,
          })
        );
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
      mesh.position.y = patternArray[i] == "letterC" ? 0.1 : 1.25 / 2;
      markerRoot.add(mesh);
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

  return { initialize, update, render, animate, scene, camera };
};

const MyComponent = () => {
  const arScript = React.useRef(null);

  useEffect(() => {
    // Initialize AR without dynamically loading scripts
    const arScriptInstance = initializeAR();
    arScriptInstance.initialize();

    // Only call animate() in the loop
    const animateLoop = () => {
      if (arScriptInstance) {
        requestAnimationFrame(animateLoop);
        arScriptInstance.animate();
      }
    };

    animateLoop();

    // Cleanup function
    return () => {
      // Additional cleanup if needed
    };
  }, []);

  return <div>Your React component content</div>;
};

export default MyComponent;
