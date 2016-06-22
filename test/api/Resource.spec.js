import nock from 'nock';
import timekeeper from 'timekeeper';
import { Authenticator } from 'dist';
import Resource from 'dist/api/Resource';


describe('Resource', () => {
  const authenticator = new Authenticator('my-api-key', 'my-secret-code');
  const host = 'https://sandbox.armorpayments.com';
  const uriRoot = '/wibble/123';
  const resource = new Resource(host, authenticator, uriRoot);
  const successfulResponse = {
    status: 200,
    body: '{"whee":42}',
    headers: { 'content-type': 'application/json' },
  };
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#uri', () => {
    it('returns /%{uri_root}/resource_name if given no id', () => {
      resource.uri().should.equal('/wibble/123/resource');
    });

    it('returns /%{uri_root}/resource_name/:id if given an id', () => {
      resource.uri(456).should.equal('/wibble/123/resource/456');
    });
  });

  describe('#request', () => {
    context('on a response with a JSON body', () => {
      it('returns the parsed JSON body', (done) => {
        nock('https://sandbox.armorpayments.com')
          .get('/wibble/123')
          .reply(200, {
            whee: 42,
          });

        resource.request('get', { uri: '/wibble/123' })
          .then((response) => {
            response.body.should.eql(JSON.parse(successfulResponse.body));
            done();
          });
      });
    });

    context('on a response without JSON', () => {
      it('returns the full response object', (done) => {
        nock('https://sandbox.armorpayments.com')
          .get('/wibble/123')
          .reply(502, 'Gateway Timeout');

        resource.request('get', { uri: '/wibble/123' })
          .catch((err) => {
            err.statusCode.should.equal(502);
            err.error.should.equal('Gateway Timeout');
            done();
          });
      });
    });
  });

  context('smoketest', () => {
    describe('#all', () => {
      it('queries the host for all of the resources, with approprate headers', (done) => {
        timekeeper.freeze(new Date('2014-02-22T17:00:00Z'));
        nock('https://sandbox.armorpayments.com')
          .get('/wibble/123/resource')
          .reply(200, {
            whee: 42,
          });
        const spy = sandbox.spy(resource.client, 'get');

        resource.all()
          .then((response) => {
            sinon.assert.calledWithExactly(spy, {
              uri: '/wibble/123/resource',
              headers: {
                'X-ARMORPAYMENTS-APIKEY': 'my-api-key',
                'X-ARMORPAYMENTS-REQUESTTIMESTAMP': '2014-02-22T17:00:00Z',
                'X-ARMORPAYMENTS-SIGNATURE': 'ec41629dc204b449c71bf89d1be4630f5353e37869197f5a926539f6fc676ebcccdb5426fb3f01a01fa7dc9551d38d152e41294a5147b15e460d09ff60cf1562',
              }
            });

            response.body.should.eql(JSON.parse(successfulResponse.body));
            response.statusCode.should.equal(successfulResponse.status);
            response.headers.should.eql(successfulResponse.headers);
            done();
          });
      });
    });
  });

  describe('#get', () => {
    it('queries the host for a specific resource, with approprate headers', (done) => {
      timekeeper.freeze(new Date('2014-02-22T17:00:00Z'));
      nock('https://sandbox.armorpayments.com')
        .get('/wibble/123/resource/456')
        .reply(200, {
          whee: 42,
        });
      const spy = sandbox.spy(resource.client, 'get');

      resource.get(456)
        .then((response) => {
          sinon.assert.calledWithExactly(spy, {
            uri: '/wibble/123/resource/456',
            headers: {
              'X-ARMORPAYMENTS-APIKEY': 'my-api-key',
              'X-ARMORPAYMENTS-REQUESTTIMESTAMP': '2014-02-22T17:00:00Z',
              'X-ARMORPAYMENTS-SIGNATURE': '48886620cfebb95ffd9ee351f4f68d4f103a8f4bdc0e3301f7ee709ec2cf3c19588ae1b67aa8ee38305de802651fb10093cf1af40f467ac936185d551a58a844',
            }
          });

          response.body.should.eql(JSON.parse(successfulResponse.body));
          response.statusCode.should.equal(successfulResponse.status);
          response.headers.should.eql(successfulResponse.headers);
          done();
        });
    });
  });
});
