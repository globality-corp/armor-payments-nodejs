import crypto from 'crypto';
import timekeeper from 'timekeeper';
import { Authenticator } from '../dist';


describe('Authenticator', () => {

  const authenticator = new Authenticator('my-api-key', 'my-secret-code');

  describe('#currentTimestamp', () => {
    it('returns the current time in iso8601 format' , () => {
      timekeeper.freeze(new Date('2014-02-22T17:00:00Z'));
      authenticator.currentTimestamp().should.equal('2014-02-22T17:00:00Z');
    });
  });

  describe('#requestSignature', () => {
    it('hands a concatenated string encompassing the secret, request method, uri, and date to the digest service', () => {
      timekeeper.freeze(new Date('2014-02-22T17:00:00Z'));
      const the_beast = `${authenticator.apiSecret}:GET:/accounts:${authenticator.currentTimestamp}`;
      authenticator.requestSignature('get', '/accounts');
    });

    it('returns a SHA512 hash value', () => {
      timekeeper.freeze(new Date('2014-02-22T17:00:00Z'));
      authenticator.requestSignature('get', '/accounts').should.equal(
        '777990373678937074c1b357d632e0ea3439d0e834e573c03076ee557f526565f9ac2b38483b3e41024b96ec2644d60b4f70f0d9c760b2ebeb9827f9b335d069'
      );
    });
  });

  describe('#secureHeaders', () => {
    it('returns a hash with the required headers in', () => {
      const requiredHeaders = [
        'X-ARMORPAYMENTS-APIKEY',
        'X-ARMORPAYMENTS-REQUESTTIMESTAMP',
        'X-ARMORPAYMENTS-SIGNATURE',
      ];
      const headers = authenticator.secureHeaders('get', '/accounts');
      Object.keys(headers).should.eql(requiredHeaders);
    });

    it('assigns the correct value for each of the headers', () => {
      timekeeper.freeze(new Date('2014-02-22T17:00:00Z'));
      authenticator.secureHeaders('get', '/accounts').should.eql({
        'X-ARMORPAYMENTS-APIKEY': 'my-api-key',
        'X-ARMORPAYMENTS-SIGNATURE': '777990373678937074c1b357d632e0ea3439d0e834e573c03076ee557f526565f9ac2b38483b3e41024b96ec2644d60b4f70f0d9c760b2ebeb9827f9b335d069',
        'X-ARMORPAYMENTS-REQUESTTIMESTAMP': '2014-02-22T17:00:00Z',
      });
    });
  });
});
