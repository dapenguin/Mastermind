const { expect } = require('chai');
const getExactMatches = require('../../lib/getExactMatches');

describe('getExactMatches()', () => {
	const secretCode = ['red','blue','white','red'];
	const playerGuess = ['red','red','white','blue'];
	const exactMatchResults = getExactMatches(playerGuess, 4, secretCode);

	it('should return which pegs were exact matches', () => {
		expect(exactMatchResults).to.have.property('guessMatches');
		expect(exactMatchResults.guessMatches).to.be.an('array');
		expect(exactMatchResults.guessMatches[0]).to.equal(2);
		expect(exactMatchResults.guessMatches[2]).to.equal(2);
	});

	it('should return which pegs were not exact matches', () => {
		expect(exactMatchResults.guessMatches[1]).to.equal(0);
		expect(exactMatchResults.guessMatches[3]).to.equal(0);
	});

	it('should return how many of each colour were exact matches', () => {
		expect(exactMatchResults).to.have.property('colourTotals');
		expect(exactMatchResults.colourTotals).to.be.an('object');
		expect(exactMatchResults.colourTotals).to.have.property('white');
		expect(exactMatchResults.colourTotals.white).to.equal(1);
		expect(exactMatchResults.colourTotals).to.have.property('red');
		expect(exactMatchResults.colourTotals.white).to.equal(1);
	});

	it('should return the total number of exact matches', () => {
		expect(exactMatchResults).to.have.property('totalExactMatches');
		expect(exactMatchResults.totalExactMatches).to.be.a('number');
		expect(exactMatchResults.totalExactMatches).to.equal(2);
	});
});
