# 🤖 Discord Bot Template 

A minimal yet scalable **Discord Bot Starter** built with `TypeScript` and `discord.js v14`. Includes a modular structure, easy deployment, and best practices for modern bots.

## ✨ Features

-   🧩 **Modular Command System** — Effortlessly add new commands by simply adding new files in the `commands` folder.
    
-   🔄 **Event Handler System** — Automatically manage events like `ready`, `interactionCreate`, and custom events with minimal effort.
   
-   ⚡ **Scalable Structure** — Add more features as you grow your bot, with separation of concerns for easier maintenance.
- 🧠 **Type-Safe with TypeScript** — Strong typing prevents bugs and improves code readability

## ⚙️ Requirements

-   **[Node.js](https://nodejs.org/)** v18 or higher
    
-   **[TypeScript](https://www.typescriptlang.org/)** v4.5 or higher
    
-   **discord.js** v14 or higher
    
-   **.env** file for bot token and application id

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/ripmysoul/discord-bot-template.git
cd discord-bot-template

# 2. Install dependencies
npm install

# 3. Create .env file
cp example.env .env

# 4. Choose how to run the bot:

# Option 1: Run in development mode
npm run dev  # This will use tsx to run directly from the TypeScript files

# Option 2: Run in production mode
npm run build && npm run start  # Compile the TypeScript files into JavaScript in the dist/ folder and run the bot from the compiled JavaScript files in the dist/ folder
```

## ⌨️ Adding a new Command
In this bot, you can easily create new commands by following these steps:

 1. Go to the `src/commands/` folder.
 2.   Create a new TypeScript file in this folder, for example, `ping.ts`.
 3. Write the code for your command:
 ```ts
 import { DiscordBot } from "../types/types";
 
export default {
	data: {
		name: "ping",
		description: "Returns websocket ping."
	},
	run: async (client, interaction) => {
		await interaction.reply({
			content: `Websocket Latency: \`${client.ws.ping}ms.\``,
			flags: "Ephemeral"
		});
		return;
	}
} as DiscordBot.Command; 
```

## Adding a new Event

 1. Go to the `src/events/` folder.
 2. Create a new TypeScript file named after the event, for example, `message-create.ts`.
 3. Write the code that handles the event:
 ```ts
 import { DiscordBot } from "../types/types";
 
 export default {
	 name: "messageCreate",
	 run: async (client, message) => {
		 if (message.author.bot) return;
		 if (message.content === "ping") {
			 await message.reply("Pong!");
			 return;
		 };
	 }
} as DiscordBot.Event<"messageCreate">;
```

## 📜 License

This project is licensed under the [MIT License](https://github.com/ripmysoul/discord-bot-template/blob/main/LICENSE).
