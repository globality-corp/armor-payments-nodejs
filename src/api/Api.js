import Accounts from './Accounts';
import Orders from './Orders';
import Users from './Users';
import Authenticator from '../Authenticator';
import ShipmentCarriers from './ShipmentCarriers';

class Api {
  sandbox;
  authenticator;
  accountsObject;
  shipmentCarriersObject;

  constructor(apiKey, apiSecret, sandbox = false) {
    this.sandbox = sandbox;
    this.authenticator = new Authenticator(apiKey, apiSecret);
  }

  armorHost() {
    return this.sandbox === true
      ? 'https://sandbox.armorpayments.com'
      : 'https://api.armorpayments.com';
  }

  accounts() {
    if (!this.accountsObject) {
      this.accountsObject = new Accounts(this.armorHost(), this.authenticator, '');
    }
    return this.accountsObject;
  }

  orders(accountId) {
    return new Orders(this.armorHost(), this.authenticator, this.accounts().uri(accountId));
  }

  users(accountId) {
    return new Users(this.armorHost(), this.authenticator, this.accounts().uri(accountId));
  }

  shipmentCarriers() {
    if (!this.shipmentCarriersObject) {
      this.shipmentCarriersObject = new ShipmentCarriers(this.armorHost(), this.authenticator, '');
    }
    return this.shipmentCarriersObject;
  }
}

export default Api;
