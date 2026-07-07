const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config.json");
const { actualizarRol } = require("../utils/actualizarRol");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("actualizar-todos")
        .setDescription("Actualiza los roles de todos los miembros")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    async execute(interaction) {

        await interaction.reply({
            content: "🔄 Actualizando miembros... Esto puede tardar unos segundos.",
            ephemeral: true
        });

        const guild = interaction.guild;

        await guild.members.fetch();

        const canal = guild.channels.cache.get(config.canalAscensos);

        let contador = 0;

        for (const [, member] of guild.members.cache) {

            try {
                await actualizarRol(member, canal);
                contador++;
            } catch (err) {
                console.error(`Error con ${member.user.tag}`, err);
            }

        }

        await interaction.editReply({
            content: `✅ Proceso terminado.\n\nSe revisaron **${contador}** miembros.`
        });

    }
};