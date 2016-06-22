import { Authenticator } from 'dist';
import ShipmentCarriers from 'dist/api/ShipmentCarriers';

describe('ShipmentCarriers', () => {
  const authenticator = new Authenticator('my-api-key', 'my-secret-code');
  const host = 'https://sandbox.armorpayments.com';
  const shipmentCarriers = new ShipmentCarriers(host, authenticator, '');
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#uri', () => {
    it('returns /shipmentcarriers if given no id', () => {
      shipmentCarriers.uri().should.equal('/shipmentcarriers');
    });

    it('returns /shipmentcarriers/:id if given an id', () => {
      shipmentCarriers.uri(456).should.equal('/shipmentcarriers/456');
    });
  });
});
