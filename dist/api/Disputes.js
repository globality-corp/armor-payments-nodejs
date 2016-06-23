'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Documents = require('./Documents');

var _Documents2 = _interopRequireDefault(_Documents);

var _Notes = require('./Notes');

var _Notes2 = _interopRequireDefault(_Notes);

var _Offers = require('./Offers');

var _Offers2 = _interopRequireDefault(_Offers);

var _Resource = require('./Resource');

var _Resource2 = _interopRequireDefault(_Resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Disputes = class Disputes extends _Resource2.default {
  documents(disputeId) {
    return new _Documents2.default(this.host, this.authenticator, this.uri(disputeId));
  }

  notes(disputeId) {
    return new _Notes2.default(this.host, this.authenticator, this.uri(disputeId));
  }

  offers(disputeId) {
    return new _Offers2.default(this.host, this.authenticator, this.uri(disputeId));
  }
};
exports.default = Disputes;