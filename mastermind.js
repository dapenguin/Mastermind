const Mastermind = function() {
	// Constants
	const _MATCHES_NONE_ = 0;
	const _MATCHES_PARTIAL_ = 1;
	const _MATCHES_EXACT_ = 2;

	// The colours available to choose from
	const _colours = ['red','blue','yellow','black','white','green'];

	// The code the player has to crack
	let _secretCode = [];

	// Maximum number of tries
	const _maxTries = 12;

	// Number of tries left
	let _triesLeft = 0;

	// The number of pegs that make up the code
	const _numberOfPegs = 4;

	// The number of colours that can be chosen from
	const _numberOfColours = 6;

	// Total number of each colour in the secret code
	let _colourTotals = {};

	/**
	 * Manually set the secret answer. Used for debugging.
	 * @param {Array} secretCode An array containing the secret code.
	 */
	this.setSecretCode = (secretCode) => {
		_secretCode = secretCode;
	};

	/**
	 * Randomly generates the code.
	 * @private
	 */
	const _generateCode = () => {
		for (let i=0; i<_numberOfPegs; i++){
			_secretCode[i] = Math.floor(Math.random() * _numberOfColours);
		}
	};

	/**
	 * Reveals the code.
	 * @private
	 */
	const _revealCode = () => {
		for (let i=0; i<_numberOfPegs; i++){
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
	this.getColourTotals = (secretCode) => {
		const colourTotals = {};

		for (let i=0; i<_numberOfPegs; i++){
			colourTotals[secretCode[i]] = this.incrementColourTotal(colourTotals[secretCode[i]]);
		}

		return colourTotals;
	};

	/**
	 * Find how many exact matches of both colour and placement the player has
	 * guessed.
	 * @param  {Array}  codeGuess An array containing the player's guess.
	 * @return {Object}           An object containing the matches, total of each
	 *                            colour, and total exact matches found in this turn.
	 */
	this.getExactMatches = (codeGuess) => {
		const guessMatches = [];
		const guessedColourTotals = {};
		let totalExactMatches = 0;

		/**
		 * Loop through the secret code and the player's guess to find out how many
		 * of the pegs match perfectly.
		 */
		for (let i=0; i<_numberOfPegs; i++){
			if (codeGuess[i] === _secretCode[i]){
				guessMatches[i] = _MATCHES_EXACT_;
				totalExactMatches++;
				guessedColourTotals[_secretCode[i]] = this.incrementColourTotal(guessedColourTotals[_secretCode[i]]);
			} else {
				guessMatches[i] = _MATCHES_NONE_;
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
	this.incrementColourTotal = (currentColourTotal) => {
		return (typeof currentColourTotal === 'undefined') ? 1 : currentColourTotal+1;
	};

	/**
	 * Find how many matches of colour, but not placement the player has guessed.
	 * @param  {Object} exactMatchResults Contains the exact matches and the total of
	 *                                    each colour found for this turn.
	 * @param  {Array}  codeGuess         An array containing the player's guess.
	 * @param  {Object} colourTotals      An object containing the total of each colour
	 *                                    in the secret code.
	 * @return {Object} An object containing the matches, total of each colour, total
	 *                  exact matches, and total partial matches found in this turn.
	 */
	this.getPartialMatches = (exactMatchResults, codeGuess, colourTotals) => {
		const guessMatches = exactMatchResults.guessMatches;
		const guessedColourTotals = exactMatchResults.colourTotals;
		let totalPartialMatches = 0;

		// Loop through the guesses
		for (let i=0; i<_numberOfPegs; i++){
			// Only check the guess if it was unsucessful in the previous loop.
			if (guessMatches[i] === _MATCHES_NONE_){
				// Loop through the secret code
				for (let c=0; c<_numberOfPegs; c++){
					if (guessMatches[c] === _MATCHES_NONE_ && codeGuess[i] === _secretCode[c] && guessedColourTotals[_secretCode[c]] < colourTotals[_secretCode[c]]){
						guessMatches[i] = _MATCHES_PARTIAL_;
						totalPartialMatches++;
						guessedColourTotals[_secretCode[c]] = this.incrementColourTotal(guessedColourTotals[_secretCode[c]]);
						break;
					}
				}
			}
		}

		return {
			guessMatches: guessMatches,
			colourTotals: guessedColourTotals,
			totalExactMatches: exactMatchResults.totalExactMatches,
			totalPartialMatches: totalPartialMatches
		};
	};

	/**
	 * Process the player's guess.
	 * @param codeGuess An array containing the player's guess.
	 * @returns {Object} Object containing the results of the player's guess.
	 */
	this.guess = (codeGuess) => {
		// Contains the result of the player's guess
		let guessResult = this.getExactMatches(codeGuess);

		if (guessResult.totalExactMatches === _numberOfPegs) {
			guessResult.winner = true;
		} else {
			guessResult = this.getPartialMatches(guessResult, codeGuess, _colourTotals);

			// Decrease the number of tries left
			if (--_triesLeft === 0){
				// Politely let the player know they suck!
				console.log('Sorry, you lost. Please try again.');
				// Show them what the code was.
				// _revealCode();
				guessResult.gameOver = true;
			}
		}

		return guessResult;
	};

	/**
	 * Returns the number of tries the player has left to guess the code.
	 * @return {Number} The number of tries the player has left.
	 */
	this.getTriesLeft = () => {
		return _triesLeft;
	};

	/**
	 * Start the game!
	 */
	this.start = () => {
		// Reset the number of tries left
		_triesLeft = _maxTries;
		// Generate the secret code
		_generateCode();

		_colourTotals = this.getColourTotals(_secretCode);
	};
};

module.exports = Mastermind;
