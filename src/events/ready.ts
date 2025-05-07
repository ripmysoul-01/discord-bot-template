import { DiscordBot } from "../types/types";

export default {
    name: "ready",
    run: async (client) => {
        client.user.setActivity({
            state: "",
            name: "Please wait for bot to load before using bot commands.",
            type: 4
        });

        console.log(`Logged in as "${client.user.username}" (id: "${client.user.id}")`);
    },
} as DiscordBot.Event<"ready">;