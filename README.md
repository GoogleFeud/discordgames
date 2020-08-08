# Textgames

A way to create games via emojis! This module can be used to create small games for slack, discord, the terminal, any chat app with an API really!

![Img1](https://i.imgur.com/GvkKgOE.png)

## Install

```npm i text.games```

## How it works

Every game has an **engine**. An **engine** is a top-level class which is used to **store** the **grid** and **draw** on it using emojis! A **grid** is like a **canvas**, except it's only 5-14 pixels wide and tall! One **pixel** means one **emoji**.

Also, it's not required to use emojis! You can use letters or text just fine! The documentation just says "emoji" because the initial intention of this package was to be used alongside emojis.

For example:

```js
const TextGames = require("text.games");

const game = new TextGame.Engine({
    width: 10, 
    height: 10,
    backgroundEmoji: "⬛"
}); // Creates a grid which is 10 "⬛" emojis wide and 10 "⬛" emojis tall

game.fill(1, 1, "🤡"); // x axis, y axis, emoji to fill
game.fill(1, 3, "🤡");
game.fill(1, 5, "🤡");
game.fill(1, 7, "🤡");
game.fill(1, 9, "🤡");
```

This produces this, when viewed on discord:

![Img2](https://i.imgur.com/qF677JR.png)   

Another important concept are `groups`. Groups are something like a mini-grid, or a layer on top of the grid. They can hold multiple pixels and control them. 

Example of using groups, instead of the first example:

```js
const groupOfCrybabies = game.group("🤡", [
    {x: 1, y: 1},
    {x: 1, y: 3},
    {x: 1, y: 5},
    {x: 1, y: 7},
    {x: 1, y: 9}
]);
```
One of the biggest pros of using groups is that you can move all of the pixels at once! You can also change all of their emojis at once.

```js
groupOfCrybabies.move("x", 1);
```
## API

- [Pixel](https://github.com/GoogleFeud/text.games#Pixel)
- [Engine](https://github.com/GoogleFeud/text.games#Engine)
- [Group](https://github.com/GoogleFeud/text.games#Group)

### Pixel

An object which represents a single pixel on the grid.

#### #x

Where the pixel is located on the X axis.

**Type:** `Number`

#### #y

Where the pixel is located on the Y axis.

**Type:** `Number`

#### #emoji

The emoji that this pixel is filled with.

**Type:** `String`

#### #group

The group of this pixel.

**Type:** `?String`

### Engine

#### constructor

|  Parameter  | Type | Description
| ------------- | ------------- |  ------------- |
| Settings  | Object | Settings for the engine |
| Settings.width | Number |  How wide in pixels (aka emojis) should the grid be. Default is `10`. |
| Settings.height | Number |  How tall in pixels (aka emojis) should the grid be. Default is `10`. |
| Settings.backgroundEmoji | String | What the background emoji should be. Default is `⬛`. |
| Settings.spaceBetween | Boolean | Adds a space between each row of emoji. Default i `false`. |
| Settings.newLine | String | The character for line breaks. Default is `\n`. |

#### #fill()

Fills a single pixel with an emoji.    

**Groups override fill functions**. That means, if the pixel `{x: 1, y: 1}` is in a group, any fill functions wanting to change the emoji of the pixel will fail. The pixel's emoji must be overriden/cleared either by changing the emoji for the entire group it's in `group.emoji = "someEmoji"`, or by deleting the pixel from the group. (`group.clear(x, y)`)

|  Parameter  | Type | Description
| ------------- | ------------- |  ------------- |
| x | Number | The coordinate for the X axis. |
| y | Number | The coordinate for the Y axis. |
| emoji | String | The emoji to fill with. |
| group | String | Give the pixel a group. This is optional. |    
     
**Returns:** `Pixel`

#### #clear()

Clears a single pixel.     

**Groups override clear functions**. That means, if the pixel `{x: 1, y: 1}` is in a group, any clear functions wanting to clear the emoji of the pixel will fail. The pixel's emoji must be overriden/cleared either by changing the emoji for the entire group it's in `group.emoji = "someEmoji"`, or by deleting the pixel from the group. (`group.clear(x, y)`)

|  Parameter  | Type | Description
| ------------- | ------------- |  ------------- |
| x | Number | The coordinate for the X axis. |
| y | Number | The coordinate for the Y axis. |

**Returns:** `void`

#### #clearAll()

Clears the whole grid, including groups.

**Returns:** `void`

#### #group()

Creates a new group of pixels.

|  Parameter  | Type | Description
| ------------- | ------------- |  ------------- |
| emoji | String | The emoji that all pixels in this group will be filled with. |
| coords | Array<Pixel> | An array containing the coordinates of all pixels that are in this group. |
| id | String | The id of this group. Optional. |

**Example:**    
```js
engine.group("🟩", [
   {x: 5, y: 5},
   {x: 10, y: 10},
   {x: 4, y: 1}
], "someGroupName");
```

**Returns:** `Group`

#### #pixelAt()

Returns the pixel at the specified coordinates. Useful for checking for collision.

|  Parameter  | Type | Description
| ------------- | ------------- |  ------------- |
| x | Number | The coordinate for the X axis. |
| y | Number | The coordinate for the Y axis. |

**Returns:** `?Pixel`

#### #toString()

Returns the grid as a string. This string should be sent to the text app. 

**Returns:** `String`

#### #settings

The setting provided in the constructor.

**Type:** `Object`

#### #groups

An array of all groups created by this engine.

**Type:** `Array<Group>`

### Group

An object which represents multiple pixels, connected by a common trait. The group is like a mini-grid, or a layer. All pixels in a group are owned by that group. Groups **cannot** share ownership of pixels. If the same pixel is in 2 different groups, the group that was created later claims ownership.

#### #move()

Moves every pixel in the group.

|  Parameter  | Type | Description
| ------------- | ------------- |  ------------- |
| axis | "x" OR "y" | The axis to move to. |
| distance | Number | How far to move the group. Defaults to `1`. |

**Returns:** `void`

#### #shift()

Removes the first element from the group.

**Returns:** `?Pixel (The removed element)`

#### #pop()

Removes the last element from the group.

**Returns:** `?Pixel (The removed element)`

#### #fill()

Adds an element to the back of the group.

|  Parameter  | Type | Description
| ------------- | ------------- |  ------------- |
| x | Number | The coordinate for the X axis. |
| y | Number | The coordinate for the Y axis. |


**Returns:** `Pixel`

#### #clear()

Clears a single pixel in the group. When a group clears a pixel, it no longer owns it.

|  Parameter  | Type | Description
| ------------- | ------------- |  ------------- |
| x | Number | The coordinate for the X axis. |
| y | Number | The coordinate for the Y axis. |

**Returns:** `void`

#### #clearAll()

Clears all pixels in the group, but doesn't delete the group. 

**Returns:** `void`

#### #id

The ID of the group.

**Type:** `?String`

#### #pixels

An array containing all pixels in this group.

**Type:** `Array<Pixel>`

#### #emoji

The emoji that this group gets filled with.

**Type:** `String`

#### #engine

The engine that created this group.

**Type:** `Engine`