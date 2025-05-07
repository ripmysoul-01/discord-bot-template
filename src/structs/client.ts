import Discord from "discord.js";

import fs from "fs";
import path from "path";

import { DiscordBot } from "../types/types";

export class Client<T extends boolean> extends Discord.Client<T> {

    public commands = new Discord.Collection<string, DiscordBot.Command>();

    constructor(options: Discord.ClientOptions) {
        super(options);
    };

    async start(
        applicationId: string,
        token: string
    ): Promise<void> {
        await this.login(token);
        await this.load(applicationId);
    };

    async load(applicationId: string): Promise<void> {
        const eventFiles = fs
            .readdirSync(
                path.join(
                    __dirname,
                    "..",
                    "events"
                )
            )
            .filter((file) => file.endsWith(".ts"));

        const commandFiles = fs
            .readdirSync(
                path.join(
                    __dirname,
                    "..",
                    "commands"
                )
            )
            .filter((file) => file.endsWith(".ts"));

        const events = (await Promise.all(
            eventFiles.map(
                async (event) =>
                    (await import(`../events/${event}`)).default ||
                    (await import(`../events/${event}`))
            )
        ));

        const commands = (await Promise.all(
            commandFiles.map(
                async (command) =>
                    (await import(`../commands/${command}`)).default ||
                    (await import(`../commands/${command}`))
            )
        ));

        for (const event of events) {
            this.on(
                event.name,
                event.run.bind(
                    null,
                    this as Client<true>
                )
            );
            console.log(`Loaded event "${event.name}"`);
        };

        for (const command of commands) {
            this.commands.set(
                command.data.name,
                command
            );
            console.log(`Loaded command "${command.data.name}"`);
        };

        const requestBody: DiscordBot.CommandData[] = this.commands
            .map((command) => command.data) ?? [];

        const data: any = await this.rest
            .put(
                Discord.Routes.applicationCommands(applicationId), {
                    body: requestBody
                }
            );

        for (const command of data) {
            console.log(`Deployed command "${command.name}" (id: "${command.id}")`);
        };
    };
};