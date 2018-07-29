const { expect } = require('chai');
const incrementColourTotal = require('../../lib/incrementColourTotal');

describe('incrementColourTotal()', () => {
	it('should increment the given value by 1', () => {
		const result = incrementColourTotal(2);

		expect(result).to.equal(3);
	});

	it('should return 1 if given an undefined value', () => {
		const result = incrementColourTotal(undefined);

		expect(result).to.equal(1);
	});
});
