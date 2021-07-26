/**
 * Takes a peg value total and increments it by 1.
 * @param  {Number} currentPegValueTotal The current peg value total.
 * @return {Number}                      The new peg value total.
 */
function incrementPegValueTotal(currentPegValueTotal) {
	return typeof currentPegValueTotal === 'undefined'
		? 1
		: currentPegValueTotal + 1;
}

module.exports = { incrementPegValueTotal };
