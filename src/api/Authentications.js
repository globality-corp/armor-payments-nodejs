import Resource from './Resource';


class Authentications extends Resource {
  create(data) {
    const headers = this.authenticator.secureHeaders('post', this.uri());
    return this.request('post', { uri: this.uri(), headers, body: JSON.stringify(data) });
  }
}

export default Authentications;
