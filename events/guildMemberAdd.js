const config = require("../config.json");

module.exports = {
    name: "guildMemberAdd",

    async execute(member) {
        try {
            const rol = member.guild.roles.cache.get(config.roles.bebe);

            if (!rol) {
                console.log("❌ No encontré el rol PANDA - BEBÉ");
                return;
            }

            await member.roles.add(rol);

            console.log(`👶 ${member.user.tag} recibió PANDA - BEBÉ`);
        } catch (error) {
            console.error(error);
        }
    }
};