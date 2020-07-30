

export default class Vector {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    clamp(min: number, max: number) : Vector {
        return new Vector(Math.min(Math.max(this.x, min), max), Math.min(Math.max(this.x, min), max));
    }

    add(vec: Vector) : this {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    subtract(vec: Vector) : this {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

}