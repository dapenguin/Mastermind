/**
 * Randomly generates and returns a new code.
 * @param {Number} numberOfPegs    The number of pegs that make up the code.
 * @param {Number} numberOfColours The number of colours used to generate
 *                                 the code.
 * @returns {Array}
 * @private
 */
function generateCode (numberOfPegs, numberOfColours) {
	const code = [];

	for (let i = 0; i < numberOfPegs; i++){
		code[i] = Math.floor(Math.random() * numberOfColours);
	}

	return code;
}

module.exports = generateCode;
