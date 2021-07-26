// ToDo: See if we still need pegValueTotals

const { incrementPegValueTotal } = require('./incrementPegValueTotal');
const {
	_MATCHES_NONE_,
	_MATCHES_PARTIAL_,
	_MATCHES_EXACT_,
} = require('./constants');

/**
 * Find how many matches of peg value, but not placement the player has guessed.
 * @param  {Object} exactMatchResults Contains the exact matches and the total of
 *                                    each peg value found for this turn.
 * @param  {Array}  codeGuess         An array containing the player's guess.
 * @param  {Number} numberOfPegs      The number of pegs that make up the code.
 * @param  {Array}  secretCode        The secret code the player is trying to crack.
 * @param  {Array}  pegValueTotals    An array containing the total of each peg
 *                                    value in the secret code.
 * @return {Object} An object containing the matches, total of each peg value, total
 *                  exact matches, and total partial matches found in this turn.
 */
function getPartialMatches(
	exactMatchResults,
	codeGuess,
	numberOfPegs,
	secretCode,
	pegValueTotals
) {
	const guessMatches = exactMatchResults.guessMatches;
	const alreadyMatched = exactMatchResults.guessMatches.map(
		(match) => match === _MATCHES_EXACT_
	);
	const guessedPegValueTotals = exactMatchResults.pegValueTotals;
	let totalPartialMatches = 0;

	// Loop through the guesses
	for (let i = 0; i < numberOfPegs; i++) {
		// Only check the guess if it was unsucessful in the previous loop.
		if (guessMatches[i] === _MATCHES_NONE_) {
			// Loop through the secret code
			for (let c = 0; c < numberOfPegs; c++) {
				if (
					!alreadyMatched[c] &&
					codeGuess[i] === secretCode[c] &&
					guessedPegValueTotals[secretCode[c]] < pegValueTotals[secretCode[c]]
				) {
					guessMatches[i] = _MATCHES_PARTIAL_;
					alreadyMatched[c] = true;
					totalPartialMatches++;
					guessedPegValueTotals[secretCode[c]] = incrementPegValueTotal(
						guessedPegValueTotals[secretCode[c]]
					);
					break;
				}
			}
		}
	}

	return {
		guessMatches: guessMatches,
		pegValueTotals: guessedPegValueTotals,
		totalExactMatches: exactMatchResults.totalExactMatches,
		totalPartialMatches: totalPartialMatches,
	};
}

module.exports = { getPartialMatches };
