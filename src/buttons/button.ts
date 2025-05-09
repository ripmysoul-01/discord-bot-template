import { Clients } from "../types/types";

export default {
    customId: "button",
    run: async (client, interaction) => {
        await interaction.reply({
            content: "Button interacted.",
            flags: "Ephemeral"
        });
        return;
    },
} as Clients.Button;