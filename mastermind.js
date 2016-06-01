Mastermind = function(){
	// The colours available to choose from
	var _colours = ['red','blue','yellow','black','white','green'];

	// The code the player has to crack
	var _secretCode = [];

	// Maximum number of tries
	var _maxTries = 12;

	// Number of tries left
	var _triesLeft = 0;

	// The number of pegs that make up the code
	var _numberOfPegs = 4;
	
	// The number of colours that can be chosen from
	var _numberOfColours = 6;

	// Total number of each colour in the secret code
	var _colourTotals = {};

	/**
	 * Manually set the secret answer. Used for debugging.
	 * @param {Array} secretCode An array containing the secret code.
	 */
	this.setSecretCode = function(secretCode){
		_secretCode = secretCode;
	}
	
	/**
	 * Randomly generates the code.
	 * @private
	 */
	var _generateCode = function(){
		for (var i=0; i<_numberOfPegs; i++){
			_secretCode[i] = Math.floor(Math.random() * _numberOfColours);
		}
	}

	/**
	 * Reveals the code.
	 * @private
	 */
	var _revealCode = function(){
		for (var i=0; i<_numberOfPegs; i++){
			console.log(_colours[_secretCode[i]]);
		}
	};

	/**
	 * Takes the secret code and creates an object containing the total number
	 * of each colour in the secret code.
	 * @param  {Array}  secretCode An array containing the secret code.
	 * @return {Object} Object containing the total number of each colour in
	 *                  the secret code.
	 */
	this.getColourTotals = function(secretCode){
		var colourTotals = {};

		for (var i=0; i<_numberOfPegs; i++){
			colourTotals[secretCode[i]] = this.incrementColourTotal(colourTotals[secretCode[i]]);
		}

		return colourTotals;
	};

	/**
	 * Find how many exact matches of both colour and placement the player has
	 * guessed.
	 * @param codeGuess An array containing the player's guess.
	 * @returns {Array} An array containing the result of the guess.
	 */
	this.getExactMatches = function(codeGuess){
		var guessMatches = [],
			guessedColourTotals = {},
			totalExactMatches = 0;

		/**
		 * Loop through the secret code and the player's guess to find out how many
		 * of the pegs match perfectly.
		 */
		for (var i=0; i<_numberOfPegs; i++){
			if (codeGuess[i] === _secretCode[i]){
				guessMatches[i] = 2;
				totalExactMatches++;
				guessedColourTotals[_secretCode[i]] = this.incrementColourTotal(guessedColourTotals[_secretCode[i]]);
			} else {
				guessMatches[i] = 0;				
			}
		}

		return {
			guessMatches: guessMatches,
			colourTotals: guessedColourTotals,
			totalExactMatches: totalExactMatches
		};
	};

	/**
	 * Takes a colour total and increments it by 1.
	 * @param  {Number} currentColourTotal The current colour total.
	 * @return {Number}                    The new colour total.
	 */
	this.incrementColourTotal = function(currentColourTotal){
		return (typeof currentColourTotal === 'undefined') ? 1 : currentColourTotal+1;
	};

	/**
	 * Find how many exact matches of both colour and placement the player has
	 * guessed.
	 * @param {Object} currentResults Contains the current matches and the total of
	 *                                each colour found for this turn.
	 * @param {Array}  codeGuess      An array containing the player's guess.
	 * @param {Object} colourTotals   An object containing the total of each colour
	 *                                in the secret code.
	 * @return {Object} An object containing the matches and total of each colour
	 *                  found in this turn.
	 */
	this.getPartialMatches = function(currentResults, codeGuess, colourTotals){
		var guessMatches = currentResults.guessMatches,
			guessedColourTotals = currentResults.colourTotals;

		// Loop through the guesses
		for (var i=0; i<_numberOfPegs; i++){
			// Only check the guess if it was unsucessful in the previous loop.
			if (guessMatches[i] === 0){
				// console.log('second pass','A','i='+i,'_guessResult[i]='+guessResult[i]);
				// Loop through the secret code
				for (var c=0; c<_numberOfPegs; c++){
					if (guessMatches[c] === 0 && codeGuess[i] === _secretCode[c] && guessedColourTotals[_secretCode[c]] < colourTotals[_secretCode[c]]){
						guessMatches[i] = 1;
						guessedColourTotals[_secretCode[c]] = this.incrementColourTotal(guessedColourTotals[_secretCode[c]]);
						// console.log('second pass','B','i='+i,'c='+c,'codeGuess[i]='+codeGuess[i],'_secretCode[c]='+_secretCode[c],'guessResult[i]='+guessMatches[i]);
						break;
					}
				}
			}
		}

		return {
			guessMatches: guessMatches,
			colourTotals: guessedColourTotals,
			totalExactMatches: currentResults.totalExactMatches
		};
	};

	/**
	 * Process the player's guess.
	 * @param codeGuess An array containing the player's guess.
	 */
	this.guess = function(codeGuess){
		// Contains the result of the player's guess
		var guessResult = {};

		guessResult = this.getExactMatches(codeGuess);

		guessResult = this.getPartialMatches(guessResult, codeGuess, _colourTotals);

		// Tell the player how they did
		// console.log(guessResult);
		
		// Decrease the number of tries left
		if (--_triesLeft === 0){
			// Politely let the player know they suck!
			console.log('Sorry, you lost. Please try again.');
			// Show them what the code was.
			_revealCode();
		}
	}

	/**
	 * Start the game!
	 */
	this.start = function(){
		// Reset the number of tries left
		_triesLeft = _maxTries;
		// Generate the secret code
		_generateCode();

		_colourTotals = this.getColourTotals(_secretCode);
	}
}
