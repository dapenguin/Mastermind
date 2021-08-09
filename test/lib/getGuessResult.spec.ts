import { expect } from 'chai';

import { getGuessResult } from '../../lib/getGuessResult';

describe('getGuessResult()', () => {
	const secretCode = [0, 1, 2, 0];
	const pegValueTotals = [2, 1, 1];

	describe('when the player is not on their last try', () => {
		const playerGuess = [3, 0, 2, 1];
		const triesLeft = 2;
		const guessResults = getGuessResult(
			playerGuess,
			4,
			secretCode,
			pegValueTotals,
			triesLeft
		);

		it('should return the total number of exact matches', () => {
			expect(guessResults.totalExactMatches).to.equal(1);
		});

		it('should return the total number of partial matches', () => {
			expect(guessResults.totalPartialMatches).to.equal(2);
		});
	});

	describe('when the player is on their last try and guesses incorrectly', () => {
		const playerGuess = [3, 0, 2, 1];
		const triesLeft = 0;
		const guessResults = getGuessResult(
			playerGuess,
			4,
			secretCode,
			pegValueTotals,
			triesLeft
		);

		it('should flag the game as being over', () => {
			expect(guessResults.gameOver).to.be.true;
		});
	});

	describe('when the player correctly guesses the code', () => {
		const playerGuess = [0, 1, 2, 0];
		const triesLeft = 1;
		const guessResults = getGuessResult(
			playerGuess,
			4,
			secretCode,
			pegValueTotals,
			triesLeft
		);

		it('should flag the player as a winner in the result', () => {
			expect(guessResults.winner).to.be.true;
		});
	});
});
