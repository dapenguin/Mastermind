import { expect } from 'chai';

import { getExactMatches } from '../../lib/getExactMatches';

describe('getExactMatches()', () => {
	const secretCode = [0, 1, 2, 0];
	const playerGuess = [0, 0, 2, 1];
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

	it('should return how many of each peg value in the code were exact matches', () => {
		expect(exactMatchResults).to.have.property('pegValueTotals');
		expect(exactMatchResults.pegValueTotals).to.be.an('array');
		expect(exactMatchResults.pegValueTotals[0]).to.equal(1);
		expect(exactMatchResults.pegValueTotals[1]).to.equal(0);
		expect(exactMatchResults.pegValueTotals[2]).to.equal(1);
	});

	it('should return the total number of exact matches', () => {
		expect(exactMatchResults).to.have.property('totalExactMatches');
		expect(exactMatchResults.totalExactMatches).to.be.a('number');
		expect(exactMatchResults.totalExactMatches).to.equal(2);
	});
});
