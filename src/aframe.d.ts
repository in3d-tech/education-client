// aframe.d.ts
import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    "a-scene"?: any;
    "a-marker"?: any;
    "a-box"?: any;
    "a-animation"?: any;
    "a-entity"?: any;
  }
}

declare module "jsQR";
