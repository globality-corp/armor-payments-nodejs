import nock from 'nock';
import { Authenticator } from 'dist';
import Offers from 'dist/api/Offers';

describe('Offers', () => {
  const authenticator = new Authenticator('my-api-key', 'my-secret-code');
  const host = 'https://sandbox.armorpayments.com';
  const offers = new Offers(host, authenticator, '/accounts/1234');
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#update', () => {
    it('makes POST with the right uri and JSONified data', (done) => {
      nock('https://sandbox.armorpayments.com')
        .post('/accounts/1234/offers/90')
        .reply(201);
      const spy = sandbox.spy(offers, 'request');

      offers.update(90, { name: 'Bobby Lee' })
        .then(() => {
          const callargs = spy.getCall(0).args;
          callargs[0].should.equal('post');
          callargs[1].should.include({
            uri: '/accounts/1234/offers/90',
            body: '{"name":"Bobby Lee"}',
          });
          done();
        });
    });
  });
});
