namespace Chess.Server.Services;

public class GameEngine : IGameEngine
{
    private static readonly Dictionary<ulong, Piece> _pieces = new()
    {
        { 0UL << 32 | 0UL, new Piece() { Color = Color.Black, Type = PieceType.Rook } },
        { 0UL << 32 | 1UL, new Piece() { Color = Color.Black, Type = PieceType.Knight } },
        { 0UL << 32 | 2UL, new Piece() { Color = Color.Black, Type = PieceType.Bishop } },
        { 0UL << 32 | 3UL, new Piece() { Color = Color.Black, Type = PieceType.Queen } },
        { 0UL << 32 | 4UL, new Piece() { Color = Color.Black, Type = PieceType.King } },
        { 0UL << 32 | 5UL, new Piece() { Color = Color.Black, Type = PieceType.Bishop } },
        { 0UL << 32 | 6UL, new Piece() { Color = Color.Black, Type = PieceType.Knight } },
        { 0UL << 32 | 7UL, new Piece() { Color = Color.Black, Type = PieceType.Rook } },

        { 1UL << 32 | 0UL, new Piece() { Color = Color.Black, Type = PieceType.Pawn } },
        { 1UL << 32 | 1UL, new Piece() { Color = Color.Black, Type = PieceType.Pawn } },
        { 1UL << 32 | 2UL, new Piece() { Color = Color.Black, Type = PieceType.Pawn } },
        { 1UL << 32 | 3UL, new Piece() { Color = Color.Black, Type = PieceType.Pawn } },
        { 1UL << 32 | 4UL, new Piece() { Color = Color.Black, Type = PieceType.Pawn } },
        { 1UL << 32 | 5UL, new Piece() { Color = Color.Black, Type = PieceType.Pawn } },
        { 1UL << 32 | 6UL, new Piece() { Color = Color.Black, Type = PieceType.Pawn } },
        { 1UL << 32 | 7UL, new Piece() { Color = Color.Black, Type = PieceType.Pawn } },

        { 6UL << 32 | 0UL, new Piece() { Color = Color.White, Type = PieceType.Pawn } },
        { 6UL << 32 | 1UL, new Piece() { Color = Color.White, Type = PieceType.Pawn } },
        { 6UL << 32 | 2UL, new Piece() { Color = Color.White, Type = PieceType.Pawn } },
        { 6UL << 32 | 3UL, new Piece() { Color = Color.White, Type = PieceType.Pawn } },
        { 6UL << 32 | 4UL, new Piece() { Color = Color.White, Type = PieceType.Pawn } },
        { 6UL << 32 | 5UL, new Piece() { Color = Color.White, Type = PieceType.Pawn } },
        { 6UL << 32 | 6UL, new Piece() { Color = Color.White, Type = PieceType.Pawn } },
        { 6UL << 32 | 7UL, new Piece() { Color = Color.White, Type = PieceType.Pawn } },

        { 7UL << 32 | 0UL, new Piece() { Color = Color.White, Type = PieceType.Rook } },
        { 7UL << 32 | 1UL, new Piece() { Color = Color.White, Type = PieceType.Knight } },
        { 7UL << 32 | 2UL, new Piece() { Color = Color.White, Type = PieceType.Bishop } },
        { 7UL << 32 | 3UL, new Piece() { Color = Color.White, Type = PieceType.Queen } },
        { 7UL << 32 | 4UL, new Piece() { Color = Color.White, Type = PieceType.King } },
        { 7UL << 32 | 5UL, new Piece() { Color = Color.White, Type = PieceType.Bishop } },
        { 7UL << 32 | 6UL, new Piece() { Color = Color.White, Type = PieceType.Knight } },
        { 7UL << 32 | 7UL, new Piece() { Color = Color.White, Type = PieceType.Rook } }
    };

    public Board GetInitialGameState()
    {
        Board board = new()
        {
            Cols = 8,
            Rows = 8,
            Squares = []
        };

        int totalSquares = board.Rows * board.Cols;
        for (int i = 0; i < totalSquares; i++)
        {
            int x = i % board.Cols;
            int y = i / board.Cols;
            ulong lookupKey = ((ulong)(uint)y << 32) | (ulong)(uint)x;

            board.Squares.Add(new Square()
            {
                X = x,
                Y = y,
                Color = (x + y) % 2 == 0 ? Color.White : Color.Black,
                Piece = _pieces.TryGetValue(lookupKey, out Piece? piece) ? piece : null
            });
        }

        return board;
    }
}
