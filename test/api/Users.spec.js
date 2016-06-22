import { Authenticator } from 'dist';
import Users from 'dist/api/users';


describe('Users', () => {
  const authenticator = new Authenticator('my-api-key', 'my-secret-code');
  const host = 'https://sandbox.armorpayments.com';
  const users = new Users(host, authenticator, '/accounts/1234');

  describe('#uri', () => {
    it('returns /users if given no id', () => {
      users.uri().should.equal('/accounts/1234/users');
    });

    it('returns /users/:id if given an id', () => {
      users.uri(456).should.equal('/accounts/1234/users/456');
    });
  });
});
