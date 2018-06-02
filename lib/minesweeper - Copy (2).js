'use strict';

//minesweeper version 2  20180424

var board = []; //empty array

//Add three empty arrays to the board array.
board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

//console.log(board);

//Set printBoard equal to an arrow function. 
//The arrow function should accept one parameter called board.
var printBoard = function printBoard(board) {
	console.log('Current Board:');
	//add a line that logs the first element of board to the console.
	//console.log(board[0]);
	console.log(board[0].join(' | '));
	console.log(board[1].join(' | '));
	console.log(board[2].join(' | '));
};

printBoard(board);
//access the first nested array (row) and set its 
//second element to '1'. This represents a player's guess.
board[0][1] = '1';
//access the third nested array (row) and set its 
//third element to B. This will represent a bomb on the board.
board[2][2] = 'B';
//use printBoard() to print board once again.
printBoard(board);