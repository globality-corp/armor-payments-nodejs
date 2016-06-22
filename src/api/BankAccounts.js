import Resource from './Resource';

class BankAccounts extends Resource {
  create(data) {
    const headers = this.authenticator.secureHeaders('post', this.uri());
    return this.request('post', { uri: this.uri(), headers, body: JSON.stringify(data) });
  }
}

export default BankAccounts;
