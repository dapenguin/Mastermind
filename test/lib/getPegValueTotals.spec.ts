import { expect } from 'chai';

import { getPegValueTotals } from '../../lib/getPegValueTotals';

describe('getPegValueTotals()', () => {
	const secretCode = [1, 4, 2, 1, 4];
	const pegValueTotals = getPegValueTotals(secretCode, 5);

	it('should return the correct totals for each peg value in the secret code', () => {
		expect(pegValueTotals[1]).to.equal(2);
		expect(pegValueTotals[2]).to.equal(1);
		expect(pegValueTotals[4]).to.equal(2);
	});
});
