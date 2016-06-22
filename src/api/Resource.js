import request from 'request-promise';
import _ from 'lodash';

class Resource {
  client;
  host;
  authenticator;
  uriRoot;

  constructor(host, authenticator, uriRoot) {
    this.host = host;
    this.authenticator = authenticator;
    this.uriRoot = uriRoot;
    this.client = request.defaults({
      baseUrl: this.host,
      headers: { Accept: 'application/json' },
      resolveWithFullResponse: true,
    });
  }

  resourceName() {
    return this.constructor.name.toLowerCase();
  }

  uri(objectId = null) {
    return objectId
      ? `${this.uriRoot}/${this.resourceName()}/${objectId}`
      : `${this.uriRoot}/${this.resourceName()}`;
  }

  async request(method, params) {
    const response = await this.client[method](params);
    const contentType = _.get(response, ['headers', 'content-type']);
    if (contentType && contentType.match(/json/i)) {
      // If possible, parse the JSON
      response.body = JSON.parse(response.body);
    }
    return response;
  }

  all() {
    const headers = this.authenticator.secureHeaders('get', this.uri());
    return this.request('get', { uri: this.uri(), headers });
  }

  get(objectId) {
    const headers = this.authenticator.secureHeaders('get', this.uri(objectId));
    return this.request('get', { uri: this.uri(objectId), headers });
  }
}

export default Resource;
