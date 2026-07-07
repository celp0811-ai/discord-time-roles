require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");
const commands = new Map();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.set(command.data.name, command);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// Cargar eventos automáticamente
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));

    if (event.once || event.name === "clientReady") {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const { iniciarScheduler } = require("./scheduler");

client.once("clientReady", async () => {

    console.log("===== SERVIDORES =====");

    client.guilds.cache.forEach(guild => {
        console.log(`${guild.name} - ${guild.id}`);
    });

    console.log("======================");

    await iniciarScheduler(client);

});
client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "❌ Ocurrió un error.",
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: "❌ Ocurrió un error.",
                ephemeral: true
            });
        }
    }

});
client.login(process.env.DISCORD_TOKEN);