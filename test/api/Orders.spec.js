import nock from 'nock';
import { Authenticator } from 'dist';
import Orders from 'dist/api/Orders';

describe('Orders', () => {
  const authenticator = new Authenticator('my-api-key', 'my-secret-code');
  const host = 'https://sandbox.armorpayments.com';
  const orders = new Orders(host, authenticator, '/accounts/1234');
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#uri', () => {
    it('returns /accounts/:aid/orders if given no id', () => {
      orders.uri().should.equal('/accounts/1234/orders');
    });

    it('returns /accounts/:aid/orders/:order_id if given an id', () => {
      orders.uri(456).should.equal('/accounts/1234/orders/456');
    });
  });

  describe('#update', () => {
    it('makes POST with the right uri and JSONified data', (done) => {
      nock('https://sandbox.armorpayments.com')
        .post('/accounts/1234/orders/90')
        .reply(201);
      const spy = sandbox.spy(orders, 'request');

      orders.update(90, { name: 'Bobby Lee' })
        .then(() => {
          const callargs = spy.getCall(0).args;
          callargs[0].should.equal('post');
          callargs[1].should.include({
            uri: '/accounts/1234/orders/90',
            body: '{"name":"Bobby Lee"}',
          });
          done();
        });
    });
  });
});
