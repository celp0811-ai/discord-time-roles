module.exports = {
    name: "clientReady",

    async execute(client) {
        console.log(`🚀 ${client.user.tag} está listo.`);
    }
};