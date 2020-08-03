import DiscordgameObject from "./Object"
import Matrix from "./util/Matrix";

interface EngineSettings {
    x: number
    y: number
    backgroundEmoji?: string
    borderEmoji?: string
}

const DEFAULT_SETTINGS = {
    backgroundEmoji: "⬛",
    x: 10,
    y: 10
}

export default class Engine {
    settings: EngineSettings
    board: Matrix<DiscordgameObject>
    constructor(settings: EngineSettings) {
        this.settings = Object.assign(DEFAULT_SETTINGS, settings);
        this.board = new Matrix(settings.x);
    }

    toString() {
        let res = "";
        for (let x in this.board._obj) {
            for (let y in this.board._obj[x]) {
                 
            }
        }
    }

}