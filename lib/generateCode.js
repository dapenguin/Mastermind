/**
 * Randomly generates and returns a new code.
 * @param {Number} numberOfPegs    The number of pegs that make up the code.
 * @param {Number} maxPegValue The number of colours used to generate
 *                                 the code.
 * @returns {Array}
 * @private
 */
function generateCode (numberOfPegs, maxPegValue) {
	const code = [];
	const max = maxPegValue + 1;

	for (let i = 0; i < numberOfPegs; i++){
		code[i] = Math.floor(Math.random() * max);
	}

	return code;
}

module.exports = generateCode;
