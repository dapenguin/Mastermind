const { expect } = require('chai');
const getColourTotals = require('../../lib/getColourTotals');

describe('getColourTotals()', () => {
	const secretCode = ['blue', 'yellow', 'white', 'blue', 'yellow'];
	const colourTotals = getColourTotals(secretCode, 5);

	it('should return the correct totals for each colour in the secret code', () => {
		expect(colourTotals).to.have.all.keys('blue', 'white', 'yellow');
		expect(colourTotals.blue).to.equal(2);
		expect(colourTotals.white).to.equal(1);
		expect(colourTotals.yellow).to.equal(2);
	});
});
