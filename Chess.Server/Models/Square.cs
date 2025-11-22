namespace Chess.Server.Models;

public class Square
{
    public int X { get; set; }
    public int Y { get; set; }
    public Piece? Piece { get; set; }
    public Color Color { get; set; }
    public bool IsOccupied => Piece is not null;
}
