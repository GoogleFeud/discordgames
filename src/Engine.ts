import {Pixel, Group} from "./util/Group";

interface EngineSettings {
    width: number
    height: number
    backgroundEmoji?: string
    spaceBetween?: boolean
}

const DEFAULT_SETTINGS = {
    backgroundEmoji: "⬛",
    width: 10,
    height: 10
}

export class Engine {
    settings: EngineSettings
    private pixels: Map<string, Pixel>
    groups: Array<Group>
    constructor(settings: EngineSettings = {width: 10, height: 10}) {
        if (settings.width >= 15 || settings.height >= 15) throw new Error("Canvas width/height cannot be over 15 pixels.");
        this.settings = Object.assign(DEFAULT_SETTINGS, settings);
        this.pixels = new Map();
        this.groups = [];
    }

    fill(x: number, y: number, emoji: string, group?: string) {
        const obj = {x, y, emoji, group};
        this.pixels.set(`${x}${y}`, obj);
        return obj;
    }

    clear(x: number, y: number) {
        this.pixels.delete(`${x}${y}`);
    }

    clearAll() {
        this.pixels.clear();
        this.groups.length = 0;
    }

    pixelAt(x: number, y: number) {
        return this.pixels.get(`${x}${y}`);
    }

    group(emoji: string, coords: Array<Pixel>, id?: string) : Group {
        const g = new Group(this, emoji, coords, id);
        this.groups.push(g);
        return g;
    }

    toString() {
        for (let group of this.groups) {
            for (let coord of group.pixels) {
                coord.emoji = group.emoji;
                coord.group = group.id;
                this.pixels.set(`${coord.x}${coord.y}`, coord);
            }
        }
        let res = "";
        const height = this.settings.height;
        const width = this.settings.width;
        for (let y=1; y <= height; y++) {
            for (let x=1; x <= width; x++) {
                const data = this.pixels.get(`${x}${y}`);
                if (data) res += data.emoji;
                else res += this.settings.backgroundEmoji;
                if (this.settings.spaceBetween) res += " ";
                if (x % width === 0) res += "\n";
            }
        }
        return res;
    }

}