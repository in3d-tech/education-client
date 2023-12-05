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

declare module "html5-qrcode" {
  export class Html5QrcodeScanner {
    constructor(renderId: string, config: any, verbose?: boolean);
    clear(): Promise<void>;
    render(
      onSuccess: (decodedText: string, decodedResult: any) => void,
      onFailure: (errorMessage: string) => void
    ): void;
  }
}
