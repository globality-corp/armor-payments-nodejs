'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Authentications = require('./Authentications');

var _Authentications2 = _interopRequireDefault(_Authentications);

var _Resource = require('./Resource');

var _Resource2 = _interopRequireDefault(_Resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Users = class Users extends _Resource2.default {
  update(userId, data) {
    const headers = this.authenticator.secureHeaders('post', this.uri(userId));
    return this.request('post', { uri: this.uri(userId), headers: headers, body: JSON.stringify(data) });
  }

  authentications(userId) {
    return new _Authentications2.default(this.host, this.authenticator, this.uri(userId));
  }
};
exports.default = Users;