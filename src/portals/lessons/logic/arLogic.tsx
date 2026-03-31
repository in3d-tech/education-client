// @ts-nocheck
import { handleMarkerData } from "../common/getMarkerData";

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

export function initialization({
  scene,
  camera,
  renderer,
  clock,
  arToolkitSource,
  arToolkitContext,
  images,
  planeGeo,
  planeMat,
}) {
  let ambientLight = new THREE.DirectionalLight(); //(5242880, 0.5);
  scene.add(ambientLight);
  scene.add(camera);

  renderer.setClearColor(new THREE.Color("lightgrey"), 0);
  renderer.setSize(640, 480); //(screenWidth, screenHeight); //(640, 480);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";

  document.body.appendChild(renderer.domElement);

  function onResize() {
    if (arToolkitSource) {
      arToolkitSource.onResizeElement();
      arToolkitSource.copyElementSizeTo(renderer.domElement);
      if (arToolkitSource && arToolkitContext) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
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
    "pattern1",
  ];
  let colorArray = [
    16711680, 16753920, 16776960, 52480, 255, 13434879, 13434828, 16711680,
  ];
  let mesh;
  let mesh0;

  for (let i = 0; i < 8; i++) {
    if (arToolkitContext) {
      let markerRoot = new THREE.Group();
      scene.add(markerRoot);
      let markerControls = new THREEx.ArMarkerControls(
        arToolkitContext,
        markerRoot,
        { type: "pattern", patternUrl: "/data/" + patternArray[i] + ".patt" },
      );
      // if (patternArray[i] == "letterC") {

      // const belt = images.map((img, idx) => console.log(idx, img));

      // ----------------------------------------------------------------
      // regular photo

      if (images?.length > 10) {
        // const test = images.map((img, imagesArrIndex) => {
        //   if (imagesArrIndex == i) {
        handleMarkerData({
          mesh,
          markerRoot,
          image: img,
          marker: patternArray[i],
          mesh0,
        });
        //   }
        // });
      } else {
        if (patternArray[i] == "letterA") {
          let imgTexture = new THREE.TextureLoader().load(
            "/assets/images/aug-real.jpg",
          );
          //   planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
          planeMat = new THREE.MeshBasicMaterial({
            map: imgTexture,
            doubleSide: true,
          });
          mesh = new THREE.Mesh(planeGeo, planeMat);

          //   let imgTexture = new THREE.TextureLoader().load(
          //     "/assets/images/aug-real.jpg"
          //     // "https://res.cloudinary.com/dxminwnb3/image/upload/v1705584776/24/4.jpg"
          // );

          // // Ensure the image is loaded before creating the material
          // imgTexture.image.onload = () => {
          //     planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
          //     planeMat = new THREE.MeshBasicMaterial({
          //         map: imgTexture,
          //         doubleSide: true,
          //     });
          //     mesh = new THREE.Mesh(planeGeo, planeMat);
          // };
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
            }),
          );
          mesh.position.y = 1.25 / 2;
        }
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

export function stopTest({
  scene,
  camera,
  renderer,
  clock,
  arToolkitSource,
  arToolkitContext,
  images,
  planeGeo,
  planeMat,
}) {
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

export function update() {
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
