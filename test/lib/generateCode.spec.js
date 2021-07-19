const { expect } = require('chai');
const generateCode = require('../../lib/generateCode');

describe('getExactMatches()', () => {
	const isInteger = (num) => num % 1 === 0;
	const secretCode = generateCode(4, 5);

	it('should return an array with the correct length', () => {
		expect(secretCode.length).to.equal(4);
	});

	it('should return an array containing only integers', () => {
		expect(isInteger(secretCode[0])).to.be.true;
		expect(isInteger(secretCode[1])).to.be.true;
		expect(isInteger(secretCode[2])).to.be.true;
		expect(isInteger(secretCode[3])).to.be.true;
	});
});
