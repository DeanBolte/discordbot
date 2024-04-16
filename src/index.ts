import { Client, Events, GatewayIntentBits } from "discord.js";
import { deployCommands } from "./deployCommands";
import { commands } from "./commands";
import { config } from "./config";

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
    console.log("Discord bot is ready! :PogChamp:");
});

client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // const commandName: keyof typeof commands =
    //     interaction.commandName as keyof typeof commands;
    // if (commands[commandName]) {
    //     commands[commandName].execute(interaction);
    // }
    if (interaction.commandName === "ping") {
        await interaction.reply({ content: "Secret Pong!", ephemeral: true });
    }
});

client.login(config.DISCORD_TOKEN);
