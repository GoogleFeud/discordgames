
// Used to store coordinates and the data inside them

interface MatrixStore {
    [key: number]: any
}

export default class Matrix<T> {
    _obj: MatrixStore
    constructor(x: number) {
    this._obj = {};
    for (let i=1; i <= x; i++) {
        this._obj[i] = {};
    }
    }

    set(x: number, y: number, data: T) : void {
        this._obj[x].y = data;
    }

    has(x: number, y: number) : boolean {
        return !this._obj[x] || !this._obj[x][y];
    }

    get(x: number, y: number) : T|null {
        if (!this._obj[x]) return null;
        return this._obj[x][y];
    }

    clear() : void {
        this._obj = {};
    }


}

/**
 * Our data
 * 
 * {
 *  x: number (Position of the emoji on the X axis)
 *  y: number (Position of the emoji on the Y axis)
 *  object: DiscordgameObject (The object that represents the emoji, the emoji can be obtained via object.emoji)
 * }
 * 
 * It needs to be made very simple and quick to check if there is already an emoji in the same place (x, y)
 */