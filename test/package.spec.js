import { expect } from 'chai';
import armorPayments, { Api, Authenticator } from '../dist';

describe('armor-payments', () => {
  it('should expose public interface', () => {
    expect(armorPayments).to.be.an('object');
  });

  it('should export Api constructor', () => {
    expect(Api).to.be.a('function');
  });

  it('should export Authenticator constructor', () => {
    expect(Authenticator).to.be.a('function');
  });
});
