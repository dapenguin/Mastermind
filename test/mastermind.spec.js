const { expect } = require('chai');

const Mastermind = require('../mastermind');

describe('Creating a new game', () => {
	const mm = new Mastermind();
	mm.start();

	it('should generate a code consisting of 4 pegs', () => {
		const code = mm.getSecretCode();
		expect(code.length).to.equal(4);
	});

	it('should set the number of tries left to 12', () => {
		const triesLeft = mm.getTriesLeft();
		expect(triesLeft).to.equal(12);
	});
});

describe('A game where the provided code is: white, blue, white, blue', () => {
	const mm = new Mastermind();
	const secretCode = ['white','blue','white','blue'];

	mm.start(secretCode);

	describe('At the start of the game', () => {
		const triesLeft = mm.getTriesLeft();

		it('should set the number of tries left to 12', () => {
			expect(triesLeft).to.equal(12);
		});
	});

	describe('Player guesses: white, red, red, white', () => {
		const playerGuess = ['white','red','red','white'];
		const guessResults = mm.guess(playerGuess);
		const triesLeft = mm.getTriesLeft();

		it('should find a total of 1 exact match', () => {
			expect(guessResults.totalExactMatches).to.equal(1);
		});

		it('should find a total of 1 partial match', () => {
			expect(guessResults.totalPartialMatches).to.equal(1);
		});

		it('should set the number of tries left to 11', () => {
			expect(triesLeft).to.equal(11);
		});
	});

	describe('Player guesses: white, white, red, white', () => {
		const playerGuess = ['white','white','red','white'];
		const guessResults = mm.guess(playerGuess);
		const triesLeft = mm.getTriesLeft();

		it('should find a total of 1 exact match', () => {
			expect(guessResults.totalExactMatches).to.equal(1);
		});

		it('should find a total of 1 partial match', () => {
			expect(guessResults.totalPartialMatches).to.equal(1);
		});

		it('should set the number of tries left to 10', () => {
			expect(triesLeft).to.equal(10);
		});
	});

	describe('Player guesses: white, white, white, white', () => {
		const playerGuess = ['white','white','white','white'];
		const guessResults = mm.guess(playerGuess);
		const triesLeft = mm.getTriesLeft();

		it('should find a total of 2 exact match', () => {
			expect(guessResults.totalExactMatches).to.equal(2);
		});

		it('should find a total of 0 partial match', () => {
			expect(guessResults.totalPartialMatches).to.equal(0);
		});

		it('should set the number of tries left to 9', () => {
			expect(triesLeft).to.equal(9);
		});
	});
});
