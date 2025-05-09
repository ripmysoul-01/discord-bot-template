import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { Clients } from "../types/types";

export default {
    commandName: "interaction-example",
    subcommandName: "button",
    run: async (client, interaction) => {
        const button = new ButtonBuilder()
            .setCustomId("button")
            .setLabel("Button")
            .setStyle(ButtonStyle.Primary);

        const buttonRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(button);

        await interaction.reply({
            components: [buttonRow],
            flags: "Ephemeral"
        });
        return;
    },
} as Clients.Subcommand;