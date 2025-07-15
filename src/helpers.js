export default function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    //console.log(lines[i]); // we are just logging the lines array
    //console.log(i); // this is the index of the current line
    //console.log(lines[i][0]); // this is the first element of the current line
    //console.log(lines[i][1]); // this is the second element of the current line

    //! we loop thru starting with lines[0]
    //! When i = 0, lines[i] is [0, 1, 2]
    //! When i = 1, lines[i] is [3, 4, 5] etc..

    const [a, b, c] = lines[i]; // this is destructuring the array and essentially assigning the values of a, b and c to the first, second and third elements of the sub/nested arrays respectively
    //console.log({ a, b, c });
    if (
      squares[a] && // check if the square is not null
      squares[a] === squares[b] &&
      squares[a] === squares[c] // if these are the same then we have a winner
    ) {
      return squares[a]; //or we could have put squares[b] or squares[c] here - it's the same as they will all be either X's or O's
    }
  }
  return null; // this is like saying else - because we didn't find a winner
}

const squares = ["X", "O", "X", "O", "X", "X", null, null, null]; // Example squares array to test the function
//console.log(squares);
//console.log(calculateWinner(squares)); // This will log the winner if there is one, or null if there isn't
