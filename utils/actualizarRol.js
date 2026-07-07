const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const { obtenerRolPorDias } = require("./roles");

async function actualizarRol(member, canal = null) {

    if (member.user.bot) return;

    if (member.roles.cache.has(config.roles.creadora)) return;

    if (member.roles.cache.has(config.roles.admin)) return;

    const dias = Math.floor(
        (Date.now() - member.joinedTimestamp) /
        (1000 * 60 * 60 * 24)
    );

    const rolCorrecto = obtenerRolPorDias(dias);

    if (member.roles.cache.has(rolCorrecto)) return;

    const rolesTiempo = [
        config.roles.bebe,
        config.roles.joven,
        config.roles.veterano,
        config.roles.anciano,
        config.roles.sabio
    ];

    for (const rol of rolesTiempo) {
        if (member.roles.cache.has(rol)) {
            await member.roles.remove(rol);
        }
    }

    await member.roles.add(rolCorrecto);
    console.log(`✅ ${member.user.tag} ascendió a ${rolCorrecto}`);

    const { EmbedBuilder } = require("discord.js");

if (canal) {

    const embed = new EmbedBuilder()
        .setColor(0xFFD700)
        .setTitle("🐼 ¡Un panda ha evolucionado!")
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(
            `🎉 **${member}** ha conseguido un nuevo rango.`
        )
        .addFields(
            {
                name: "🏅 Nuevo rango",
                value: `<@&${rolCorrecto}>`,
                inline: true
            },
            {
                name: "📅 Fecha",
                value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
                inline: true
            }
        )
        .setFooter({
            text: "Sistema de Roles por Tiempo"
        })
        .setTimestamp();

    await canal.send({
        embeds: [embed]
    });

}
}

module.exports = {
    actualizarRol
};