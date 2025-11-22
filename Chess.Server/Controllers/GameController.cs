namespace Chess.Server.Controllers;

[ApiController]
[Route("game")]
public class GameController(IGameEngine gameEngine) : ControllerBase
{
    [HttpGet]
    public Board GetGame()
    {
        return gameEngine.GetInitialGameState();
    }
}
