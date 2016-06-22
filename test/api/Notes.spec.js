import nock from 'nock';
import { Authenticator } from 'dist';
import Notes from 'dist/api/Notes';

describe('Notes', () => {
  const authenticator = new Authenticator('my-api-key', 'my-secret-code');
  const host = 'https://sandbox.armorpayments.com';
  const notes = new Notes(host, authenticator, '/accounts/123/orders/456');
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#create', () => {
    it('makes POST with the right uri and JSONified data', (done) => {
      nock('https://sandbox.armorpayments.com')
        .post('/accounts/123/orders/456/notes')
        .reply(201);
      const spy = sandbox.spy(notes, 'request');

      notes.create({ name: 'Bobby Lee' })
        .then(() => {
          const callargs = spy.getCall(0).args;
          callargs[0].should.equal('post');
          callargs[1].should.include({
            uri: '/accounts/123/orders/456/notes',
            body: '{"name":"Bobby Lee"}',
          });
          done();
        });
    });
  });
});
