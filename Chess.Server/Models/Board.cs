namespace Chess.Server.Models;

public class Board
{
    public int Rows { get; set; }
    public int Cols { get; set; }
    public List<Square> Squares { get; set; } = [];
}
