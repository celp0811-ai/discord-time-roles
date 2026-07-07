const config = require("../config.json");

function obtenerRolPorDias(dias) {
    if (dias >= config.dias.sabio) return config.roles.sabio;
    if (dias >= config.dias.anciano) return config.roles.anciano;
    if (dias >= config.dias.veterano) return config.roles.veterano;
    if (dias >= config.dias.joven) return config.roles.joven;

    return config.roles.bebe;
}

module.exports = {
    obtenerRolPorDias
};