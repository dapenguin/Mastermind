import { SecretCode } from './types';

/**
 * Randomly generates and returns a new code.
 * @param numberOfPegs    The number of pegs that make up the code.
 * @param maxPegValue     The maximum peg value that can be used to generate the
 *                        code.
 */
export function generateCode(
	numberOfPegs: number,
	maxPegValue: number
): SecretCode {
	const code = [];
	const max = maxPegValue + 1;

	for (let i = 0; i < numberOfPegs; i++) {
		code[i] = Math.floor(Math.random() * max);
	}

	return code;
}
