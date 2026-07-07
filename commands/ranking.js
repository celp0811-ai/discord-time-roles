const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ranking")
        .setDescription("Muestra los miembros más antiguos del servidor"),

    async execute(interaction) {

        if (interaction.guild.members.cache.size < interaction.guild.memberCount) {
		await interaction.guild.members.fetch();
	}

        const miembros = interaction.guild.members.cache
            .filter(m => !m.user.bot)
            .map(m => ({
                usuario: m.user,
                dias: Math.floor(
                    (Date.now() - m.joinedTimestamp) /
                    (1000 * 60 * 60 * 24)
                )
            }))
            .sort((a, b) => b.dias - a.dias)
            .slice(0, 10);

        let texto = "";

        miembros.forEach((m, i) => {

            let puesto = `${i + 1}.`;

            if (i === 0) puesto = "🥇";
            if (i === 1) puesto = "🥈";
            if (i === 2) puesto = "🥉";

            texto += `${puesto} **${m.usuario.username}** — ${m.dias} días\n`;

        });

        const embed = new EmbedBuilder()
            .setColor(0xFFD700)
            .setTitle("🏆 Ranking de antigüedad")
            .setDescription(texto)
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });

    }
};