import crypto from 'crypto';

class Authenticator {
  apiKey;
  apiSecret;

  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  secureHeaders(method, uri) {
    return {
      'X-ARMORPAYMENTS-APIKEY': this.apiKey,
      'X-ARMORPAYMENTS-REQUESTTIMESTAMP': this.currentTimestamp(),
      'X-ARMORPAYMENTS-SIGNATURE': this.requestSignature(method, uri),
    };
  }

  currentTimestamp() {
    // Return ISO8601 format without the fractional part
    return (new Date).toISOString().replace(/\.[0-9]+/, '');
  }

  requestSignature(method, uri) {
    return crypto.createHash('sha512')
      .update(`${this.apiSecret}:${method.toUpperCase()}:${uri}:${this.currentTimestamp()}`)
      .digest('hex');
  }
}

export default Authenticator;
