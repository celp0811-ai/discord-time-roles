const config = require("./config.json");
const { actualizarRol } = require("./utils/actualizarRol");

async function revisarMiembros(client) {

    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    if (!guild) {
        console.log("❌ No encontré el servidor.");
        return;
    }

    await guild.members.fetch();

    const canal = guild.channels.cache.get(config.canalAscensos);

    for (const [, member] of guild.members.cache) {
        await actualizarRol(member, canal);
    }
}

async function iniciarScheduler(client) {

    await revisarMiembros(client);

    setInterval(async () => {

        console.log("🔄 Revisando miembros...");

        await revisarMiembros(client);

    }, 24 * 60 * 60 * 1000);

}

module.exports = {
    iniciarScheduler
};