# Armor Payments Node.js Client

This is intended to be a clean, idiomatic client for the [Armor Payments
API](http://armorpayments.com/api/index.html).  This will handle generating the
authenticated headers and constructing the properly nested request URI, as well
as parsing any response JSON for you.

[![Circle CI](https://circleci.com/gh/globality-corp/armor-payments-nodejs/tree/develop.svg?style=svg)](https://circleci.com/gh/globality-corp/armor-payments-nodejs/tree/develop)
[![npm version](https://badge.fury.io/js/armor-payments.svg)](http://badge.fury.io/js/armor-payments)

## Installation

To install use `npm` and add the package to your application's dependencies:

    $ npm install armor-payments --save

## Usage

The Armor Payments API is REST-ish and nested, so the client relies on
chaining. We use
[request-promise](https://www.npmjs.com/package/request-promise) to return a
Promise for all operations resulting in an API request, with the added
nice-ness that we've parsed the JSON response body for you if possible.


```javascript
import { Api } from 'armor-payments';

var client = new Api('your-key', 'your-secret', shouldUseSandbox);

// There are four top-level resources: accounts, users, orders, and shipmentcarriers
// Querying users and orders requires an accountId
client.accounts().all().then(function (response) {
    // response.body contains parsed JSON object
});
```

## Available endpoints

* `client.accounts().create(data)`
* `client.accounts().update(accountId, data)`
* `client.accounts().all()`
* `client.accounts().get(accountId)`
* `client.accounts().bankAccounts(accountId).create(data)`
* `client.accounts().bankAccounts(accountId).all()`
* `client.accounts().bankAccounts(accountId).get(bankAccountId)`
* `client.users(accountId).update(userId, data)`
* `client.users(accountId).all()`
* `client.users(accountId).get(userId)`
* `client.users(accountId).authentications(userId).create(data)`
* `client.users(accountId).authentications(userId).all()`
* `client.users(accountId).authentications(userId).get(authenticationId)`
* `client.orders(accountId).create(data)`
* `client.orders(accountId).update(orderId, data)`
* `client.orders(accountId).all()`
* `client.orders(accountId).get(orderId)`
* `client.orders(accountId).documents(orderId).create(data)`
* `client.orders(accountId).documents(orderId).all()`
* `client.orders(accountId).documents(orderId).get(documentId)`
* `client.orders(accountId).notes(orderId).create(data)`
* `client.orders(accountId).notes(orderId).all()`
* `client.orders(accountId).notes(orderId).get(noteId)`
* `client.orders(accountId).disputes(orderId).documents(disputeId).create(data)`
* `client.orders(accountId).disputes(orderId).documents(disputeId).all()`
* `client.orders(accountId).disputes(orderId).documents(disputeId).get(documentId)`
* `client.orders(accountId).disputes(orderId).notes(disputeId).create(data)`
* `client.orders(accountId).disputes(orderId).notes(disputeId).all()`
* `client.orders(accountId).disputes(orderId).notes(disputeId).get(noteId)`
* `client.orders(accountId).disputes(orderId).offers(disputeId).update(offerId, data)`
* `client.orders(accountId).disputes(orderId).offers(disputeId).documents(offerId).create(data)`
* `client.orders(accountId).disputes(orderId).offers(disputeId).documents(offerId).all()`
* `client.orders(accountId).disputes(orderId).offers(disputeId).documents(offerId).get(documentId)`
* `client.orders(accountId).disputes(orderId).offers(disputeId).notes(offerId).create(data)`
* `client.orders(accountId).disputes(orderId).offers(disputeId).notes(offerId).all()`
* `client.orders(accountId).disputes(orderId).offers(disputeId).notes(offerId).get(noteId)`
* `client.orders(accountId).orderEvents(orderId).all()`
* `client.orders(accountId).orderEvents(orderId).get(eventId)`
* `client.orders(accountId).paymentInstructions(orderId).all()`
* `client.orders(accountId).paymentInstructions(orderId).get(paymentInstructionsId)`
* `client.orders(accountId).shipments(orderId).create(data)`
* `client.orders(accountId).shipments(orderId).all()`
* `client.orders(accountId).shipments(orderId).get(shipmentId)`
* `client.shipmentCarriers().all()`
* `client.shipmentCarriers().get(shipmentCarrierId)`

## Developing

We use CoffeeScript for development. The source files are under *src* and the
tests are under *test*. To compile CoffeeScript into JavaScript and run tests,
invoke Grunt:

    $ grunt

Features branching and release management are handled using
[git-flow](https://github.com/nvie/gitflow), and active development is always
done on the *develop* branch.


## Releasing a Version

Making a release involves the following steps:

1. Update CHANGELOG.md with relevant changes
1. Create new release branch, for example:

        $ git flow release start v0.2.0

1. Bump version:

        $ npm version --no-git-tag-version [major|minor|patch|...]

1. Commit and finalize release, and push to remote:

        $ git commit -a -m "bumped version for release"
        $ git flow release finish v0.2.0
        $ git push --all
        $ git push --tags

1. Push to NPM:

        $ npm publish


## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

**Find this project useful?** Help us make it even better by submitting any bugs or improvement suggestions you have
as GitHub Issues and Pull Requests.

**Like what we're doing?** There's much more Node.js and CoffeeScript goodness where this came from! drop us a line if you wanna chat about potential career opportunities at [Globality](http://www.globality.com): careers at globality dot com


## License

MIT License. See accompanying [LICENSE.txt](LICENSE.txt) file.
