import { DiscordBot } from "../types/types";

export default {
    name: "interactionCreate",
    run: async (client, interaction) => {
        if (
            !interaction.isChatInputCommand()
        ) return;

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (command ===  undefined) {
                await interaction.reply({
                    content: `No command "${interaction.commandName}" was found.`,
                    flags: "Ephemeral"
                });
                return;
            };

            await command.run(client, interaction);
        };
    },
} as DiscordBot.Event<"interactionCreate">;