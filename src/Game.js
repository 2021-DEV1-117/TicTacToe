import React,  { useState }  from 'react';
import "./Game.css";

const Game = ({ onCellClick }) => {


    const [positions, setPositions] = useState([-1,-1,-1,-1,-1,-1,-1,-1,-1]);
    const [history, setHistory] = useState([]);

    const onClick = (position) => {
        let nextMove = 1;
        if (history.length > 0) {
            nextMove = history[history.length - 1] ? 0 : 1;
        }
        setHistory([...history,nextMove]);
        let updatedPositions = [...positions];
        updatedPositions[position] = nextMove;
        setPositions(updatedPositions);

        if (typeof onCellClick === 'function') onCellClick();
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

        </div>
    </div>;
}

export default Game;
