import { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [board, setboard] = useState(Array(9).fill(null))
  const [xturn,setxturn]=useState(true)
  const winningcondition=[
    [0,4,8],[2,4,6],[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]
  ]
  const [winner,setwinner]=useState(null)
 const checkwin=(board)=>{
  for(let condition of winningcondition){
    const[a,b,c]=condition;
         if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a]; // returns 'X' or '0'
      }
      return null;
    }
 }
  const handleClick=(index)=>{
    if (board[index]===null && xturn===true){
      board[index]="X"
      setboard(board)
      const newboard=[...board]
      const gamewinner=checkwin(newboard)
      setwinner(gamewinner)
      setxturn(false)
    }
    if (board[index]===null && xturn===false){
      board[index]="0"
      setboard(board)
      const newboard=[...board]
      const gamewinner=checkwin(newboard)
      setwinner(gamewinner)
      setxturn(true)
    }
    if(!board.includes(null)){
      setwinner("Draw")
    }
  }
  const resetGame=()=>{
    setboard(Array(9).fill(null))
    setxturn(true)
    setwinner(null)
  }
  const currentturn=xturn ?"X":"0"
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 drop-shadow-lg">Tic Tac Toe</h1>
      
      <p className="text-2xl font-semibold mb-4 text-gray-700">
        {winner === 'Draw'
          ? "😶 It's a Draw!"
          : winner
          ? `🎉 Winner: ${winner}`
          : `🔄 Current Turn: ${currentturn}`}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 bg-white border-4 border-blue-400 rounded-xl text-5xl font-bold text-gray-800 flex items-center justify-center shadow-md hover:bg-blue-100 transition duration-200"
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
        >
          🔁 Play Again
        </button>
      )}
    </div>
  );
}
export default App;
