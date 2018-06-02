'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//minesweeper version 5  20180507 
/*https:
www.codecademy.com/courses/minesweeper/projects/terminal-minesweeper?program_content_id=7ff0afcf31a3ba2006ab3a99ebec1338&program_id=7a14cd6a79149641a80c7f6396a160ab
*/

//creating modules for Part 6

/*The contents of board.js will be used in a file we'll create shortly. In order for this code to be usable, or imported, into that new file, we'll have to export the Board class.
Add export to the beginning of line 1 of board.js */
var Board = exports.Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		this._numberOfBombs = numberOfBombs;

		/*This _numberOfTiles instance property represents the size of the game board and is used to determine if the game is over or not at the end of each turn.*/
		this._numberOfTiles = numberOfRows * numberOfColumns;
		// instance properties to craete the boards
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	//getter method


	_createClass(Board, [{
		key: 'flipTile',

		//********************************************************************
		/*The goal of flipTile() is to allow the player to flip a tile 
  and to update that tile accordingly. The function should explicitly 
  check for two things:
  
  If the specified tile has already been flipped
  If the specified tile has a bomb in it
  
  Otherwise, that tile should be updated with the number of 
  neighboring bombs. Let's begin.
  */
		value: function flipTile(rowIndex, columnIndex) {
			//check if tile is not empty (already been flipped)
			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
				console.log('This tile has already been flipped!');
				return;
			}

			//check if there is a bomb at that tile
			if (this._bombBoard[rowIndex][columnIndex] === 'B') {
				//put the bomb on player board
				this._playerBoard[rowIndex][columnIndex] = 'B';
			} else {
				/*access the specified tile on playerBoard. 
    Set it equal to calling getNumberOfNeighborBombs with bombBoard, rowIndex, and columnIndex as arguments*/
				this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
			}
			//decrease the numberOfTiles instance property by 1.
			this._numberOfTiles--;
		}
	}, {
		key: 'getNumberOfNeighborBombs',
		//end of flipTile function

		//********************************************************************
		/*one of the main pieces of Minesweeper functionality: 
  displaying the number of bombs adjacent to the flipped tile.
  The function will determine the size of the game board
  The function will use the location of the flipped tile
  Using an array index offset system, the function will check all adjacent tiles for bombs
  If a bomb exists at an adjacent tile, you'll record it by incrementing a bomb counter
  The number of bombs adjacent to the flipped tile will be returned by the function*/
		value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
			var _this = this;

			/* 	A flipped tile can have 8 possible neighbors, at most, no matter the 
   size of a board:
    a | b | c 	 -1,1 | -1,0 | -1,1 
    d | + | e	 0,-1 |   +  | 0 ,1
    f | g | h	 1,-1 | 1, 0 | 1,1
   In the example above, the + represents a flipped tile. 
   The letters surrounding it represent adjacent neighbors.*/

			//new array helps check adjacent tiles for bombs
			var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

			//height of board						
			var numberOfRows = this._bombBoard.length;

			//The first element is a row, and the number of entries 
			//in a row represents the total number of columns.
			var numberOfColumns = this._bombBoard[0].length; //width of board

			//store number of bombs adjacent to a flipped tile
			var numberOfBombs = 0;

			/*Grab the row and column indices of the tile that a user specifies (say they input 0, 2, we'll have to use that to check for bombs around the tile in the first row and third column)
   Check all possible neighboring tiles around the indicated tile
   If a neighboring tile has a bomb, increment the bomb counter	*/

			/*TEMPLATE:
   const function = () => {
     // Code to execute
     array.forEach(parameter => {
   	// Code to execute 
     });    
     return value;
   };*/
			neighborOffsets.forEach(function (offset) {
				//'offset' represents a nested array in neighborOffsets
				var neighborRowIndex = rowIndex + offset[0];
				var neighborColumnIndex = columnIndex + offset[1];

				/*check if the row and column indices for neighboring tiles are 
    valid (for example, don't need to check the tiles that are 
    "off the grid" and therefore don't exist). 	*/
				if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
					/*check if the tile at those indices (on the bombBoard) 
     	already contains a bomb ('B').*/
					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
						//found a bomb nearby
						numberOfBombs++;
					}
				}
			});
			return numberOfBombs;
		} //end of getNumberOfNeighborBombs function

		//method to determine a win
		/*	A user will win if and only if all of the non-bomb tiles have been flipped.
  	In other words, a user wins when there are no non-bomb ("safe") tiles remaining to be flipped.*/

	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			return this._numberOfTiles !== this._numberOfBombs;
		}
	}, {
		key: 'hasNonBombEmptySpaces',
		value: function hasNonBombEmptySpaces() {
			return this._numberOfEmptySpaces !== this._numberOfBombs;
		}
	}, {
		key: 'print',
		value: function print() {
			console.log(this._playerBoard.map(function (row) {
				return row.join(' | ');
			}).join('\n'));
			console.log('Shhh. Bombs are here:');
			console.log(this._bombBoard.map(function (row) {
				return row.join(' ! ');
			}).join('\n'));
			console.log('*****************************');
		}

		//********************************************************************
		/*generatePlayerBoard(), when called, will accept two arguments: 
  the number of rows and number of columns.
  The function should:
  Add an empty space (' ') to each column in every row
  Add each row to to a larger game board, thereby constructing the player's board
  
  For example, generatePlayerBoard(2, 3) would result in a game board 
  that looks like the following:
  [
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ]
  This example generated a board with two rows and three columns. */

	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}, {
		key: 'bombBoard',
		get: function get() {
			return this._bombBoard;
		}
	}], [{
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
			var board = [];
			for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
				var row = []; //represents a single row to be added to the board
				for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
					row.push(' ');
				}
				board.push(row); //push the newly-created row into the board array.
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',


		//********************************************************************
		/*generateBombBoard(), when called, will accept three arguments: a specified number of rows, columns, and bombs.
  The function should:
  Create the game board of the specified size
  Add bombs to random squares on the game board
  For example, generateBombBoard(5, 9, 14) would result in a 5 x 9 game board (45 total squares) with 14 bombs placed randomly on the board.*/
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			var board = [];

			for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
				var row = []; //represents a single row to be added to the board
				for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
					row.push(' ');
				}
				board.push(row); //push the newly-created row into the board array.
			}

			//generate some bombs
			var numberOfBombsPlaced = 0; //bomb counter

			//Once numberOfBombsPlaced reaches the numberOfBombs specified, 
			//stop adding bombs to the board. 20180430 But it doesn't check to see if there
			//is already a bomb in the location it is placing one
			while (numberOfBombsPlaced < numberOfBombs) {
				// This code has the potential to place bombs on top of bombs, this will be fixed with control flow.
				var randomRowIndex = Math.floor(Math.random() * numberOfRows);
				var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
				//20180503 Check if a bomb is already placed in that location
				if (board[randomRowIndex][randomColumnIndex] !== 'B') {
					board[randomRowIndex][randomColumnIndex] = 'B';
					numberOfBombsPlaced++;
				}
			}

			return board;
		}
	}]);

	return Board;
}(); //end Board class