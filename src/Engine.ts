
import Canvas from "canvas";
import {TextgameObject} from "./Object";

export default class Engine extends Canvas.Canvas {
    context: CanvasRenderingContext2D
    objects: Set<TextgameObject>

    constructor(width: number, height: number, type?: "pdf"|"svg") {
        super(width, height, type);
        this.context = this.getContext("2d");
        this.objects = new Set();
    }

    create(objClass: typeof TextgameObject, ...args: Array<any>) : TextgameObject {
        const objInstance = new objClass(this, ...args);
        this.objects.add(objInstance);
        return objInstance;
    }

    instantiate(objClass: typeof TextgameObject, ...args: Array<any>) : TextgameObject {
        const objInstance = new objClass(this, ...args);
        this.objects.add(objInstance);
        objInstance.render();
        return objInstance;
    }

    step(clearStyle: boolean = true) : void {
        for (const obj of this.objects) {
            obj.render();
            if (clearStyle) obj.style = {};
        }    
    }

}