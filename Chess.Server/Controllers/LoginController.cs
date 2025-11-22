namespace Chess.Server.Controllers;

[ApiController]
[Route("login")]
public class LoginController : ControllerBase
{
    [HttpGet]
    public string Login()
    {
        // Simulate a JWT token
        // This won't have authentication but we need to have something unique to tell players apart
        // The GUID will give a unique id to the players
        // We can store in local storage and connect with it over WS
        // We can use the GUID to store the games in a DB if needed
        return Guid.NewGuid().ToString();
    }
}
