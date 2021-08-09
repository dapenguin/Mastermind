import { expect } from 'chai';

import { getPartialMatches } from '../../lib/getPartialMatches';
import {
	_MATCHES_NONE_,
	_MATCHES_PARTIAL_,
	_MATCHES_EXACT_,
} from '../../lib/constants';

describe('getPartialMatches()', () => {
	const secretCode = [0, 1, 2, 0];
	const playerGuess = [3, 0, 2, 1];
	const exactMatchResults = {
		guessMatches: [0, 0, 2, 0],
		pegValueTotals: [0, 0, 1],
		totalExactMatches: 1,
	};
	const pegValueTotals = [2, 1, 1];

	const partialMatchResults = getPartialMatches(
		exactMatchResults,
		playerGuess,
		4,
		secretCode,
		pegValueTotals
	);

	it('should return which pegs were exact matches', () => {
		expect(partialMatchResults.guessMatches[2]).to.equal(_MATCHES_EXACT_);
	});

	it('should return which pegs were partial matches', () => {
		expect(partialMatchResults.guessMatches[1]).to.equal(_MATCHES_PARTIAL_);
		expect(partialMatchResults.guessMatches[3]).to.equal(_MATCHES_PARTIAL_);
	});

	it('should return which pegs were not matches', () => {
		expect(partialMatchResults.guessMatches[0]).to.equal(_MATCHES_NONE_);
	});

	it('should return how many of each peg value was matched', () => {
		expect(partialMatchResults.pegValueTotals[0]).to.equal(1);
		expect(partialMatchResults.pegValueTotals[1]).to.equal(1);
		expect(partialMatchResults.pegValueTotals[2]).to.equal(1);
	});

	it('should return the total number of exact matches', () => {
		expect(partialMatchResults.totalExactMatches).to.equal(1);
	});

	it('should return the total number of partial matches', () => {
		expect(partialMatchResults.totalPartialMatches).to.equal(2);
	});
});
