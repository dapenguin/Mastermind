const incrementColourTotal = require('./incrementColourTotal');

/**
 * Takes the secret code and creates an object containing the total number
 * of each colour in the secret code.
 * @param  {Array}  secretCode An array containing the secret code.
 * @return {Object} Object containing the total number of each colour in
 *                  the secret code.
 */
function getColourTotals (secretCode, numberOfPegs) {
	const colourTotals = {};

	for (let i=0; i<numberOfPegs; i++){
		colourTotals[secretCode[i]] = incrementColourTotal(colourTotals[secretCode[i]]);
	}

	return colourTotals;
}

module.exports = getColourTotals;
