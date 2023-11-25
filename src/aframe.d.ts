// aframe.d.ts
import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    // add A-Frame attributes here
    // example: <a-scene foo="bar"></a-scene>
    "a-scene"?: any;
    "a-marker"?: any;
    "a-box"?: any;
    "a-animation"?: any;
    "a-entity"?: any;
  }
}
