namespace Chess.Server.Hubs;

public class GameHub : Hub
{
    public async Task PlayGame(string playerId)
    {
        await Clients.Caller.SendAsync("messageReceived", playerId);
    }
}
