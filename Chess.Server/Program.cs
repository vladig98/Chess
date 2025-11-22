using Chess.Server.Hubs;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(
        new JsonStringEnumConverter()
    );
});

builder.Services.AddOpenApi();
builder.Services.AddSignalR();

builder.Services.AddScoped<IGameEngine, GameEngine>();

WebApplication app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.MapHub<GameHub>("/playGame");
app.MapFallbackToFile("/index.html");

app.Run();
