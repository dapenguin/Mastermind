/**
 * Takes a colour total and increments it by 1.
 * @param  {Number} currentColourTotal The current colour total.
 * @return {Number}                    The new colour total.
 */
function incrementColourTotal (currentColourTotal) {
	return (typeof currentColourTotal === 'undefined') ? 1 : currentColourTotal + 1;
}

module.exports = incrementColourTotal;
