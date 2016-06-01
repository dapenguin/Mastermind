(function() {
	'use strict';

	var mm = new Mastermind();

	describe('A game where the chosen code is: white, blue, white, blue', function() {
		var secretCode = ['white','blue','white','blue'],
			colourTotals = mm.getColourTotals(secretCode),
			guessResults;

		mm.setSecretCode(secretCode);

		// beforeEach(function(){
		// });

		it('should have a total of 2 whites and 2 blues in the secret code', function(){
			expect(colourTotals).toEqual({white:2,blue:2});
		});

		describe('Player guesses: white, red, red, white', function() {
			var playerGuess = ['white','red','red','white'];

			it('should find 1 exact match', function() {
				guessResults = mm.getExactMatches(playerGuess);
				
				expect(guessResults.guessMatches).toEqual([2,0,0,0]);
			});

			it('should find 1 white match', function() {
				guessResults = mm.getExactMatches(playerGuess);
				
				expect(guessResults.colourTotals).toEqual({white:1});
			});

			it('should find 1 partial match', function() {
				guessResults = mm.getPartialMatches(guessResults, playerGuess, colourTotals);
				
				expect(guessResults.guessMatches).toEqual([2,0,0,1]);
			});
		});

		describe('Player guesses: white, white, red, white', function() {
			var playerGuess = ['white','white','red','white'];

			it('should find 1 exact match', function() {
				guessResults = mm.getExactMatches(playerGuess);
				
				expect(guessResults.guessMatches).toEqual([2,0,0,0]);
			});

			it('should find 1 white match', function() {
				guessResults = mm.getExactMatches(playerGuess);
				
				expect(guessResults.colourTotals).toEqual({white:1});
			});

			it('should only find 1 partial match', function() {
				guessResults = mm.getPartialMatches(guessResults, playerGuess, colourTotals);
				
				expect(guessResults.guessMatches).toEqual([2,1,0,0]);
			});
		});
	});
})();
