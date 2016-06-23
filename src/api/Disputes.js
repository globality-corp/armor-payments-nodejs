import Documents from './Documents';
import Notes from './Notes';
import Offers from './Offers';
import Resource from './Resource';


class Disputes extends Resource {
  documents(disputeId) {
    return new Documents(this.host, this.authenticator, this.uri(disputeId));
  }

  notes(disputeId) {
    return new Notes(this.host, this.authenticator, this.uri(disputeId));
  }

  offers(disputeId) {
    return new Offers(this.host, this.authenticator, this.uri(disputeId));
  }
}

export default Disputes;
