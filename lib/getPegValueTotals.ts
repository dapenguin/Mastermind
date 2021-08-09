import { incrementPegValueTotal } from './incrementPegValueTotal';
import { PegValueTotals, SecretCode } from './types';

/**
 * Takes the secret code and creates an object containing the total number of
 * each peg value in the secret code.
 * @param  secretCode   An array containing the secret code.
 * @param  numberOfPegs The number of pegs that make up the secret code.
 * @return Array containing the total number of each peg value in the secret
 *         code.
 */
export function getPegValueTotals(
	secretCode: SecretCode,
	numberOfPegs: number
): PegValueTotals {
	const pegValueTotals = [];

	for (let i = 0; i < numberOfPegs; i++) {
		pegValueTotals[secretCode[i]] = incrementPegValueTotal(
			pegValueTotals[secretCode[i]]
		);
	}

	return pegValueTotals;
}
