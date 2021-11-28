import React,  { useState }  from 'react';
import "./Game.css";

const Game = ({ onCellClick }) => {


    const [positions, setPositions] = useState([-1,-1,-1,-1,-1,-1,-1,-1,-1]);

    const onClick = () => {
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
                                    <td  onClick={()=> {onClick( x*3+y)}} key={x}>
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
