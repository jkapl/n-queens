// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var sum = this.attributes[rowIndex].reduce(function(acc, curVal) {
        return acc + curVal;
      });
      if (sum > 1) {
        return true
      }
      return false
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i=0; i<4; i++) {
        if (this.hasRowConflictAt(i)) {
          return true
        }
      }
      return false;

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //initialize sum variable to 0
      var board = this.attributes;
      var sum = 0;
      //iterate through properties (rows) of board object
      for (var row in board) {
        //check each property value at specified index
        sum = sum + board[row][colIndex];
        if (sum > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      /*
      iterating through length of property value if board
        run has col conflict on each index
        if result of hasColConflict as is true
          return true
      return false
      */
     var length = this.attributes.n
      for (var i = 0; i < length; i++) {
        var result = this.hasColConflictAt(i);
        if (result) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //initialize sum variable to 0
      var sum = 0;
      var n = this.attributes.n;
      // store abs(argument) in variable called colIndex 
      var colIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      // if majorDiagonalColumnIndexAtFirstRow is positive or 0
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        for (var i=0; i< n-colIndex; i++) {
          sum = sum + this.get(i)[i + colIndex];
          if (sum > 1) {
            return true;
        //  length of loop is equal to this.attributes.n(4) - colIndex(2)
        //  add value of this.get(i)[i + colInd] to sum
        // if sum greater than 1
          // return true
          }  
        }
      } else {
        for (var i=0; i<n-colIndex; i++) {
          sum = sum + this.get(colIndex + i)[i]
          if (sum > 1) {
            return true;
          }
        }
      }  
          // length of loop is equal to this.attributes.n(4) - colIndex(2)
          //  add value of this.get(i)[i] to sum
          //if sum greater than 1
          //   return true
      return false; // fixme
    },
    

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.get('n');
      var loopLength = (n*2)-1;
      var startIndex = n-1;
      for (var i=0; i<loopLength; i++) {
        var result = this.hasMajorDiagonalConflictAt(startIndex - i);
        if (result) {
          return true;
        }
      }
      /*
      declare a variable called loopLength storing (n*2) -1
      declare a variable called startingIndex (this.attributes.n)-1
      iterate loopLength times
        store variable result of calling hasMajorDiagonalConflictAt(startingIndex - i)
        if variable is true
          return true
      */
      return false; // fixme
    },
    /*
    initialize sum variable to 0
    loop over each row *use get method, this.get(i);*, the number of iterations will be equal to this.attributes.n - majorDiagonalColumnIndexAtFirstRow
      
     */



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //declare a variable sum = 0
      var sum = 0;
      //declare a variable rowToStart
      var rowToStart = 0;
      //declare a variable colToStart
      var colToStart;
      var loopLength;
      //if minorDiagonalColumnIndexAtFirstRow is less than this.attributes.n
      if (minorDiagonalColumnIndexAtFirstRow < this.get('n')) {
        //declare a variable looplength that is equal to (minorDiagonalColumnIndexAtFirstRow +1)
        loopLength = minorDiagonalColumnIndexAtFirstRow + 1;
      } else {
        //else declare a variable looplength that is equal to n- ((minorDiagonalColumnIndexAtFirstRow - n) +1)
        loopLength = this.get('n')-((minorDiagonalColumnIndexAtFirstRow - this.get('n')) +1);
      }
      if (minorDiagonalColumnIndexAtFirstRow < this.get('n')) {
        //if minorDiagonalColumnIndexAtFirstRow is less than this.attributes.n, rowToStart = 0, colToStart is = minorDiagonalColumnIndexAtFirstRow
        rowToStart = 0;
        colToStart = minorDiagonalColumnIndexAtFirstRow;
      } else {
        //else rowToStart = 1 + (minorDiagonalColumnIndexAtFirstRow - this.attributes.n), colToStart is = this.attributes.n-1
        rowToStart = 1 + (minorDiagonalColumnIndexAtFirstRow - this.get('n'));
        colToStart = this.get('n')-1;
      }
        //for loop starting at 0 and ending at i<looplength
        //sum = sum + this.get(rowToStart+i)[colToStart-i]
        //if sum > 1
        //return true
      for (var i=0; i<loopLength; i++) {
        sum = sum + this.get(rowToStart + i)[colToStart - i];
        if (sum > 1) {
          return true
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //var argument = 0;
      var argument = 0;
      //var looplength = (n*2)-2
      var loopLength = (this.get('n')*2)-1;
      //for loop to looplength
      for (var i=0; i<loopLength; i++) {
        //var result = call hasMinorDiagonalConflictAt(argument + i)
        var result = this.hasMinorDiagonalConflictAt(argument + i);
        if (result) {
          return true;
        }
      }
        
        //if result is true
        // return true
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };


}());
