

const Engine = require("../index.js").Engine;

const game = new Engine({height: 5, width: 5, backgroundEmoji: "b"});

const group = game.group("a", [
    {x: 1, y: 1},
    {x: 1, y: 2},
    {x: 1, y: 3},
    {x: 1, y: 4},
    {x: 1, y: 5}
]);

console.log(game.toString(), game);