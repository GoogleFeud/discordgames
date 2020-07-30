
const TextGame = require("../index.js");
const fs = require("fs");

const game = new TextGame.Engine(500, 500);

class Square extends TextGame.Object {
    constructor(engine, x, y, width, height) {
        super(engine);
        this.position = new TextGame.Vector(x, y);
        this.size = new TextGame.Vector(width, height);
        this.rngColors = ["red", "green", "blue", "purple"];
    }

    render() {
        this.style.fillStyle = this.rngColors[Math.floor(Math.random() * this.rngColors.length)]; // chooses the random color for the fill style
        this.applyStyle(); // applies the fill style
        this.engine.context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y); // draws the rectangle!
    }

}

class Circle extends TextGame.Object {
    constructor(engine, x, y) {
        super(engine);
        this.position = new TextGame.Vector(x, y);
        this.radius = 90;
        this.rngColors = ["red", "green", "blue", "purple"];
    }

    render() {
        this.style.fillStyle = this.rngColors[Math.floor(Math.random() * this.rngColors.length)]; // chooses the random color for the fill style
        this.applyStyle(); // applies the fill style
        this.engine.context.beginPath();
        this.engine.context.arc(this.position.x, this.position.y, this.radius, 0, 2 *Math.PI);
        this.engine.context.fill();
        this.engine.context.closePath();
    }
}

setInterval(() => {
     game.create(Circle, rng(1, 500), rng(1, 500));
     game.create(Square, rng(1, 500), rng(1, 500), rng(1, 100), rng(1, 500));    
     game.step();
     fs.writeFileSync("./img.png", game.toBuffer("image/png"))
}, 1000);

function rng(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min
}