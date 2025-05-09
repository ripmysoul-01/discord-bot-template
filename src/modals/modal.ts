import { Clients } from "../types/types";

export default {
    customId: "modal",
    run: async (client, interaction) => {
        await interaction.reply({
            content: "Modal submit interacted.",
            flags: "Ephemeral"
        });
        return;
    },
} as Clients.Modal;