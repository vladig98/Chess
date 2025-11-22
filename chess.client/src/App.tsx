import React, { useEffect, useState } from "react";
import blackPawn from "../src/assets/black-pawn.png";
import blackRook from "../src/assets/black-rook.png";
import blackKnight from "../src/assets/black-knight.png";
import blackBishop from "../src/assets/black-bishop.png";
import blackKing from "../src/assets/black-king.png";
import blackQueen from "../src/assets/black-queen.png";
import whitePawn from "../src/assets/white-pawn.png";
import whiteRook from "../src/assets/white-rook.png";
import whiteKnight from "../src/assets/white-knight.png";
import whiteBishop from "../src/assets/white-bishop.png";
import whiteKing from "../src/assets/white-king.png";
import whiteQueen from "../src/assets/white-queen.png";
import type { Color } from '../src/Color';
import type { PieceType } from '../src/PieceType';
import type { Board } from '../src/Board';
import type { Square } from '../src/Square';
import StartGameButton  from '../src/StartGameButton';

const piecesMap: Record<Color, Record<PieceType, string>> = {
    Black: {
        Pawn: blackPawn,
        Knight: blackKnight,
        Bishop: blackBishop,
        Rook: blackRook,
        King: blackKing,
        Queen: blackQueen,
    },
    White: {
        Pawn: whitePawn,
        Knight: whiteKnight,
        Bishop: whiteBishop,
        Rook: whiteRook,
        King: whiteKing,
        Queen: whiteQueen,
    },
};

const getColorClass = (color: Color): string =>
    color === "White"
        ? "bg-[#f0d9b5] hover:bg-yellow-300"
        : "bg-[#b58863] hover:bg-yellow-500";

const App: React.FC = () => {
    const [board, setBoard] = useState<Board | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [isGameOn, setIsGameOn] = useState<boolean>(false);

    useEffect(() => {
        fetchBoard();
    }, []);

    const fetchBoard = async () => {
        try {
            const res = await fetch("/game");
            if (!res.ok) {
                throw new Error(`Status ${res.status}`);
            }

            const data: Board = await res.json();
            setBoard(data);
        } catch (e) {
            setError(`Failed to load board: ${e instanceof Error ? e.message : "Unknown"}`);
        }
    };

    if (error) {
        return (
            <div className="text-center mt-20 text-red-600 font-semibold">
                {error}
            </div>
        );
    }

    if (!board) {
        return (
            <div className="text-center mt-20 text-gray-600">
                <span className="animate-pulse text-xl">Loading board...</span>
            </div>
        );
    }

    const { rows, cols, squares } = board;
    const grid: Square[][] = Array.from({ length: rows }, () => []);

    squares.forEach(square => grid[square.y].push(square));
    grid.forEach(row => row.sort((a, b) => a.x - b.x));

    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div
                className="shadow-xl rounded-xl overflow-hidden border-8 border-gray-900"
                style={{
                    display: "grid",
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    width: "min(90vw, 90vh)",
                    height: "min(90vw, 90vh)"
                }}
            >
                {grid.flat().map(square => (
                    <div
                        key={`${square.x}-${square.y}`}
                        className={`transition-colors duration-200 ${getColorClass(square.color)}`}
                    >
                        {square.piece && (
                            <img
                                src={piecesMap[square.piece.color][square.piece.type]}
                                alt={`${square.piece.color} ${square.piece.type}`}
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
            {!isGameOn && <StartGameButton setIsGameOn={setIsGameOn} />}
        </>
    );
};

export default App;
