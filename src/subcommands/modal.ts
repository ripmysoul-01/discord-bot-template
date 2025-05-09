import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Clients } from "../types/types";

export default {
    commandName: "interaction-example",
    subcommandName: "modal",
    run: async (client, interaction) => {
        const textInput = new TextInputBuilder()
            .setCustomId("text-input")
            .setLabel("Enter a string")
            .setPlaceholder("Enter a string here.")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const textInputRow = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(textInput);
        
        const modal = new ModalBuilder()
            .setCustomId("modal")
            .setTitle("Modal")
            .addComponents(textInputRow);

        await interaction.showModal(modal);
    },
} as Clients.Subcommand;