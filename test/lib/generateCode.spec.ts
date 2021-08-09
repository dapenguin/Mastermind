import { expect } from 'chai';

import { generateCode } from '../../lib/generateCode';

describe('getExactMatches()', () => {
	const isWholeNumber = (num) => num % 1 === 0;
	const secretCode = generateCode(4, 5);

	it('should return an array with the correct length', () => {
		expect(secretCode.length).to.equal(4);
	});

	it('should return an array containing only whole numbers', () => {
		expect(isWholeNumber(secretCode[0])).to.be.true;
		expect(isWholeNumber(secretCode[1])).to.be.true;
		expect(isWholeNumber(secretCode[2])).to.be.true;
		expect(isWholeNumber(secretCode[3])).to.be.true;
	});
});
