namespace Chess.Server.Services;

public class GameEngine : IGameEngine
{
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

            board.Squares.Add(new Square()
            {
                X = x,
                Y = y,
                Color = (x + y) % 2 == 0 ? Color.White : Color.Black
            });
        }

        return board;
    }
}
