
/** Yeah I know, snake kinda loses it's point when it's not moving fast... this is just an example
 * NOT FINISHED!
 * There are a few bugs / missing features: (not caused by the package)
 * 
 * - Going over the border breaks the game
 * - When you get a food while going up, it doesn't register
 * - Food can spawn on top of the snake
 * 
 * There is most likely a better way of doing this game specifically, but I cba
 */

const Engine = require("../index.js").Engine;
const Discord = require("discord.js");
const client = new Discord.Client();

/**
 * Let's create a special class for our game
 */
class SnakeEngine extends Engine {
    constructor(channelId) {
        super();
        /** Store where the game is played */
        this.channelId = channelId;
        /** This piece creates the snake group and draws it */
        this.snake = this.group("🟩", [
            { x: 5, y: 5 }
        ], "snake");
        /** This generates the first food */
        this.generateFood();
    }

    /** This function will be called when a user reacts with one of the arrows */
    step(direction) {
        /** Get the first snake tail */
        const lastPos = this.snake.coords[this.snake.coords.length - 1];
        if (direction === "up") {
            /** Get the pixel in front of the first snake tail */
            const inFront = this.pixelAt(lastPos.x, lastPos.y - 1);
            if (inFront) {
                /** If the pixel in front is of group "snake", the game ends */
                if (inFront.group === "snake") return 0;
                /** If the pixel in front is in the "food" group, generate a new food */
                if (inFront.group === "food") this.generateFood();
            }
            if (this.snake.coords.every(c => c.x === this.snake.coords[0].x)) this.snake.move("y", -1);
            else {
                this.snake.shift();
                this.snake.fill(lastPos.x, lastPos.y - 1);
            }
        } else if (direction === "down") {
            const inFront = this.pixelAt(lastPos.x, lastPos.y + 1);
            if (inFront) {
                /** If the pixel in front is of group "snake", the game ends */
                if (inFront.group === "snake") return 0;
                /** If the pixel in front is in the "food" group, generate a new food */
                if (inFront.group === "food") this.generateFood();
                else this.snake.shift();
            } else this.snake.shift();
            this.snake.fill(lastPos.x, lastPos.y + 1);
        } else if (direction === "left") {
            const inFront = this.pixelAt(lastPos.x - 1, lastPos.y);
            if (inFront) {
                /** If the pixel in front is of group "snake", the game ends */
                if (inFront.group === "snake") return 0;
                /** If the pixel in front is in the "food" group, generate a new food */
                if (inFront.group === "food") this.generateFood();
                else this.snake.shift();
            } else this.snake.shift();
            this.snake.fill(lastPos.x - 1, lastPos.y);
        } else if (direction === "right") {
            const inFront = this.pixelAt(lastPos.x + 1, lastPos.y);
            if (inFront) {
                /** If the pixel in front is of group "snake", the game ends */
                if (inFront.group === "snake") return 0;
                /** If the pixel in front is in the "food" group, generate a new food */
                if (inFront.group === "food") this.generateFood();
                else this.snake.shift();
            } else this.snake.shift();
            this.snake.fill(lastPos.x + 1, lastPos.y);
        }
        return 1;
    }

    generateFood() {
        const x = Math.round(Math.random() * (10 - 1)) + 1;
        const y = Math.round(Math.random() * (10 - 1)) + 1;
        this.food = this.fill(x, y, "🟧", "food");
    }


}

const boards = new Map();

client.on("message", async message => {
    if (message.content === "!start") {
        const game = new SnakeEngine(message.channel.id);
        boards.set(message.channel.id, game);

        const board = await message.channel.send(game.toString());
        const collector = board.createReactionCollector(() => true);
        collector.on("collect", reaction => {
            const emote = reaction.emoji.toString();
            let step = 1;
            if (emote === "⬆️") step = game.step("up");
            else if (emote === "⬇️") step = game.step("down");
            else if (emote === "⬅️") step = game.step("left");
            else if (emote === "➡️") step = game.step("right");
            reaction.remove();
            if (step === 0) board.edit("Game over!");
            else board.edit(game.toString());
        });
    }
});


client.login("")