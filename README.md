
# 🤖 Discord Bot Template 

A minimal yet scalable **Discord Bot Starter** built with `TypeScript` and `discord.js v14`. Includes a modular structure, easy deployment, and best practices for modern bots.

## ✨ Features

- **Modular Command System** — Effortlessly add new commands by simply adding new files in the `commands` folder.
    
- **Event Handler System** — Automatically manage events like `ready`, `interactionCreate`, and custom events with minimal effort.
   
- **Scalable Structure** — Add more features as you grow your bot, with separation of concerns for easier maintenance.
- **Type-Safe with TypeScript** — Strong typing prevents bugs and improves code readability

## ⚙️ Requirements

-   **[Node.js](https://nodejs.org/)** v18 or higher
    
-   **[TypeScript](https://www.typescriptlang.org/)** v4.5 or higher
    
-   **discord.js** v14 or higher
    
-   **.env** file for bot token and application id

## 🚀 Getting Started

 1. **Clone the repository**
```bash
 git clone https://github.com/ripmysoul/discord-bot-template.git your-project-name
 cd your-project-name
 ```
 2. **Install dependencies**
```bash
npm install
```
 3. **Setup environment variables**
Inside the project, there's a file named `example.env`.  Rename this file to `.env`. After renaming, open the `.env` file in any text editor and fill in your bot's credentials:
```env
APPLICATION_ID = Enter your bot id here.
TOKEN = Enter your bot token here.
```
> **Important:** Do **not** share your `.env` file publicly — it contains sensitive data such as your bot token.

 4. **Run the bot**
 
Run in development mode:
```bash
npm run dev
```
Run in production mode:
```bash
npm run build && npm run start
```

## 📜 License

This project is licensed under the [MIT License](https://github.com/ripmysoul/discord-bot-template/blob/main/LICENSE).