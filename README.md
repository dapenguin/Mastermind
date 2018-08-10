# Mastermind

This is a small pet project I'm working on to create a web-based version of the old code-cracking game Mastermind ([https://en.wikipedia.org/wiki/Mastermind_(board_game)](https://en.wikipedia.org/wiki/Mastermind_(board_game))).

At the moment, this code is purely for the logic side of the game. The idea is that someone can create a UI for the game, and use this code for the logic.

My goal is that once this code is completed, I will create several UIs, each using a different JavaScript framework. This will allow me to see for myself some of the differences between the frameworks, and document my findings for others to (hopefully) benefit from.

## How to use

To use this module, import it into your project and create a new instance of the `Mastermind` object:

```javascript
import Mastermind from 'mastermind'; // NPM module still to be published

const mm = new Mastermind();
```

## API

### `.start(secretCode)`

Starts a new game, either with a specified secret code (for a two player game) or a randomly generated code (for a single player game). This takes the following parameter:

- `secretCode` - _Optional_. An array of numbers that represents the secret code. If nothing is passed in to this function the secret code is randomly generated.

### `.guess(codeGuess)`

Processes the player's guess and returns the results. This takes the following parameter:

- `codeGuess` - An array of numbers that represents the players guess.

Returns an object containing the following properties:

- `totalExactMatches` - The number of times the player correctly guessed both a code item _and_ position of the code item within this guess.
- `totalPartialMatches` - The number of times the player correctl guessed a code item, but got the position wrong.
- `winner` - Boolean value representing whether the player has correctly guessed the entire code, and therefore won the game.
- `gameOver` - Boolean value representing whether the player has used all their tries and failed to crack the code.

If the secret code was **2, 1, 3, 0** and the player guessed **2, 0, 1, 2** it would return the following object:

```javascript
{
    totalExactMatches: 1,
    totalPartialMatches: 2,
    winner: false,
    gameOver: false
}
```

### `.getTriesLeft()`

Returns the number of tries the player has left to guess the secret code.

### `.getSecretCode()`

Returns an array containing the numbers that make up the secret code. Useful for telling the player what the code was if they lost, and for debugging.

## Why Mastermind?

When I was a kid, my dad wrote a few games for my Commodore 64, one of which was Mastermind. So this is a bit of a "tip of the cap" to my dad for getting me curious about coding, which eventually lead to me pursuing a career in coding.

## Why use numbers and not colours for the secret code

Good question, especially as the Mastermind board game used colour pegs for the codes. The reason is that I wanted this to be built in such a way that the UI can determine how it displays the code. This is especially important because I want to create an accessible UI that allows the player to choose how the code is displayed. For example, someone who is colourblind may prefer to see the code as shapes, and someone who is blind a relies on a screen reader may prefer numbers or letters for the code.