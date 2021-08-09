/**
 * Takes a peg value total and increments it by 1.
 * @param  currentPegValueTotal The current peg value total.
 * @return                      The new peg value total.
 */
export function incrementPegValueTotal(currentPegValueTotal: number): number {
	return typeof currentPegValueTotal === 'undefined'
		? 1
		: currentPegValueTotal + 1;
}
