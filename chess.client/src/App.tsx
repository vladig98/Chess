import React, { useEffect, useState } from "react";

type Color = "Black" | "White";

interface Square {
    x: number;
    y: number;
    color: Color;
}

interface Board {
    rows: number;
    cols: number;
    squares: Square[];
}

const getColorClass = (color: Color): string =>
    color === "White"
        ? "bg-[#f0d9b5] hover:bg-yellow-300"
        : "bg-[#b58863] hover:bg-yellow-500";

const App: React.FC = () => {
    const [board, setBoard] = useState<Board | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

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
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
