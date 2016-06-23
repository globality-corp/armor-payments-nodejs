'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Documents = require('./Documents');

var _Documents2 = _interopRequireDefault(_Documents);

var _Disputes = require('./Disputes');

var _Disputes2 = _interopRequireDefault(_Disputes);

var _Notes = require('./Notes');

var _Notes2 = _interopRequireDefault(_Notes);

var _OrderEvents = require('./OrderEvents');

var _OrderEvents2 = _interopRequireDefault(_OrderEvents);

var _PaymentInstructions = require('./PaymentInstructions');

var _PaymentInstructions2 = _interopRequireDefault(_PaymentInstructions);

var _Resource = require('./Resource');

var _Resource2 = _interopRequireDefault(_Resource);

var _Shipments = require('./Shipments');

var _Shipments2 = _interopRequireDefault(_Shipments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Orders = class Orders extends _Resource2.default {
  create(data) {
    const headers = this.authenticator.secureHeaders('post', this.uri());
    return this.request('post', { uri: this.uri(), headers: headers, body: JSON.stringify(data) });
  }

  update(orderId, data) {
    const headers = this.authenticator.secureHeaders('post', this.uri(orderId));
    return this.request('post', { uri: this.uri(orderId), headers: headers, body: JSON.stringify(data) });
  }

  documents(orderId) {
    return new _Documents2.default(this.host, this.authenticator, this.uri(orderId));
  }

  notes(orderId) {
    return new _Notes2.default(this.host, this.authenticator, this.uri(orderId));
  }

  disputes(orderId) {
    return new _Disputes2.default(this.host, this.authenticator, this.uri(orderId));
  }

  orderEvents(orderId) {
    return new _OrderEvents2.default(this.host, this.authenticator, this.uri(orderId));
  }

  paymentInstructions(orderId) {
    return new _PaymentInstructions2.default(this.host, this.authenticator, this.uri(orderId));
  }

  shipments(orderId) {
    return new _Shipments2.default(this.host, this.authenticator, this.uri(orderId));
  }
};
exports.default = Orders;