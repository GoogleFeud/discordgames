import Engine from "./Engine";


export default class DiscordgameObject {
    position: Array<Array<number>>
    emoji: string
    constructor(posMap: Array<Array<number>>, emoji: string) { // For example: [[1, 5], [2, 5]] - Draw default emoji on x1, y5 and x2, y5, if [1, 5, "emoji"], draw custom emoji on x1, y5
      this.position = posMap;
      this.emoji = emoji;
    }

    render(engine: Engine) {
        for (let pos of this.position) engine.board.set(pos[0], pos[1], this);
    }

    toString(x?: number, y?: number) {
        return this.emoji;
    }


}