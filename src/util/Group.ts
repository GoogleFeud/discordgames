import Engine from "../Engine";


export interface Pixel {
    x: number,
    y: number,
    emoji?: string,
    group?: string
}

export class Group {
    emoji: string
    pixels: Array<Pixel>
    id?: string
    engine: Engine
    constructor(engine: Engine, emoji: string, pixels: Array<Pixel>, id?: string) {
        this.emoji = emoji;
        this.pixels = pixels;
        this.id = id;
        this.engine = engine;
    }

    move(axis: "x" | "y", amount: number = 1): void {
        for (let coord of this.pixels) {
            this.engine.clear(coord.x, coord.y);
            coord[axis] += amount;
        }
    }

    shift(): Pixel | undefined {
        const data = this.pixels.shift();
        if (!data) return undefined;
        this.engine.clear(data.x, data.y);
        return data;
    }

    pop(): Pixel | undefined {
        const data = this.pixels.pop();
        if (!data) return undefined;
        this.engine.clear(data.x, data.y);
        return data;
    }

    fill(x: number, y: number): Pixel {
        const obj = { x, y };
        this.pixels.push(obj);
        return obj;
    }

    clear(x: number, y: number): void {
        this.pixels.splice(this.pixels.findIndex(i => i.x === x && i.y === y), 1);
    }

    clearAll() : void {
        for (let pixel of this.pixels) {
            this.engine.clear(pixel.x, pixel.y);
        }
        this.pixels.length = 0;
    }


}