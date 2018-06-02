//need to so this in a command window
//SET PATH=C:\Program Files\Nodejs;%PATH%

//then, still in the command window, type 'node minesweeper.js'
//but make sure to be inside the minesweeper src path

//hardcode a blank minesweeper line
const blankLine = '  |   |  ';

console.log('This is what an empty board would look like:');
//display an empty 3 x 3 gameboard
console.log(blankLine);
console.log(blankLine);
console.log(blankLine);

//guessLine represents what the board will look like 
//when a player guesses by "clicking" (selecting) the 
//first square of this row.
const guessLine = '1 |   |  ';

//bombLine represents what the board will look like 
//when a player clicks and reveals a bomb (or 'mine').
const bombLine = '  | B |  ';

//display what board may look like during a game
console.log('This is what a board with a guess and a bomb on it would look like:');
console.log(guessLine);
console.log(bombLine);
console.log(blankLine);


