import nock from 'nock';
import { Authenticator } from 'dist';
import Accounts from 'dist/api/accounts';


describe('Accounts', () => {
  const authenticator = new Authenticator('my-api-key', 'my-secret-code');
  const host = 'https://sandbox.armorpayments.com';
  const accounts = new Accounts(host, authenticator, '');
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#uri', () => {
    it('returns /accounts if given no id', () => {
      accounts.uri().should.equal('/accounts');
    });

    it('returns /accounts/:id if given an id', () => {
      accounts.uri(456).should.equal('/accounts/456');
    });
  });

  describe('#create', () => {
    it('makes POST with /accounts and JSONified data', (done) => {
      nock('https://sandbox.armorpayments.com')
        .post('/accounts')
        .reply(201);
      const spy = sandbox.spy(accounts, 'request');

      accounts.create({ name: 'Bobby Lee' })
        .then(() => {
          const callargs = spy.getCall(0).args;
          callargs[0].should.equal('post');
          callargs[1].should.include({
            uri: '/accounts',
            body: '{"name":"Bobby Lee"}',
          });
          done();
        });
    });
  });
});
