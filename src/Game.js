import React,  { useState }  from 'react';
import "./Game.css";

const Game = ({ onCellClick }) => {

    const PLAYER_X = 1;
    const PLAYER_O = 0;
    const PLAYER_NONE = -1;
    

    const [positions, setPositions] = useState([
        PLAYER_NONE,PLAYER_NONE,PLAYER_NONE,
        PLAYER_NONE,PLAYER_NONE,PLAYER_NONE,
        PLAYER_NONE,PLAYER_NONE,PLAYER_NONE
    ]);
    const [history, setHistory] = useState([]);
    const [winner, setWinner] = useState(PLAYER_NONE);

    const onClick = (position) => {
        if (positions[position] === PLAYER_NONE && winner === PLAYER_NONE) {

            let nextMove = PLAYER_X;
            if (history.length > 0) {
                nextMove = history[history.length - 1] ? PLAYER_O : PLAYER_X;
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
            [2,4,6],
        ];
        let victory = PLAYER_NONE;

        victoryPositions.forEach((victoryCheck) => {
            if (positions[victoryCheck[0]] !== PLAYER_NONE) {
                if (positions[victoryCheck[0]] === positions[victoryCheck[1]] && positions[victoryCheck[1]] === positions[victoryCheck[2]]) {
                    victory = positions[victoryCheck[0]];
                }
            }
        });
        setWinner(victory);

    };

    const isDraw = () => {
        let gameFull = true;
        positions.forEach((pos) => {
            if (pos === PLAYER_NONE) {
                gameFull = false;
            }
        });

        return gameFull && winner === PLAYER_NONE;
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
                                        { val === PLAYER_X ? 'X' : val === PLAYER_O ? 'O' : '' }
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
            {winner === PLAYER_O ? 'O won the game' : winner === PLAYER_X ? 'X won the game' : isDraw() ? 'Draw game' : ''}
        </div>
    </div>;
}

export default Game;
