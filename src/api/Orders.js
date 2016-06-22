import Documents from './Documents';
import Disputes from './Disputes';
import Notes from './Notes';
import OrderEvents from './OrderEvents';
import PaymentInstructions from './PaymentInstructions';
import Resource from './Resource';
import Shipments from './Shipments';


class Orders extends Resource {
  create(data) {
    const headers = this.authenticator.secureHeaders('post', this.uri());
    return this.request('post', { uri: this.uri(), headers, body: JSON.stringify(data) });
  }

  update(orderId, data) {
    const headers = this.authenticator.secureHeaders('post', this.uri(orderId));
    return this.request('post', { uri: this.uri(orderId), headers, body: JSON.stringify(data) });
  }

  documents(orderId) {
    return new Documents(this.host, this.authenticator, this.uri(orderId));
  }

  notes(orderId) {
    return new Notes(this.host, this.authenticator, this.uri(orderId));
  }

  disputes(orderId) {
    return new Disputes(this.host, this.authenticator, this.uri(orderId));
  }

  orderevents(orderId) {
    return new OrderEvents(this.host, this.authenticator, this.uri(orderId));
  }

  paymentinstructions(orderId) {
    return new PaymentInstructions(this.host, this.authenticator, this.uri(orderId));
  }

  shipments(orderId) {
    return new Shipments(this.host, this.authenticator, this.uri(orderId));
  }
}

export default Orders;
