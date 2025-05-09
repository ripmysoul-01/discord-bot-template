import { SlashCommandBuilder } from "discord.js";
import { Clients } from "../types/types";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Returns websocket ping."),
        
    run: async (client, interaction) => {
        await interaction.reply({
            content: `Websocket Latency: \`${client.ws.ping}ms.\``,
            flags: "Ephemeral"
        });
        return;
    },
} as Clients.Command;