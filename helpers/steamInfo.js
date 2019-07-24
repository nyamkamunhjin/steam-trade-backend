const SteamAPI = require('steamapi');
const steam = new SteamAPI(process.env.STEAM_API_KEY);

module.exports = steam;