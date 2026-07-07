const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const config = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tiempo")
        .setDescription("Muestra el tiempo que lleva un usuario en el servidor")
        .addUserOption(option =>
            option
                .setName("usuario")
                .setDescription("Usuario a consultar")
                .setRequired(false)
        ),

    async execute(interaction) {

        const miembro =
            interaction.options.getMember("usuario") ||
            interaction.member;

        const dias = Math.floor(
            (Date.now() - miembro.joinedTimestamp) /
            (1000 * 60 * 60 * 24)
        );

        let rango = "🐼 PANDA - BEBÉ";
        let siguiente = "🐼 PANDA - JOVEN";
        let faltan = config.dias.joven - dias;

        if (dias >= config.dias.joven) {
            rango = "🐼 PANDA - JOVEN";
            siguiente = "🐼 PANDA - VETERANO";
            faltan = config.dias.veterano - dias;
        }

        if (dias >= config.dias.veterano) {
            rango = "🐼 PANDA - VETERANO";
            siguiente = "🐼 PANDA - ANCIANO";
            faltan = config.dias.anciano - dias;
        }

        if (dias >= config.dias.anciano) {
            rango = "🐼 PANDA - ANCIANO";
            siguiente = "🐼 PANDA - SABIO";
            faltan = config.dias.sabio - dias;
        }

        if (dias >= config.dias.sabio) {
            rango = "🐼 PANDA - SABIO";
            siguiente = "🎉 ¡Has alcanzado el rango máximo!";
            faltan = 0;
        }

        const embed = new EmbedBuilder()
            .setColor(0x57F287)
            .setTitle("🐼 Tiempo en el servidor")
            .setThumbnail(miembro.user.displayAvatarURL())
            .addFields(
                {
                    name: "👤 Usuario",
                    value: `${miembro.user.tag}`,
                    inline: false
                },
                {
                    name: "📅 Días en el servidor",
                    value: `${dias} días`,
                    inline: true
                },
                {
                    name: "🏅 Rango actual",
                    value: rango,
                    inline: true
                },
                {
                    name: "⏳ Próximo rango",
                    value: siguiente,
                    inline: false
                },
                {
                    name: "⌛ Días restantes",
                    value: `${faltan}`,
                    inline: true
                }
            )
            .setFooter({
                text: "Sistema de Roles por Tiempo"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }
};