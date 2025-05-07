import { DiscordBot } from "../types/types";

export default {
    data: {
        name: "ping",
        description: "Returns websocket ping.",
    },
    run: async (client, interaction) => {
        await interaction.reply({
            content: `Websocket Latency: \`${client.ws.ping}ms.\``,
            flags: "Ephemeral"
        });
        return;
    },
} as DiscordBot.Command;