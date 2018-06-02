//minesweeper version 5  20180507 
/*https:
www.codecademy.com/courses/minesweeper/projects/terminal-minesweeper?program_content_id=7ff0afcf31a3ba2006ab3a99ebec1338&program_id=7a14cd6a79149641a80c7f6396a160ab
*/

// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

//creating modules for Part 6
/* The code in game.js won't function properly if it can't access the Board class, so you'll have to import it into game.js.
Place your cursor on line 1 of game.js and press "Enter" (or "Return") on your keyboard a few times to give you some space.
On line one, import the Board class from the board.js file.
*/
import { Board } from './board';

class Game {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		/*To call Board methods, create an instance of a Board inside 
		of the Game constructor. Create an instance property called _board */
		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
	}

	/*.playMove() will include all of the functionality needed to play a 
	session of Minesweeper, including flipping a tile, letting the user 
	know if they discovered a bomb, and allowing a user to continue 
	otherwise (until they win, or lose).*/
	playMove(rowIndex,columnIndex){
		this._board.flipTile(rowIndex,columnIndex);
		console.log('playing ['+ rowIndex+']['+columnIndex +']');
		/*	logic that determines what should happen after a player flips a tile. Here's an overview of how the logic should work:
			If the flipped tile has a bomb, the game is over
			Else, if the board does not have any safe tiles left, the 
			player has won the game
			Otherwise, the player should be allowed to continue playing */
		if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
			/*If there is a bomb, the game is over! */
			console.log('Game over');
			this._board.print();
		} else if ( !this._board.hasSafeTiles() ) {
				/*	if a board doesn't have any safe tiles left on it, 
					then the user has won.*/
				console.log('You win!');
				this._board.print();
			} else {
				/*unless a player has flipped a bomb or won the game, the 
				user should be allowed to continue playing.*/
				console.log('Current board: ');
				this._board.print();
			}		
	} //end of playMove method
} //end Game class

/*
Below is a list of some potential features to add to your Minesweeper game:

Add validation to ensure that board dimensions make sense. For example, a board should not be able to be created with more bombs than it has tiles.
Add a timer which lets players know how long it took them to win (or lose).
Add recursive flipping, when a tile is flipped that isn't touching a bomb (would have the number zero printed on it), all adjacent tiles additionally flip over.
Add a method to place flags at a tile instead of flipping that tile. If a square has a flag on it, it can't be flipped over.
*/