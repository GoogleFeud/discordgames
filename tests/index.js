
const Engine = require("../index.js").Engine;
const Discord = require("discord.js");
const client = new Discord.Client();

const game = new Engine({
    width: 10,
    height: 10,
    backgroundEmoji: "⬛"
}); // Creates a grid which is 10 "⬛" emojis wide and 10 "⬛" emojis tall

const groupOfCrybabies = game.group("🤡", [
    {x: 1, y: 1},
    {x: 1, y: 3},
    {x: 1, y: 5},
    {x: 1, y: 7},
    {x: 1, y: 9}
]);

client.on("ready", () => console.log("I am ready!"));

client.on("message", async msg => {
    if (msg.content === "!board") {
        msg.channel.send(game.toString());
        groupOfCrybabies.move("x", 1);
    }

});

client.login("");