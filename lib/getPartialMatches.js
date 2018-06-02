const incrementColourTotal = require('./incrementColourTotal');
const { _MATCHES_NONE_, _MATCHES_PARTIAL_, _MATCHES_EXACT_ } =  require('./constants');

/**
 * Find how many matches of colour, but not placement the player has guessed.
 * @param  {Object} exactMatchResults Contains the exact matches and the total of
 *                                    each colour found for this turn.
 * @param  {Array}  codeGuess         An array containing the player's guess.
 * @param  {Number} numberOfPegs      The number of pegs that make up the code.
 * @param  {Array}  secretCode        The secret code the player is trying to crack.
 * @param  {Object} colourTotals      An object containing the total of each colour
 *                                    in the secret code.
 * @return {Object} An object containing the matches, total of each colour, total
 *                  exact matches, and total partial matches found in this turn.
 */
function getPartialMatches (exactMatchResults, codeGuess, numberOfPegs, secretCode, colourTotals) {
	const guessMatches = exactMatchResults.guessMatches;
	const alreadyMatched = exactMatchResults.guessMatches.map(match => match === _MATCHES_EXACT_);
	const guessedColourTotals = exactMatchResults.colourTotals;
	let totalPartialMatches = 0;

	// Loop through the guesses
	for (let i=0; i<numberOfPegs; i++){
		// Only check the guess if it was unsucessful in the previous loop.
		if (guessMatches[i] === _MATCHES_NONE_){
			// console.log(`No matches for i: ${i}`);
			// Loop through the secret code
			for (let c=0; c<numberOfPegs; c++){
				// console.log(`c: ${c}, guessMatches[c]: ${guessMatches[c]}, codeGuess[i]: ${codeGuess[i]}, secretCode[c]: ${secretCode[c]}, guessedColourTotals[secretCode[c]]: ${guessedColourTotals[secretCode[c]]}, colourTotals[secretCode[c]]: ${colourTotals[secretCode[c]]}`);
				// console.log(`alreadyMatched[c]: ${alreadyMatched[c]}, guessMatches[c] === _MATCHES_NONE_: ${guessMatches[c] === _MATCHES_NONE_}, codeGuess[i] === secretCode[c]: ${codeGuess[i] === secretCode[c]}, guessedColourTotals[secretCode[c]] < colourTotals[secretCode[c]]: ${guessedColourTotals[secretCode[c]] < colourTotals[secretCode[c]]}`);
				if (!alreadyMatched[c] /*guessMatches[c] === _MATCHES_NONE_*/ && codeGuess[i] === secretCode[c] && guessedColourTotals[secretCode[c]] < colourTotals[secretCode[c]]){
					guessMatches[i] = _MATCHES_PARTIAL_;
					alreadyMatched[c] = true;
					totalPartialMatches++;
					guessedColourTotals[secretCode[c]] = incrementColourTotal(guessedColourTotals[secretCode[c]]);
					break;
				}
			}
		}
	}

	return {
		guessMatches: guessMatches,
		colourTotals: guessedColourTotals,
		totalExactMatches: exactMatchResults.totalExactMatches,
		totalPartialMatches: totalPartialMatches
	};
}

module.exports = getPartialMatches;
