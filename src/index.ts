import { Client, Events, GatewayIntentBits } from "discord.js";
import { commands } from "./commands";
import { config } from "./config";
import { deployCommands } from "./deployCommands";

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
    console.log("Discord bot is ready! God save us!");
});

client.on(Events.GuildCreate, async (guild) => {
    await deployCommands({ guildId: guild.id });
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const commandName: keyof typeof commands =
        interaction.commandName as keyof typeof commands;
    if (commands[commandName]) {
        commands[commandName].execute(interaction);
    }
});

client.login(config.DISCORD_TOKEN);
