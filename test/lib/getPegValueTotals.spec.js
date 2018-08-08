const { expect } = require('chai');
const getPegValueTotals = require('../../lib/getPegValueTotals');

describe('getPegValueTotals()', () => {
	const secretCode = ['blue', 'yellow', 'white', 'blue', 'yellow'];
	const pegValueTotals = getPegValueTotals(secretCode, 5);

	it('should return the correct totals for each peg value in the secret code', () => {
		expect(pegValueTotals).to.have.all.keys('blue', 'white', 'yellow');
		expect(pegValueTotals.blue).to.equal(2);
		expect(pegValueTotals.white).to.equal(1);
		expect(pegValueTotals.yellow).to.equal(2);
	});
});
