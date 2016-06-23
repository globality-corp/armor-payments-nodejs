'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Authenticator = class Authenticator {

  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  secureHeaders(method, uri) {
    return {
      'X-ARMORPAYMENTS-APIKEY': this.apiKey,
      'X-ARMORPAYMENTS-REQUESTTIMESTAMP': this.currentTimestamp(),
      'X-ARMORPAYMENTS-SIGNATURE': this.requestSignature(method, uri)
    };
  }

  currentTimestamp() {
    // Return ISO8601 format without the fractional part
    return new Date().toISOString().replace(/\.[0-9]+/, '');
  }

  requestSignature(method, uri) {
    return _crypto2.default.createHash('sha512').update(`${ this.apiSecret }:${ method.toUpperCase() }:${ uri }:${ this.currentTimestamp() }`).digest('hex');
  }
};
exports.default = Authenticator;