const { expect } = require('chai');
const getPartialMatches = require('../../lib/getPartialMatches');
const { _MATCHES_NONE_, _MATCHES_PARTIAL_, _MATCHES_EXACT_ } = require('../../lib/constants');

describe('getPartialMatches()', () => {
	const secretCode = ['red','blue','white','red'];
	const playerGuess = ['green','red','white','blue'];
	const exactMatchResults = {
		guessMatches: [0, 0, 2, 0],
		colourTotals: {
			red: 0,
			blue: 0,
			white: 1
		},
		totalExactMatches: 1
	};
	const colourTotals = {
		red: 2,
		blue: 1,
		white: 1
	};

	const partialMatchResults = getPartialMatches(exactMatchResults, playerGuess, 4, secretCode, colourTotals);

	it('should return which pegs were exact matches', () => {
		expect(partialMatchResults).to.have.property('guessMatches');
		expect(partialMatchResults.guessMatches).to.be.an('array');
		expect(partialMatchResults.guessMatches[2]).to.equal(_MATCHES_EXACT_);
	});

	it('should return which pegs were partial matches', () => {
		expect(partialMatchResults.guessMatches[1]).to.equal(_MATCHES_PARTIAL_);
		expect(partialMatchResults.guessMatches[3]).to.equal(_MATCHES_PARTIAL_);
	});

	it('should return which pegs were not matches', () => {
		expect(partialMatchResults.guessMatches[0]).to.equal(_MATCHES_NONE_);
	});

	it('should return how many of each colour were matched', () => {
		expect(partialMatchResults).to.have.property('colourTotals');
		expect(partialMatchResults.colourTotals).to.be.an('object');
		expect(partialMatchResults.colourTotals).to.have.property('white');
		expect(partialMatchResults.colourTotals.white).to.equal(1);
		expect(partialMatchResults.colourTotals).to.have.property('red');
		expect(partialMatchResults.colourTotals.red).to.equal(1);
		expect(partialMatchResults.colourTotals).to.have.property('blue');
		expect(partialMatchResults.colourTotals.blue).to.equal(1);
	});

	it('should return the total number of exact matches', () => {
		expect(partialMatchResults).to.have.property('totalExactMatches');
		expect(partialMatchResults.totalExactMatches).to.be.a('number');
		expect(partialMatchResults.totalExactMatches).to.equal(1);
	});

	it('should return the total number of partial matches', () => {
		expect(partialMatchResults).to.have.property('totalPartialMatches');
		expect(partialMatchResults.totalPartialMatches).to.be.a('number');
		expect(partialMatchResults.totalPartialMatches).to.equal(2);
	});
});
