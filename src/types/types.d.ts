import { ApplicationCommandOption, ChatInputCommandInteraction, ClientEvents } from "discord.js";
import { Client } from "../structs/client";

declare namespace DiscordBot {


    interface Command {
        data: CommandData;
        run: (
            client: Client<true>,
            interaction: ChatInputCommandInteraction
        ) => Promise<void>;
    };

    interface CommandData {
        name: string;
        description: string;
        options?: ApplicationCommandOption[];
    };

    interface Event<E extends keyof ClientEvents> {
        name: E;
        run: (
            client: Client<true>,
            ...argsEvent: ClientEvents[E]
        ) => void;
    };
};