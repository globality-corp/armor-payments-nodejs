import BankAccounts from './BankAccounts';
import Resource from './Resource';

class Accounts extends Resource {
  create(data) {
    const headers = this.authenticator.secureHeaders('post', this.uri());
    return this.request('post', { uri: this.uri(), headers, body: JSON.stringify(data) });
  }

  update(accountId, data) {
    const headers = this.authenticator.secureHeaders('post', this.uri(accountId));
    return this.request('post', { uri: this.uri(accountId), headers, body: JSON.stringify(data) });
  }

  bankAccounts(accountId) {
    return new BankAccounts(this.host, this.authenticator, this.uri(accountId));
  }
}

export default Accounts;
