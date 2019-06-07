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



window.findNRooksSolution = function(n, board) {
  if (n === 1) {
    var oneBoard = new Board({'n':1});
    oneBoard.togglePiece(0,0);
    return oneBoard.rows();
  }
  var firstBoard = new Board({'n': n});
  board = board || firstBoard;
  function sumRows(childBoard) {
    var sum = 0;
    for (var i=0; i<n; i++) {
      sum = sum + childBoard.get(i).reduce(function (acc, curVal) {
        return acc + curVal;
      })
    }
    return sum;
  }
  function rowToggler(board) {
    var rows = board.rows();
    for (var i=0; i<rows.length; i++) {
      for (var j=0; j<rows.length; j++) {
        if (rows[i][j] === 0) {
          board.togglePiece(i,j);
          break;
        }
      }
    }
  }
  //populating array with boards
  var totalLength = n*n;
  while (board._changes.length < totalLength) {
    //put n*n number of empty boards in _changes array
    // var newBoard = new Board({'n': n});
    var newBoard = board.clone();
    board._changes.push(newBoard);
  }

  for (var i=0; i<board._changes.length; i++) {
    rowToggler(board._changes[i]);
  }


    for (var i=0; i<board._changes.length; i++) {
      if ((board._changes[i].hasAnyRowConflicts()) || (board._changes[i].hasAnyColConflicts())) {
        board._changes.splice(i,1);
      }
      
      if (sumRows(board._changes[i]) === n) {
        debugger;
        var solution = board._changes[i].rows();
        console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
        return solution;
      }
    }
    for (var i=0; i<board._changes.length; i++) {
      return findNRooksSolution(n, board._changes[i]);
    }
    return findNRooksSolution(n);
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
