/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  //base case - no more spaces to put rooks
  //base case - n rooks have been placed
    // solution = board where n rooks are placed
  //make a new board
  var firstBoard = new this.Board({'n':n});
  var recursiveRookHelper = function (arrayOfBoards) {
    for (var i=0; i<arrayOfBoards.length; i++) {
      arrayOfBoards.findNRooksSolution(n);
    }
  }
  //summing rows
  function sumRows(board) {
    var sum = 0;
    sum = board.get(0).reduce((acc,curVal) => acc + curVal) +
    board.get(1).reduce((acc,curVal) => acc + curVal) +
    board.get(2).reduce((acc,curVal) => acc + curVal) +
    board.get(3).reduce((acc,curVal) => acc + curVal);
    return sum
  }
  //populating array with boards
  while (firstBoard._changes.length < n*n) {
    //put n*n number of empty boards in _changes array
    var newBoard = new this.Board({'n':n});
    firstBoard._changes.push(newBoard);
  }
  //loop through and toggle all boards in _changes array
  var count = 0;
    for (var j=0; j<4; j++) {
      for (var k=0; k<4; k++) {
        //toggle each spot
        firstBoard._changes[count].togglePiece(j,k);
        count++
        recursiveRookHelper(firstBoard._changes);
        //run checks
        // testFunction(firstBoard._changes[count])
        //check number of rooks placed
        if (sumRows(firstBoard._changes[count]) === n) {
          solution = firstBoard._changes[count];
        }
      }
    }

  // var testFunction = function (board) {
  //   if ((board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {

  //   }
  // }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
