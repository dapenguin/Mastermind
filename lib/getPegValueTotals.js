const incrementColourTotal = require('./incrementColourTotal');

/**
 * Takes the secret code and creates an object containing the total number
 * of each colour in the secret code.
 * @param  {Array}  secretCode An array containing the secret code.
 * @return {Object} Object containing the total number of each colour in
 *                  the secret code.
 */
function getPegValueTotals (secretCode, numberOfPegs) {
	const pegValueTotals = {};

	for (let i=0; i<numberOfPegs; i++){
		pegValueTotals[secretCode[i]] = incrementColourTotal(pegValueTotals[secretCode[i]]);
	}

	return pegValueTotals;
}

module.exports = getPegValueTotals;