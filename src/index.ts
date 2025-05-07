import "dotenv/config";
import { Client } from "./structs/client";
import { GatewayIntentBits, Partials } from "discord.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.SoundboardSound,
        Partials.ThreadMember,
        Partials.User,
    ]
});

client.start(
    process.env["APPLICATION_ID"]!,
    process.env["TOKEN"]!
);