import { getPegValueTotals } from './lib/getPegValueTotals';
import { generateCode } from './lib/generateCode';
import { getGuessResult } from './lib/getGuessResult';

const Mastermind = function () {
	// The code the player has to crack
	let _secretCode = [];

	// Maximum number of tries
	const _maxTries = 12;

	// Number of tries left
	let _triesLeft = 0;

	// The number of pegs that make up the code
	const _numberOfPegs = 4;

	// The maximum zero based value that can be given to a peg
	const _maxPegValue = 5;

	// Total number of each peg value in the secret code
	let _pegValueTotals = {};

	/**
	 * Get the secret code. Useful for telling the player the code if they've lost.
	 * @returns {Array} The secret code.
	 */
	this.getSecretCode = () => _secretCode;

	/**
	 * Process the player's guess.
	 * @param {Array} codeGuess An array containing the player's guess.
	 * @returns {Object} Object containing the results of the player's guess.
	 */
	this.guess = (codeGuess) => {
		_triesLeft--;
		const guessResult = getGuessResult(
			codeGuess,
			_numberOfPegs,
			_secretCode,
			_pegValueTotals,
			_triesLeft
		);

		return guessResult;
	};

	/**
	 * Returns the number of tries the player has left to guess the code.
	 * @return {Number} The number of tries the player has left.
	 */
	this.getTriesLeft = () => _triesLeft;

	/**
	 * Start the game!
	 * @param {Array} secretCode The secret code to play the game with. Mainly used
	 *                           for debugging. If no secret code is provided, one
	 *                           will be generated.
	 */
	this.start = (secretCode) => {
		// Reset the number of tries left
		_triesLeft = _maxTries;
		// Generate the secret code
		_secretCode = secretCode || generateCode(_numberOfPegs, _maxPegValue);

		_pegValueTotals = getPegValueTotals(_secretCode, _numberOfPegs);
	};
};

module.exports = Mastermind;
