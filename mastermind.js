const getGuessResult = require('./lib/getGuessResult');
const incrementColourTotal = require('./lib/incrementColourTotal');

const Mastermind = function() {
	// The colours available to choose from
	const _colours = ['red','blue','yellow','black','white','green'];

	// The code the player has to crack
	let _secretCode = [];

	// Maximum number of tries
	const _maxTries = 12;

	// Number of tries left
	let _triesLeft = 0;

	// The number of pegs that make up the code
	const _numberOfPegs = 4;

	// The number of colours that can be chosen from
	const _numberOfColours = 6;

	// Total number of each colour in the secret code
	let _colourTotals = {};

	/**
	 * Manually set the secret answer. Used for debugging.
	 * @param {Array} secretCode An array containing the secret code.
	 */
	this.setSecretCode = (secretCode) => {
		_secretCode = secretCode;
	};

	/**
	 * Get the secret code. Useful for telling the player the code if they've lost.
	 * @returns {Array} The secret code.
	 */
	this.getSecretCode = () => {
		return _secretCode;
	};

	/**
	 * Randomly generates and returns a new code.
	 * @param {Number} numberOfPegs    The number of pegs that make up the code.
	 * @param {Number} numberOfColours The number of colours used to generate
	 *                                 the code.
	 * @returns {Array}
	 * @private
	 */
	const _generateCode = (numberOfPegs, numberOfColours) => {
		const code = [];

		for (let i = 0; i < numberOfPegs; i++){
			code[i] = Math.floor(Math.random() * numberOfColours);
		}

		return code;
	};

	/**
	 * Reveals the code.
	 * @private
	 */
	const _revealCode = () => {
		for (let i=0; i<_numberOfPegs; i++){
			console.log(_colours[_secretCode[i]]);
		}
	};

	/**
	 * Takes the secret code and creates an object containing the total number
	 * of each colour in the secret code.
	 * @param  {Array}  secretCode An array containing the secret code.
	 * @return {Object} Object containing the total number of each colour in
	 *                  the secret code.
	 */
	this.getColourTotals = (secretCode) => {
		const colourTotals = {};

		for (let i=0; i<_numberOfPegs; i++){
			colourTotals[secretCode[i]] = incrementColourTotal(colourTotals[secretCode[i]]);
		}

		return colourTotals;
	};

	/**
	 * Process the player's guess.
	 * @param codeGuess An array containing the player's guess.
	 * @returns {Object} Object containing the results of the player's guess.
	 */
	this.guess = (codeGuess) => {
		_triesLeft--;
		const guessResult = getGuessResult(codeGuess, _numberOfPegs, _secretCode, _colourTotals, _triesLeft);

		return guessResult;
	};

	/**
	 * Returns the number of tries the player has left to guess the code.
	 * @return {Number} The number of tries the player has left.
	 */
	this.getTriesLeft = () => {
		return _triesLeft;
	};

	/**
	 * Start the game!
	 */
	this.start = () => {
		// Reset the number of tries left
		_triesLeft = _maxTries;
		// Generate the secret code
		_secretCode = _generateCode(_numberOfPegs, _numberOfColours);

		_colourTotals = this.getColourTotals(_secretCode);
	};
};

module.exports = Mastermind;
