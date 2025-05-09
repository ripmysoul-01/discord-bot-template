import { Clients } from "../types/types";

export default {
    name: "interactionCreate",
    run: async (client, interaction) => {
        if (
            !interaction.isButton() &&
            !interaction.isChatInputCommand() &&
            !interaction.isModalSubmit()
        ) return;

        if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);

            if (button === undefined) {
                await interaction.reply({
                    content: `No button "${interaction.customId}" was found in cache.`,
                    flags: "Ephemeral"
                });
                return;
            };

            await button.run(client, interaction);
        };

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (command ===  undefined) {
                await interaction.reply({
                    content: `No command "${interaction.commandName}" was found in cache.`,
                    flags: "Ephemeral"
                });
                return;
            };

            await command.run(client, interaction);
        };

        if (interaction.isModalSubmit()) {
            const modal = client.modals.get(interaction.customId);

            if (modal === undefined) {
                await interaction.reply({
                    content: `No modal "${interaction.customId}" was found in cache.`,
                    flags: "Ephemeral"
                });
                return;
            };

            modal.run(client, interaction);
        };
    },
} as Clients.Event<"interactionCreate">;