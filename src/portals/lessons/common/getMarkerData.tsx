// @ts-nocheck

export const markerData = {
  letterA: {},
  letterB: {},
  letterC: {},
  letterE: {},
  letterF: {},
};

export const handleMarkerData = ({
  mesh,
  image,
  marker,
  markerRoot,
  mesh0,
}) => {
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
  // if (marker == "letterJ") {
  //   console.log("THERE IS AN G");
  // }

  // } else {
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

    // planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
    planeGeo = new THREE.PlaneGeometry(3.6, 3.6, 1);

    planeMat = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = -1.5;
    mesh.position.y = 0.1;
    markerRoot.add(mesh);
  } else {
    let imgTexture = new THREE.TextureLoader().load(
      "/assets/images/aug-real.jpg"
    );
    planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
    planeMat = new THREE.MeshBasicMaterial({ map: imgTexture });
    mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = -1.5;
  }
};

// for (let i = 0; i < 7; i++) {
//     if (arToolkitContext) {
//       let markerRoot = new THREE.Group();
//       scene.add(markerRoot);
//       let markerControls = new THREEx.ArMarkerControls(z
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

// ----------------------------------------------------------------
// this is for loading 3D models with mtl/obj loader
// ---  reminder - if getting back to this  --- look into downloading three package, and using built in loaders

// if (marker == "letterZ") {
//   planeGeo = new THREE.PlaneGeometry(1.6, 1.6, 1);
//   const loader1 = new THREE.TextureLoader();
//   planeMat = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     opacity: 0.5,
//   });
//   mesh = new THREE.Mesh(planeGeo, planeMat);
//   mesh.rotation.x = -1.5;
//   mesh.position.y = 0.1;
//   markerRoot.add(mesh);
//   function onProgress(xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   }
//   function onError(xhr) {
//     console.log("An error happened");
//   }

//   new THREE.MTLLoader()
//     .setPath("/assets/models/")
//     .load("fish-2.mtl", function (materials) {
//       materials.preload();
//       new THREE.OBJLoader()
//         .setMaterials(materials)
//         .setPath("/assets/models/")
//         .load(
//           "fish-2.obj",
//           function (group) {
//             mesh0 = group.children[0];
//             mesh0.material.side = THREE.DoubleSide;
//             mesh0.position.y = 0.2;
//             mesh0.scale.set(0.5, 0.5, 0.5);
//             markerRoot.add(mesh0);
//           },
//           onProgress,
//           onError
//         );
//     });

// let geometry1 = new THREE.PlaneBufferGeometry(2,2, 4,4);

// let video = document.getElementById( 'video' );
// let texture = new THREE.VideoTexture( video );
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;
// texture.format = THREE.RGBFormat;
// let material1 = new THREE.MeshBasicMaterial( { map: texture } );

// mesh1 = new THREE.Mesh( geometry1, material1 );
// mesh1.rotation.x = -Math.PI/2;

// markerRoot1.add( mesh1 );
