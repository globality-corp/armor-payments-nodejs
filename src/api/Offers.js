import Documents from './Documents';
import Notes from './Notes';
import Resource from './Resource';


class Offers extends Resource {
  update(offerId, data) {
    const headers = this.authenticator.secureHeaders('post', this.uri(offerId));
    return this.request('post', { uri: this.uri(offerId), headers, body: JSON.stringify(data) });
  }

  documents(offerId) {
    return new Documents(this.host, this.authenticator, this.uri(offerId));
  }

  notes(offerId) {
    return new Notes(this.host, this.authenticator, this.uri(offerId));
  }
}

export default Offers;
