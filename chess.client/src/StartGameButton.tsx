import { useRef } from "react";
import * as signalR from "@microsoft/signalr";

interface StartGameProps {
    setIsGameOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function StartGameButton({ setIsGameOn }: StartGameProps) {
    const hubRef = useRef<signalR.HubConnection | null>(null);

    const startGame = async () => {
        try {
            const res = await fetch("/login");
            if (!res.ok) {
                throw new Error("Failed to get GUID");
            }

            const guid = await res.text();
            localStorage.setItem("playerId", guid);

            const hubConnection = new signalR.HubConnectionBuilder()
                .withUrl("/playGame")
                .withAutomaticReconnect()
                .build();

            hubConnection.on("messageReceived", (message: any) => {
                console.log("Received from server:", message);
            });

            await hubConnection.start();
            hubRef.current = hubConnection;

            setIsGameOn(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="mt-4 flex justify-center">
            <button
                onClick={startGame}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
                Start Game
            </button>
        </div>
    );
}

export default StartGameButton;
