import Discord, { RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";

import fs from "fs";
import path from "path";

import { Clients } from "../types/types";

export class Client<T extends boolean> extends Discord.Client<T> {

    public buttons = new Discord.Collection<string, Clients.Button>();
    public commands = new Discord.Collection<string, Clients.Command>();
    public modals = new Discord.Collection<string, Clients.Modal>();
    public subcommands = new Discord.Collection<string, Clients.Subcommand>();

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

        const buttonFiles = fs
            .readdirSync(
                path.join(
                    __dirname,
                    "..",
                    "buttons"
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

        const modalFiles = fs
            .readdirSync(
                path.join(
                    __dirname,
                    "..",
                    "modals"
                )
            )
            .filter((file) => file.endsWith(".ts"));

        const subcommandFiles = fs
            .readdirSync(
                path.join(
                    __dirname,
                    "..",
                    "subcommands"
                )
            ).filter((file) => file.endsWith(".ts"));

        const events = (await Promise.all(
            eventFiles.map(
                async (event) =>
                    (await import(`../events/${event}`)).default ||
                    (await import(`../events/${event}`))
            )
        ));

        const buttons = (await Promise.all(
            buttonFiles.map(
                async (button) =>
                    (await import(`../buttons/${button}`)).default ||
                    (await import(`../buttons/${button}`))
            )
        ));

        const commands = (await Promise.all(
            commandFiles.map(
                async (command) =>
                    (await import(`../commands/${command}`)).default ||
                    (await import(`../commands/${command}`))
            )
        ));

        const modals = (await Promise.all(
            modalFiles.map(
                async (modal) =>
                    (await import(`../modals/${modal}`)).default ||
                    (await import(`../modals/${modal}`))
            )
        ));

        const subcommands = (await Promise.all(
            subcommandFiles.map(
                async (subcommand) =>
                    (await import(`../subcommands/${subcommand}`)).default ||
                    (await import(`../subcommands/${subcommand}`))
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

        for (const button of buttons) {
            this.buttons.set(
                button.customId,
                button
            );
            console.log(`Loaded button "${button.customId}"`);
        };

        for (const command of commands) {
            this.commands.set(
                command.data.name,
                command
            );
            console.log(`Loaded command "${command.data.name}"`);
        };

        for (const modal of modals) {
            this.modals.set(
                modal.customId,
                modal
            );
            console.log(`Loaded modal "${modal.customId}"`);
        };

        for (const subcommand of subcommands) {
            this.subcommands.set(
                `${subcommand.commandName}.${subcommand.subcommandName}`,
                subcommand
            );
            console.log(`Loaded subcommand "${subcommand.commandName} ${subcommand.subcommandName}"`);
        };

        const requestBody: RESTPostAPIChatInputApplicationCommandsJSONBody[] = this.commands
            .map((command) => command.data.toJSON()) ?? [];

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