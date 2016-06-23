'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Resource = require('./Resource');

var _Resource2 = _interopRequireDefault(_Resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let BankAccounts = class BankAccounts extends _Resource2.default {
  create(data) {
    const headers = this.authenticator.secureHeaders('post', this.uri());
    return this.request('post', { uri: this.uri(), headers: headers, body: JSON.stringify(data) });
  }
};
exports.default = BankAccounts;