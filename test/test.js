const { expect } = require('chai');

const Mastermind = require('../mastermind');

describe('Creating a new game', () => {
	const mm = new Mastermind();
	mm.start();

	it('should generate a code consisting of 4 pegs', () => {
		const code = mm.getSecretCode();
		expect(code.length).to.equal(4);
	});
});

describe('A game where the chosen code is: white, blue, white, blue', () => {
	const mm = new Mastermind();
	const secretCode = ['white','blue','white','blue'];
	const colourTotals = mm.getColourTotals(secretCode);

	mm.setSecretCode(secretCode);

	it('should have a total of 2 whites and 2 blues in the secret code', () => {
		expect(colourTotals).to.deep.equal({ white: 2, blue: 2 });
	});

	describe('Player guesses: white, red, red, white', () => {
		const playerGuess = ['white','red','red','white'];

		describe('Find exact matches', () => {
			const exactMatchResults = mm.getExactMatches(playerGuess);

			it('should mark the first peg as an exact match', () => {
				expect(exactMatchResults.guessMatches).to.deep.equal([2, 0, 0, 0]);
			});

			it('should find a total of 1 white match', () => {
				expect(exactMatchResults.colourTotals).to.deep.equal({ white: 1 });
			});

			it('should find a total of 1 exact match', () => {
				expect(exactMatchResults.totalExactMatches).to.equal(1);
			});
		});

		describe('Find exact matches and partial matches', () => {
			const exactMatchResults = mm.getExactMatches(playerGuess);
			const partialMatchResults = mm.getPartialMatches(exactMatchResults, playerGuess, colourTotals);

			it('should mark the fourth peg as a partial match', () => {
				expect(partialMatchResults.guessMatches).to.deep.equal([2, 0, 0, 1]);
			});

			it('should find a total of 2 white matches', () => {
				expect(partialMatchResults.colourTotals).to.deep.equal({ white: 2 });
			});

			it('should find a total of 1 exact match', () => {
				expect(partialMatchResults.totalExactMatches).to.equal(1);
			});

			it('should find a total of 1 partial match', () => {
				expect(partialMatchResults.totalPartialMatches).to.equal(1);
			});
		});
	});

	describe('Player guesses: white, white, red, white', () => {
		const playerGuess = ['white','white','red','white'];

		describe('Find exact matches', () => {
			const exactMatchResults = mm.getExactMatches(playerGuess);

			it('should mark the first peg as an exact match', () => {
				expect(exactMatchResults.guessMatches).to.deep.equal([2, 0, 0, 0]);
			});

			it('should find a total of 1 white match', () => {
				expect(exactMatchResults.colourTotals).to.deep.equal({ white: 1 });
			});

			it('should find a total of 1 exact match', () => {
				expect(exactMatchResults.totalExactMatches).to.equal(1);
			});
		});

		describe('Find exact matches and partial matches', () => {
			const exactMatchResults = mm.getExactMatches(playerGuess);
			const partialMatchResults = mm.getPartialMatches(exactMatchResults, playerGuess, colourTotals);

			it('should mark the second peg as a partial match', () => {
				expect(partialMatchResults.guessMatches).to.deep.equal([2, 1, 0, 0]);
			});

			it('should find a total of 2 white matches', () => {
				expect(partialMatchResults.colourTotals).to.deep.equal({ white: 2 });
			});

			it('should find a total of 1 exact match', () => {
				expect(partialMatchResults.totalExactMatches).to.equal(1);
			});

			it('should find a total of 1 partial match', () => {
				expect(partialMatchResults.totalPartialMatches).to.equal(1);
			});
		});
	});

	describe('Player guesses: white, white, white, white', () => {
		const playerGuess = ['white','white','white','white'];

		describe('Find exact matches', () => {
			const exactMatchResults = mm.getExactMatches(playerGuess);

			it('should mark the first peg as an exact match', () => {
				expect(exactMatchResults.guessMatches).to.deep.equal([2, 0, 2, 0]);
			});

			it('should find a total of 2 white matches', () => {
				expect(exactMatchResults.colourTotals).to.deep.equal({ white: 2 });
			});

			it('should find a total of 2 exact matches', () => {
				expect(exactMatchResults.totalExactMatches).to.equal(2);
			});
		});

		describe('Find exact matches and partial matches', () => {
			const exactMatchResults = mm.getExactMatches(playerGuess);
			const partialMatchResults = mm.getPartialMatches(exactMatchResults, playerGuess, colourTotals);

			it('should not mark any pegs as a partial matches', () => {
				expect(partialMatchResults.guessMatches).to.deep.equal([2, 0, 2, 0]);
			});

			it('should find a total of 2 white matches', () => {
				expect(partialMatchResults.colourTotals).to.deep.equal({ white: 2 });
			});

			it('should find a total of 2 exact match', () => {
				expect(partialMatchResults.totalExactMatches).to.equal(2);
			});

			it('should find a total of 0 partial match', () => {
				expect(partialMatchResults.totalPartialMatches).to.equal(0);
			});
		});
	});
});
