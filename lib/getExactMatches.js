const incrementPegValueTotal = require('./incrementPegValueTotal');
const { _MATCHES_EXACT_, _MATCHES_NONE_ } = require('./constants');

/**
 * Find how many exact matches of both colour and placement the player has
 * guessed.
 * @param  {Array}  codeGuess     An array containing the player's guess.
 * @param  {Number} numberOfPegs  The number of pegs that make up the code.
 * @param  {Array}  secretCode    The secret code the player is trying to crack.
 * @return {Object}               An object containing the matches, total of each
 *                                colour, and total exact matches found in this turn.
 */
function getExactMatches (codeGuess, numberOfPegs, secretCode) {
	const guessMatches = [];
	const guessedColourTotals = {};
	let totalExactMatches = 0;

	/**
	 * Initialise the guessed colour totals so that there's a property for each
	 * colour in the code.
	 * */
	secretCode.forEach((colour) => {
		guessedColourTotals[colour] = 0;
	});

	/**
	 * Loop through the secret code and the player's guess to find out how many
	 * of the pegs match perfectly.
	 */
	for (let i=0; i<numberOfPegs; i++){
		if (codeGuess[i] === secretCode[i]){
			guessMatches[i] = _MATCHES_EXACT_;
			totalExactMatches++;
			guessedColourTotals[secretCode[i]] = incrementPegValueTotal(guessedColourTotals[secretCode[i]]);
		} else {
			guessMatches[i] = _MATCHES_NONE_;
		}
	}

	return {
		guessMatches: guessMatches,
		colourTotals: guessedColourTotals,
		totalExactMatches: totalExactMatches
	};
}

module.exports = getExactMatches;
