'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Documents = require('./Documents');

var _Documents2 = _interopRequireDefault(_Documents);

var _Notes = require('./Notes');

var _Notes2 = _interopRequireDefault(_Notes);

var _Resource = require('./Resource');

var _Resource2 = _interopRequireDefault(_Resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Offers = class Offers extends _Resource2.default {
  update(offerId, data) {
    const headers = this.authenticator.secureHeaders('post', this.uri(offerId));
    return this.request('post', { uri: this.uri(offerId), headers: headers, body: JSON.stringify(data) });
  }

  documents(offerId) {
    return new _Documents2.default(this.host, this.authenticator, this.uri(offerId));
  }

  notes(offerId) {
    return new _Notes2.default(this.host, this.authenticator, this.uri(offerId));
  }
};
exports.default = Offers;