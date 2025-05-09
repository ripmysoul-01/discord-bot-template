import { SlashCommandBuilder } from "discord.js";
import { Clients } from "../types/types";

export default {
    data: new SlashCommandBuilder()
        .setName("interaction-example")
        .setDescription("Interaction example.")
        .addSubcommand((subcommand) =>
            subcommand
            .setName("button")
            .setDescription("Button interaction.")
        )
        .addSubcommand((subcommand) =>
            subcommand
            .setName("modal")
            .setDescription("Modal interaction.")
        ),
        
    run: async (client, interaction) => {

        const getSubcommand = interaction.options.getSubcommand();
        const subcommand = client.subcommands.get(`${interaction.commandName}.${getSubcommand}`);

        if (subcommand === undefined) {
            await interaction.reply({
                content: `No subcommand ${interaction.commandName} ${getSubcommand} was found in cache.`,
                flags: "Ephemeral"
            });
            return;
        };
    
        await subcommand.run(client, interaction);
    },
} as Clients.Command;