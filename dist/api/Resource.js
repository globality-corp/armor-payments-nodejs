'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Resource = class Resource {

  constructor(host, authenticator, uriRoot) {
    this.host = host;
    this.authenticator = authenticator;
    this.uriRoot = uriRoot;
    this.client = _requestPromise2.default.defaults({
      baseUrl: this.host,
      headers: { Accept: 'application/json' },
      resolveWithFullResponse: true
    });
  }

  resourceName() {
    return this.constructor.name.toLowerCase();
  }

  uri() {
    let objectId = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    return objectId ? `${ this.uriRoot }/${ this.resourceName() }/${ objectId }` : `${ this.uriRoot }/${ this.resourceName() }`;
  }

  request(method, params) {
    var _this = this;

    return (0, _bluebird.coroutine)(function* () {
      const response = yield _this.client[method](params);
      const contentType = _lodash2.default.get(response, ['headers', 'content-type']);
      if (contentType && contentType.match(/json/i)) {
        // If possible, parse the JSON
        response.body = JSON.parse(response.body);
      }
      return response;
    })();
  }

  all() {
    const headers = this.authenticator.secureHeaders('get', this.uri());
    return this.request('get', { uri: this.uri(), headers: headers });
  }

  get(objectId) {
    const headers = this.authenticator.secureHeaders('get', this.uri(objectId));
    return this.request('get', { uri: this.uri(objectId), headers: headers });
  }
};
exports.default = Resource;