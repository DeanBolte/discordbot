import {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from "discord.js";
const {
    minecraftUrl,
    minecraftIconUrl,
    griddyIcon,
} = require("../../config.json");

export const data = new SlashCommandBuilder()
    .setName("server")
    .setDescription("Communicates Minecraft server information to the user.");

export async function execute(interaction: CommandInteraction) {
    // Grab the server address from the command details.
    // const address = interaction.options.getString("address");
    const address = "localhost";
    const iconRequest = minecraftIconUrl + address;
    const serverRequest = minecraftUrl + address;

    // Fetch the server status/information from the API.
    const response = await fetch(serverRequest);

    if (response) {
        // Parse the response into a JSON object.
        let data = await response.json();
        const dataJSON = JSON.parse(JSON.stringify(data));

        // Set initial variable values.
        let serverStatus = "Offline ❌";
        let playerCount = "0";
        let playerList: string[] = [];

        // If the server is online, update the aforementioned variables.
        if (dataJSON.online) {
            serverStatus = "Online ✅";
            playerCount = dataJSON.players.online.toString();
            dataJSON.players.list &&
                dataJSON.players.list.forEach((player: string) =>
                    playerList.push(player)
                );
        }

        // Build an embed using EmbedBuilder and the parsed data.
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Minecraft Server Status")
            .setAuthor({
                name: "Dean's Bot Hunter",
            })
            .setDescription(address)
            .setThumbnail(iconRequest)
            .addFields(
                {
                    name: "Status",
                    value: serverStatus,
                    inline: true,
                },
                {
                    name: "Online",
                    value: playerCount,
                    inline: true,
                }
            )
            .setTimestamp();

        // Add a field to display the playerList, only if it exists.
        playerList.length > 0 &&
            embed.addFields({
                name: "Players",
                value: playerList.join("\n"),
            });

        // Send out the embed.
        interaction.reply({ embeds: [embed] });
    }
}
