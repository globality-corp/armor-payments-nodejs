import { Authenticator } from 'dist';
import Disputes from 'dist/api/Disputes';

describe('Disputes', () => {
  const authenticator = new Authenticator('my-api-key', 'my-secret-code');
  const host = 'https://sandbox.armorpayments.com';
  const disputes = new Disputes(host, authenticator, '/accounts/1234/orders/56');

  describe('#uri', () => {
    it("returns '/accounts/:aid/orders/:oid/disputes' if given no id", () => {
      disputes.uri().should.equal('/accounts/1234/orders/56/disputes');
    });

    it("returns '/accounts/:aid/disputes/:dispute_id' if given an id", () => {
      disputes.uri(78).should.equal('/accounts/1234/orders/56/disputes/78');
    });
  });
});
