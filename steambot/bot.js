const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const SteamTotp = require('steam-totp');
const dotenv = require('dotenv');

dotenv.config();

class SteamBot {
  constructor(logOnOptions) {
    this.client = new SteamUser();
    this.community = new SteamCommunity();
    this.manager = new TradeOfferManager({
      steam: this.client,
      community: this.community,
      language: 'en'
    });

    this.logOn(logOnOptions);
  }

  logOn(logOnOptions) {
    this.client.logOn(logOnOptions);

    this.client.on('loggedOn', () => {
      console.log('Logged into Steam');

      this.client.setPersona(SteamUser.EPersonaState.Online);
    });

    this.client.on('webSession', (sessionId, cookies) => {
      this.manager.setCookies(cookies);
      this.community.setCookies(cookies);
      this.community.startConfirmationChecker(
        10000,
        process.env.identity_secret
      );
    });
  }
}

module.exports = new SteamBot({
  accountName: process.env.account_name.toString(),
  password: process.env.password,
  twoFactorCode: SteamTotp.generateAuthCode(process.env.shared_secret)
});
