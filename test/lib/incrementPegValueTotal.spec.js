const { expect } = require('chai');
const { incrementPegValueTotal } = require('../../lib/incrementPegValueTotal');

describe('incrementPegValueTotal()', () => {
	it('should increment the given value by 1', () => {
		const result = incrementPegValueTotal(2);

		expect(result).to.equal(3);
	});

	it('should return 1 if given an undefined value', () => {
		const result = incrementPegValueTotal(undefined);

		expect(result).to.equal(1);
	});
});
