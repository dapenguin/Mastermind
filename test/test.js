const { expect } = require('chai');

const Mastermind = require('../mastermind');
const mm = new Mastermind();

describe('A game where the chosen code is: white, blue, white, blue', function() {
	var secretCode = ['white','blue','white','blue'],
		colourTotals = mm.getColourTotals(secretCode);

	mm.setSecretCode(secretCode);

	it('should have a total of 2 whites and 2 blues in the secret code', function(){
		expect(colourTotals).to.deep.equal({ white: 2, blue: 2 });
	});

	describe('Player guesses: white, red, red, white', function() {
		var playerGuess = ['white','red','red','white'];

		describe('Find exact matches', function() {
			var exactMatchResults = mm.getExactMatches(playerGuess);

			it('should mark the first peg as an exact match', function() {
				expect(exactMatchResults.guessMatches).to.deep.equal([2, 0, 0, 0]);
			});

			it('should find a total of 1 white match', function() {
				expect(exactMatchResults.colourTotals).to.deep.equal({ white: 1 });
			});

			it('should find a total of 1 exact match', function() {
				expect(exactMatchResults.totalExactMatches).to.equal(1);
			});
		});

		describe('Find exact matches and partial matches', function() {
			var exactMatchResults = mm.getExactMatches(playerGuess),
				partialMatchResults = mm.getPartialMatches(exactMatchResults, playerGuess, colourTotals);

			it('should mark the fourth peg as a partial match', function() {
				expect(partialMatchResults.guessMatches).to.deep.equal([2, 0, 0, 1]);
			});

			it('should find a total of 2 white matches', function() {
				expect(partialMatchResults.colourTotals).to.deep.equal({ white: 2 });
			});

			it('should find a total of 1 exact match', function() {
				expect(partialMatchResults.totalExactMatches).to.equal(1);
			});

			it('should find a total of 1 partial match', function() {
				expect(partialMatchResults.totalPartialMatches).to.equal(1);
			});
		});
	});

	describe('Player guesses: white, white, red, white', function() {
		var playerGuess = ['white','white','red','white'];

		describe('Find exact matches', function() {
			var exactMatchResults = mm.getExactMatches(playerGuess);

			it('should mark the first peg as an exact match', function() {
				expect(exactMatchResults.guessMatches).to.deep.equal([2, 0, 0, 0]);
			});

			it('should find a total of 1 white match', function() {
				expect(exactMatchResults.colourTotals).to.deep.equal({ white: 1 });
			});

			it('should find a total of 1 exact match', function() {
				expect(exactMatchResults.totalExactMatches).to.equal(1);
			});
		});

		describe('Find exact matches and partial matches', function() {
			var exactMatchResults = mm.getExactMatches(playerGuess),
				partialMatchResults = mm.getPartialMatches(exactMatchResults, playerGuess, colourTotals);

			it('should mark the second peg as a partial match', function() {
				expect(partialMatchResults.guessMatches).to.deep.equal([2, 1, 0, 0]);
			});

			it('should find a total of 2 white matches', function() {
				expect(partialMatchResults.colourTotals).to.deep.equal({ white: 2 });
			});

			it('should find a total of 1 exact match', function() {
				expect(partialMatchResults.totalExactMatches).to.equal(1);
			});

			it('should find a total of 1 partial match', function() {
				expect(partialMatchResults.totalPartialMatches).to.equal(1);
			});
		});
	});

	describe('Player guesses: white, white, white, white', function() {
		var playerGuess = ['white','white','white','white'];

		describe('Find exact matches', function() {
			var exactMatchResults = mm.getExactMatches(playerGuess);

			it('should mark the first peg as an exact match', function() {
				expect(exactMatchResults.guessMatches).to.deep.equal([2, 0, 2, 0]);
			});

			it('should find a total of 2 white matches', function() {
				expect(exactMatchResults.colourTotals).to.deep.equal({ white: 2 });
			});

			it('should find a total of 2 exact matches', function() {
				expect(exactMatchResults.totalExactMatches).to.equal(2);
			});
		});

		describe('Find exact matches and partial matches', function() {
			var exactMatchResults = mm.getExactMatches(playerGuess),
				partialMatchResults = mm.getPartialMatches(exactMatchResults, playerGuess, colourTotals);

			it('should not mark any pegs as a partial matches', function() {
				expect(partialMatchResults.guessMatches).to.deep.equal([2, 0, 2, 0]);
			});

			it('should find a total of 2 white matches', function() {
				expect(partialMatchResults.colourTotals).to.deep.equal({ white: 2 });
			});

			it('should find a total of 2 exact match', function() {
				expect(partialMatchResults.totalExactMatches).to.equal(2);
			});

			it('should find a total of 0 partial match', function() {
				expect(partialMatchResults.totalPartialMatches).to.equal(0);
			});
		});
	});
});
