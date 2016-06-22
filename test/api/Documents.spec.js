import nock from 'nock';
import { Authenticator } from 'dist';
import Documents from 'dist/api/Documents';

describe('Documents', () => {
  const authenticator = new Authenticator('my-api-key', 'my-secret-code');
  const host = 'https://sandbox.armorpayments.com';
  const documents = new Documents(host, authenticator, '/accounts/123/orders/456');
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#create', () => {

    it('makes POST with the right uri and JSONified data', (done) => {
      nock('https://sandbox.armorpayments.com')
        .post('/accounts/123/orders/456/documents')
        .reply(201);
      const spy = sandbox.spy(documents, 'request');

      documents.create({ name: 'Bobby Lee' })
        .then(() => {
          const callargs = spy.getCall(0).args;
          callargs[0].should.equal('post');
          callargs[1].should.include({
            uri: '/accounts/123/orders/456/documents',
            body: '{"name":"Bobby Lee"}',
          });
          done();
        });
    });
  });
});
