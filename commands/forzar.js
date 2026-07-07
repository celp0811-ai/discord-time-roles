const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config.json");
const { actualizarRol } = require("../utils/actualizarRol");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("forzar")
        .setDescription("Actualiza el rol de tiempo de un usuario")
        .addUserOption(option =>
            option
                .setName("usuario")
                .setDescription("Usuario a actualizar")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    async execute(interaction) {

        const miembro = interaction.options.getMember("usuario");

        if (!miembro) {
            return interaction.reply({
                content: "❌ No encontré a ese usuario.",
                ephemeral: true
            });
        }

        const canal = interaction.guild.channels.cache.get(config.canalAscensos);

        try {

            await actualizarRol(miembro, canal);

            await interaction.reply({
                content: `✅ El rol de **${miembro.user.tag}** fue revisado correctamente.`,
                ephemeral: true
            });

        } catch (error) {

            console.error(error);

            await interaction.reply({
                content: "❌ Ocurrió un error al actualizar el rol.",
                ephemeral: true
            });

        }

    }
};