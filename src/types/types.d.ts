import { ApplicationCommandOption, ButtonInteraction, ChatInputCommandInteraction, ClientEvents, ModalSubmitInteraction, SlashCommandBuilder } from "discord.js";
import { Client } from "../structs/client";

declare namespace Clients {
    interface Button {
        customId: string;
        run: (
            client: Client,
            interaction: ButtonInteraction
        ) => Promise<void> | void;
    };

    interface Command {
        data: SlashCommandBuilder;
        run: (
            client: Client<true>,
            interaction: ChatInputCommandInteraction
        ) => Promise<void> | void;
    };

    interface Modal {
        customId: string;
        run: (
            client: Client,
            interaction: ModalSubmitInteraction
        ) => Promise<void> | void;
    };

    interface Subcommand {
        commandName: string;
        subcommandName: string;
        run: (
            client: Client,
            interaction: ChatInputCommandInteraction
        ) => Promise<void> | void;
    };

    interface Event<E extends keyof ClientEvents> {
        name: E;
        run: (
            client: Client<true>,
            ...argsEvent: ClientEvents[E]
        ) => void;
    };
};