'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Accounts = require('./Accounts');

var _Accounts2 = _interopRequireDefault(_Accounts);

var _Orders = require('./Orders');

var _Orders2 = _interopRequireDefault(_Orders);

var _Users = require('./Users');

var _Users2 = _interopRequireDefault(_Users);

var _Authenticator = require('../Authenticator');

var _Authenticator2 = _interopRequireDefault(_Authenticator);

var _ShipmentCarriers = require('./ShipmentCarriers');

var _ShipmentCarriers2 = _interopRequireDefault(_ShipmentCarriers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Api = class Api {

  constructor(apiKey, apiSecret) {
    let sandbox = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    this.sandbox = sandbox;
    this.authenticator = new _Authenticator2.default(apiKey, apiSecret);
  }

  armorHost() {
    return this.sandbox === true ? 'https://sandbox.armorpayments.com' : 'https://api.armorpayments.com';
  }

  accounts() {
    if (!this.accountsObject) {
      this.accountsObject = new _Accounts2.default(this.armorHost(), this.authenticator, '');
    }
    return this.accountsObject;
  }

  orders(accountId) {
    return new _Orders2.default(this.armorHost(), this.authenticator, this.accounts().uri(accountId));
  }

  users(accountId) {
    return new _Users2.default(this.armorHost(), this.authenticator, this.accounts().uri(accountId));
  }

  shipmentcarriers() {
    if (!this.shipmentCarriersObject) {
      this.shipmentCarriersObject = new _ShipmentCarriers2.default(this.armorHost(), this.authenticator, '');
    }
    return this.shipmentCarriersObject;
  }
};
exports.default = Api;