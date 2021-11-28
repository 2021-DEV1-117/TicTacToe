import React,  { useState }  from 'react';
import "./Game.css";

const Game = ({ onCellClick }) => {


    const [positions, setPositions] = useState([-1,-1,-1,-1,-1,-1,-1,-1,-1]);
    const [history, setHistory] = useState([]);
    const [winner, setWinner] = useState(-1);

    const onClick = (position) => {
        if (positions[position] === -1 && winner === -1) {

            let nextMove = 1;
            if (history.length > 0) {
                nextMove = history[history.length - 1] ? 0 : 1;
            }
            setHistory([...history, nextMove]);
            let updatedPositions = [...positions];
            updatedPositions[position] = nextMove;
            setPositions(updatedPositions);
            checkVictory(updatedPositions);

        }
        if (typeof onCellClick === 'function') onCellClick();
    };

    const checkVictory = (positions) => {
        const victoryPositions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
        ];
        let victory = -1;

        victoryPositions.forEach((victoryCheck) => {
            if (positions[victoryCheck[0]] !== -1) {
                if (positions[victoryCheck[0]] === positions[victoryCheck[1]] && positions[victoryCheck[1]] === positions[victoryCheck[2]]) {
                    victory = positions[victoryCheck[0]];
                }
            }
        });
        setWinner(victory);

    };

    return <div className="Game">

        <table className="board">
            <tbody>
                {(() => {
                    let rows = [];
                    for (let y = 0; y < 3; y++) (
                        rows.push(
                            <tr key={y}>
                                {positions.slice(y*3,y*3+3).map((val, x) =>
                                    <td  onClick={()=> {onClick( y*3+x)}} key={x}>
                                        { val === 1 ? 'X' : val === 0 ? 'O' : '' }
                                    </td>
                                )}
                            </tr>
                        )
                    );
                    return rows;
                })()}
            </tbody>
        </table>
        <div className="message">
            {winner === 0 ? 'O won the game' : winner === 1 ? 'X won the game' : ''}
        </div>
    </div>;
}

export default Game;
