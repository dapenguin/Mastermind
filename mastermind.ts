import { getPegValueTotals } from './lib/getPegValueTotals';
import { generateCode } from './lib/generateCode';
import { getGuessResult } from './lib/getGuessResult';
import { Guess, GuessResult, PegValueTotals, SecretCode } from './lib/types';

export const Mastermind = function (): void {
	// The code the player has to crack
	let _secretCode: SecretCode = [];

	// Maximum number of tries
	const _maxTries = 12;

	// Number of tries left
	let _triesLeft = 0;

	// The number of pegs that make up the code
	const _numberOfPegs = 4;

	// The maximum zero based value that can be given to a peg
	const _maxPegValue = 5;

	// Total number of each peg value in the secret code
	let _pegValueTotals: PegValueTotals = [];

	/**
	 * Get the secret code. Useful for telling the player the code if they've lost.
	 * @returns The secret code.
	 */
	this.getSecretCode = (): SecretCode => _secretCode;

	/**
	 * Process the player's guess.
	 * @param codeGuess An array containing the player's guess.
	 * @returns Object containing the results of the player's guess.
	 */
	this.guess = (codeGuess: Guess): GuessResult => {
		_triesLeft--;
		return getGuessResult(
			codeGuess,
			_numberOfPegs,
			_secretCode,
			_pegValueTotals,
			_triesLeft
		);
	};

	/**
	 * Returns the number of tries the player has left to guess the code.
	 * @return The number of tries the player has left.
	 */
	this.getTriesLeft = (): number => _triesLeft;

	/**
	 * Start the game!
	 * @param secretCode The secret code to play the game with. Mainly used for
	 *                   debugging. If no secret code is provided, one will be
	 *                   generated.
	 */
	this.start = (secretCode?: SecretCode) => {
		// Reset the number of tries left
		_triesLeft = _maxTries;
		// Generate the secret code
		_secretCode = secretCode || generateCode(_numberOfPegs, _maxPegValue);

		_pegValueTotals = getPegValueTotals(_secretCode, _numberOfPegs);
	};
};
