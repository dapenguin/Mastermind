// ToDo: See if we still need pegValueTotals

import { incrementPegValueTotal } from './incrementPegValueTotal';
import {
	_MATCHES_NONE_,
	_MATCHES_PARTIAL_,
	_MATCHES_EXACT_,
} from './constants';
import { Guess, PegValueTotals, SecretCode } from './types';
import { ExactMatchResults } from './getExactMatches';

export interface PartialMatchResults {
	guessMatches: number[];
	pegValueTotals: number[];
	totalExactMatches: number;
	totalPartialMatches: number;
}

/**
 * Find how many matches of peg value, but not placement the player has guessed.
 * @param  exactMatchResults Contains the exact matches and the total of each
 *                           peg value found for this turn.
 * @param  codeGuess         An array containing the player's guess.
 * @param  numberOfPegs      The number of pegs that make up the code.
 * @param  secretCode        The secret code the player is trying to crack.
 * @param  pegValueTotals    An array containing the total of each peg value in
 *                           the secret code.
 * @return An object containing the matches, total of each peg value, total
 *         exact matches, and total partial matches found in this turn.
 */
export function getPartialMatches(
	exactMatchResults: ExactMatchResults,
	codeGuess: Guess,
	numberOfPegs: number,
	secretCode: SecretCode,
	pegValueTotals: PegValueTotals
): PartialMatchResults {
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
