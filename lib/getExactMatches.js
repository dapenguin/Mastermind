const incrementPegValueTotal = require('./incrementPegValueTotal');
const { _MATCHES_EXACT_, _MATCHES_NONE_ } = require('./constants');

/**
 * Find how many exact matches of both peg value and placement the player has
 * guessed.
 * @param  {Array}  codeGuess     An array containing the player's guess.
 * @param  {Number} numberOfPegs  The number of pegs that make up the code.
 * @param  {Array}  secretCode    The secret code the player is trying to crack.
 * @return {Object}               An object containing the matches, total of each
 *                                peg value, and total exact matches found in this
 *                                turn.
 */
function getExactMatches(codeGuess, numberOfPegs, secretCode) {
	const guessMatches = [];
	const guessedPegValueTotals = [];
	let totalExactMatches = 0;

	/**
	 * Initialise the guessed peg value totals so that there's a property for each
	 * peg value in the code.
	 * */
	secretCode.forEach((pegValue) => {
		guessedPegValueTotals[pegValue] = 0;
	});

	/**
	 * Loop through the secret code and the player's guess to find out how many
	 * of the pegs match perfectly.
	 */
	for (let i = 0; i < numberOfPegs; i++) {
		if (codeGuess[i] === secretCode[i]) {
			guessMatches[i] = _MATCHES_EXACT_;
			totalExactMatches++;
			guessedPegValueTotals[secretCode[i]] = incrementPegValueTotal(
				guessedPegValueTotals[secretCode[i]]
			);
		} else {
			guessMatches[i] = _MATCHES_NONE_;
		}
	}

	return {
		guessMatches: guessMatches,
		pegValueTotals: guessedPegValueTotals,
		totalExactMatches: totalExactMatches,
	};
}

module.exports = getExactMatches;
