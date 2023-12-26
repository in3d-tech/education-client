// @ts-nocheck

export const markerData = {
  letterA: {},
  letterB: {},
  letterC: {},
  letterE: {},
  letterF: {},
};

export const handleMarkerData = ({ mesh, image, marker, markerRoot }) => {
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
  let planeGeo;
  let planeMat;
  if (image) {
    // Create a Blob from the base64 image data
    const byteCharacters = atob(image.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let j = 0; j < byteCharacters.length; j++) {
      byteNumbers[j] = byteCharacters.charCodeAt(j);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    // Create a texture from the Blob
    const texture = new THREE.TextureLoader().load(URL.createObjectURL(blob));

    planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
    planeMat = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = -1.5;
    mesh.position.y = 0.1;
    markerRoot.add(mesh);
    console.log("ABABA 1");
  } else {
    let imgTexture = new THREE.TextureLoader().load(
      "/assets/images/aug-real.jpg"
    );
    planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
    planeMat = new THREE.MeshBasicMaterial({ map: imgTexture });
    mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = -1.5;
    console.log("PAPAPAAP 2");
  }

  //   switch (marker) {
  //     case "letterA":
  //       break;
  //     case "letterB":
  //       break;
  //     case "letterC":
  //       break;
  //     case "letterD":
  //       break;
  //     case "letterE":
  //       break;
  //     case "letterF":
  //       break;
  //   }
};

// for (let i = 0; i < 7; i++) {
//     if (arToolkitContext) {
//       let markerRoot = new THREE.Group();
//       scene.add(markerRoot);
//       let markerControls = new THREEx.ArMarkerControls(
//         arToolkitContext,
//         markerRoot,
//         { type: "pattern", patternUrl: "/data/" + patternArray[i] + ".patt" }
//       );
//       let mesh;
//       if (patternArray[i] == "letterC") {
//         //   let imgTexture = new THREE.TextureLoader().load(
//         //     "/assets/images/aug-real.jpg"
//         //   );
//         //   let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
//         //   let planeMat = new THREE.MeshBasicMaterial({ map: imgTexture });
//         //   mesh = new THREE.Mesh(planeGeo, planeMat);
//         //   mesh.rotation.x = -1.5;
//         // } else if (patternArray[i] == "letterB") {
//         //   mesh = new THREE.Mesh(
//         //     new THREE.CylinderGeometry(1.25, 1.25, 1.25),
//         //     new THREE.MeshBasicMaterial({
//         //       color: colorArray[i],
//         //       map: texture,
//         //       transparent: true,
//         //       opacity: 0.5,
//         //     })
//         //   );
//         if (firstImage) {
//           // Create a Blob from the base64 image data
//           const byteCharacters = atob(firstImage.data);
//           const byteNumbers = new Array(byteCharacters.length);
//           for (let j = 0; j < byteCharacters.length; j++) {
//             byteNumbers[j] = byteCharacters.charCodeAt(j);
//           }
//           const byteArray = new Uint8Array(byteNumbers);
//           const blob = new Blob([byteArray], { type: "image/jpeg" });

//           // Create a texture from the Blob
//           const texture = new THREE.TextureLoader().load(
//             URL.createObjectURL(blob)
//           );

//           let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
//           let planeMat = new THREE.MeshBasicMaterial({ map: texture });
//           mesh = new THREE.Mesh(planeGeo, planeMat);
//           mesh.rotation.x = -1.5;
//           mesh.position.y = 0.1;
//           markerRoot.add(mesh);
//         } else {
//           let imgTexture = new THREE.TextureLoader().load(
//             "/assets/images/aug-real.jpg"
//           );
//           let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
//           let planeMat = new THREE.MeshBasicMaterial({ map: imgTexture });
//           mesh = new THREE.Mesh(planeGeo, planeMat);
//           mesh.rotation.x = -1.5;
//         }
//       } else if (patternArray[i] == "letterB") {
//         if (secondImage) {
//           // Create a Blob from the base64 image data
//           const byteCharacters = atob(secondImage.data);
//           const byteNumbers = new Array(byteCharacters.length);
//           for (let j = 0; j < byteCharacters.length; j++) {
//             byteNumbers[j] = byteCharacters.charCodeAt(j);
//           }
//           const byteArray = new Uint8Array(byteNumbers);
//           const blob = new Blob([byteArray], { type: "image/jpeg" });

//           // Create a texture from the Blob
//           const texture = new THREE.TextureLoader().load(
//             URL.createObjectURL(blob)
//           );

//           let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
//           let planeMat = new THREE.MeshBasicMaterial({ map: texture });
//           mesh = new THREE.Mesh(planeGeo, planeMat);
//           mesh.rotation.x = -1.5;
//           mesh.position.y = 0.1;
//           markerRoot.add(mesh);
//         } else {
//           let imgTexture = new THREE.TextureLoader().load(
//             "/assets/images/aug-real.jpg"
//           );
//           let planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
//           let planeMat = new THREE.MeshBasicMaterial({ map: imgTexture });
//           mesh = new THREE.Mesh(planeGeo, planeMat);
//           mesh.rotation.x = -1.5;
//         }
//       } else if (patternArray[i] == "letterF") {
//         const geometry = new THREE.IcosahedronGeometry(0.5, 0);
//         const material = new THREE.MeshBasicMaterial({
//           color: colorArray[i],
//           map: texture,
//           transparent: true,
//           opacity: 0.5,
//         });
//         mesh = new THREE.Mesh(geometry, material);
//       } else if (patternArray[i] == "letterD") {
//         const geometry = new THREE.ConeGeometry(0.6, 1.2, 0);
//         const material = new THREE.MeshBasicMaterial({
//           color: colorArray[i],
//           map: texture,
//           transparent: true,
//           opacity: 0.5,
//         });
//         mesh = new THREE.Mesh(geometry, material);
//       } else {
//         mesh = new THREE.Mesh(
//           new THREE.CubeGeometry(1.25, 1.25, 1.25),
//           new THREE.MeshBasicMaterial({
//             color: colorArray[i],
//             map: texture,
//             transparent: true,
//             opacity: 0.5,
//           })
//         );
//       }
//       mesh.position.y =
//         patternArray[i] == "letterC" || patternArray[i] == "letterB"
//           ? 0.1
//           : 1.25 / 2;
//       markerRoot.add(mesh);
//     }
//   }
// }
