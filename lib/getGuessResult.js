const getExactMatches = require('./getExactMatches');
const getPartialMatches = require('./getPartialMatches');

/**
 * Process the player's guess.
 * @param  {Array}  codeGuess      The player's guess.
 * @param  {Number} numberOfPegs   The number of pegs that make up the code.
 * @param  {Array}  secretCode     The secret code the player is trying to crack.
 * @param  {Array}  pegValueTotals The number of each peg value used in the code.
 * @param  {Number} triesLeft      The number of tries the player has left
 * @return {Object} Object containing the results of the player's guess.
 */
function getGuessResult (codeGuess, numberOfPegs, secretCode, pegValueTotals, triesLeft) {
	let winner = false;
	let gameOver = false;

	// Contains the result of the player's guess
	let guessResult = getExactMatches(codeGuess, numberOfPegs, secretCode);

	if (guessResult.totalExactMatches === numberOfPegs) {
		winner = true;
	} else {
		guessResult = getPartialMatches(guessResult, codeGuess, numberOfPegs, secretCode, pegValueTotals);

		if (triesLeft === 0) {
			gameOver = true;
		}
	}

	return {
		totalExactMatches: guessResult.totalExactMatches,
		totalPartialMatches: guessResult.totalPartialMatches,
		winner,
		gameOver
	};
}

module.exports = getGuessResult;
