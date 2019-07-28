const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const { auth } = require('./botAuth');
const SteamTotp = require('steam-totp');

class SteamBot {
  constructor(logOnOptions) {
    this.client = new SteamUser();
    this.community = new SteamCommunity();
    this.manager = new TradeOfferManager({
      steam: this.client,
      community: this.community,
      language: 'en'
    });
    this.items = null;

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
      this.community.startConfirmationChecker(10000, auth.identity_secret);
    });
  }

  async loadUserItems(steam_id, game_id) {
    try {
      this.community.getUserInventoryContents(
        steam_id,
        game_id,
        2,
        true,
        (err, inventory) => {
          if (err) {
            throw err;
          }
  
          let inventoryPromise = new Promise((resolve, reject) => {
            resolve(inventory);
          });
  
          inventoryPromise.then((value) => {
            this.items = value;
          });
          console.log(items);
          
        }
      );
    } catch (err) {
      console.log(err);
    }
    console.log(this.items);
    
  }
}


module.exports = new SteamBot({
  accountName: auth.account_name,
	password: auth.password,
	twoFactorCode: SteamTotp.generateAuthCode(auth.shared_secret)
});
