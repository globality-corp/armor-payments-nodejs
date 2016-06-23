import Authentications from './Authentications';
import Resource from './Resource';

class Users extends Resource {
  update(userId, data) {
    const headers = this.authenticator.secureHeaders('post', this.uri(userId));
    return this.request('post', { uri: this.uri(userId), headers, body: JSON.stringify(data) });
  }

  authentications(userId) {
    return new Authentications(this.host, this.authenticator, this.uri(userId));
  }
}

export default Users;
