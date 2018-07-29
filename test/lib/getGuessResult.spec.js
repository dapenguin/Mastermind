const { expect } = require('chai');
const getGuessResult = require('../../lib/getGuessResult');

describe('getGuessResult()', () => {
	describe('when the player is not on their last try', () => {
		const secretCode = ['red','blue','white','red'];
		const playerGuess = ['green','red','white','blue'];
		const colourTotals = {
			red: 2,
			blue: 1,
			white: 1
		};

		const triesLeft = 2;

		const guessResults = getGuessResult(playerGuess, 4, secretCode, colourTotals, triesLeft);

		it('should return the total number of exact matches', () => {
			expect(guessResults).to.have.property('totalExactMatches');
			expect(guessResults.totalExactMatches).to.be.a('number');
			expect(guessResults.totalExactMatches).to.equal(1);
		});

		it('should return the total number of partial matches', () => {
			expect(guessResults).to.have.property('totalPartialMatches');
			expect(guessResults.totalPartialMatches).to.be.a('number');
			expect(guessResults.totalPartialMatches).to.equal(2);
		});
	});

	describe('when the player is on their last try and guesses incorrectly', () => {
		const secretCode = ['red','blue','white','red'];
		const playerGuess = ['green','red','white','blue'];
		const colourTotals = {
			red: 2,
			blue: 1,
			white: 1
		};

		const triesLeft = 0;

		const guessResults = getGuessResult(playerGuess, 4, secretCode, colourTotals, triesLeft);

		it('should flag the game as being over', () => {
			expect(guessResults.gameOver).to.be.true;
		});
	});

	describe('when the player correctly guesses the code', () => {
		const secretCode = ['red','blue','white','red'];
		const playerGuess = ['red','blue','white','red'];
		const colourTotals = {
			red: 2,
			blue: 1,
			white: 1
		};
		const triesLeft = 1;
		const guessResults = getGuessResult(playerGuess, 4, secretCode, colourTotals, triesLeft);

		it('should flag the player as a winner in the result', () => {
			expect(guessResults.winner).to.be.true;
		});
	});
});
