'use strict';

//minesweeper version 3  20180429

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
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
	var board = [];
	for (var i = 0; i < numberOfRows; i++) {
		var row = []; //represents a single row to be added to the board
		for (var j = 0; j < numberOfColumns; j++) {
			row.push(' ');
		}
		board.push(row); //push the newly-created row into the board array.
	}
	return board;
};

//********************************************************************
/*generateBombBoard(), when called, will accept three arguments: a specified number of rows, columns, and bombs.
The function should:
Create the game board of the specified size
Add bombs to random squares on the game board
For example, generateBombBoard(5, 9, 14) would result in a 5 x 9 game board (45 total squares) with 14 bombs placed randomly on the board.*/
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
	var board = [];
	for (var i = 0; i < numberOfRows; i++) {
		var row = []; //represents a single row to be added to the board
		for (var j = 0; j < numberOfColumns; j++) {
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
};

//********************************************************************
/*one of the main pieces of Minesweeper functionality: 
displaying the number of bombs adjacent to the flipped tile.

The function will determine the size of the game board
The function will use the location of the flipped tile
Using an array index offset system, the function will check all adjacent tiles for bombs
If a bomb exists at an adjacent tile, you'll record it by incrementing a bomb counter
The number of bombs adjacent to the flipped tile will be returned by the function*/
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
	/*
 A flipped tile can have 8 possible neighbors, at most, no matter the 
 size of a board:
  a | b | c 	 -1,1 | -1,0 | -1,1 
  d | + | e	 0,-1 |   +  | 0 ,1
  f | g | h	 1,-1 | 1, 0 | 1,1
 In the example above, the + represents a flipped tile. 
 The letters surrounding it represent adjacent neighbors.
 */
	//new array helps check adjacent tiles for bombs
	var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

	var numberOfRows = bombBoard.length; //height of board

	//The first element is a row, and the number of entries 
	//in a row represents the total number of columns.
	var numberOfColumns = bombBoard[0].length; //width of board
	var numberOfBombs = 0; //store number of bombs adjacent to a flipped tile

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
		var neighborColumnIndex = columnIndex + offset[0];

		/*check if the row and column indices for neighboring tiles are 
  valid (for example, don't need to check the tiles that are 
  "off the grid" and therefore don't exist). 	*/
		if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
			/*check if the tile at those indices (on the bombBoard) 
   	already contains a bomb ('B').*/
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
				numberOfBombs++; //found a bomb nearby
			}
		}
	});
	return numberOfBombs;
}; //end of getNumberOfNeighborBombs function


//********************************************************************
/*The goal of flipTile() is to allow the player to flip a tile 
and to update that tile accordingly. The function should explicitly 
check for two things:

If the specified tile has already been flipped
If the specified tile has a bomb in it

Otherwise, that tile should be updated with the number of 
neighboring bombs. Let's begin.
*/
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
	//check if tile is not empty (already been flipped)
	if (playerBoard[rowIndex][columnIndex] !== ' ') {
		console.log('This tile has already been flipped!');
		return;
	} //check if there is a bomb at that tile
	else if (bombBoard[rowIndex][columnIndex] === 'B') {
			playerBoard[rowIndex][columnIndex] = 'B'; //put the bomb on player board
		} else {
			/*access the specified tile on playerBoard. 
   Set it equal to calling getNumberOfNeighborBombs with bombBoard, 
   rowIndex, and columnIndex as arguments*/
			playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
		}
}; //end of flipTile function


//********************************************************************
var printBoard = function printBoard(board) {
	console.log(board.map(function (row) {
		return row.join('|');
	}).join('\n'));
};

var playerBoard = generatePlayerBoard(4, 4);
var bombBoard = generateBombBoard(4, 4, 3);

console.log('Player board: ');
printBoard(playerBoard);
console.log('Bomb board: ');

// bombBoard will sometimes have less bombs than specified due to the previously-mentioned missing code.
// Additionally, printing bombBoard will not look clean due to use of null instead of ' ' - this should just be for debugging, not presentation.
printBoard(bombBoard);

//flip the tile at location [0.0] on the playerBoard
//and check for bombs at that location
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);