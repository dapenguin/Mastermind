import { getExactMatches } from './getExactMatches';
import { getPartialMatches } from './getPartialMatches';
import { Guess, GuessResult, PegValueTotals, SecretCode } from './types';

/**
 * Process the player's guess.
 * @param  codeGuess      The player's guess.
 * @param  numberOfPegs   The number of pegs that make up the code.
 * @param  secretCode     The secret code the player is trying to crack.
 * @param  pegValueTotals The number of each peg value used in the code.
 * @param  triesLeft      The number of tries the player has left
 * @return Object containing the results of the player's guess.
 */
export function getGuessResult(
	codeGuess: Guess,
	numberOfPegs: number,
	secretCode: SecretCode,
	pegValueTotals: PegValueTotals,
	triesLeft: number
): GuessResult {
	const exactMatchResult = getExactMatches(codeGuess, numberOfPegs, secretCode);

	if (exactMatchResult.totalExactMatches === numberOfPegs) {
		return {
			totalExactMatches: exactMatchResult.totalExactMatches,
			totalPartialMatches: 0,
			winner: true,
			gameOver: false,
		};
	}

	const guessResult = getPartialMatches(
		exactMatchResult,
		codeGuess,
		numberOfPegs,
		secretCode,
		pegValueTotals
	);

	return {
		totalExactMatches: guessResult.totalExactMatches,
		totalPartialMatches: guessResult.totalPartialMatches,
		winner: false,
		gameOver: triesLeft === 0,
	};
}
