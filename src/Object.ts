import Engine from "./Engine";
import Vector from "./utils/Vector";
//import Canvas from "canvas";

export interface Style {
    fillStyle?: string,
    font?: string,
    globalAlpha?: number,
    globalCompositeOperation?: string,
    imageSmoothingEnabled?: boolean,
    lineCap?: string,
    lineDashOffset?: number,
    lineJoin?: string,
    lineWidth?: number,
    miterLimit?: number,
    shadowBlur?: number,
    shadowColor?: string,
    shadowOffsetX?: number,
    shadowOffsetY?: number,
    strokeStyle?: string,
    textAlign?: string,
    textBaseline?: string
}

export class TextgameObject {
    engine: Engine
    position?: Vector
    size?: Vector
    group?: string
    style: Style

    
    constructor(engine: Engine, ...others: Array<any>) {
         this.engine = engine;
         this.style = {};
     }


     render() {
        this.applyStyle();
        // Use the this.engine.context rendering methods to render the object
     }

     applyStyle() : void {
         Object.assign(this.engine.context, this.style);
     }

     mod(style: Style) {
         Object.assign(this.style, style);
         this.render();
    }
    
}