const ImapClient = require('../server/clients/imap_client');
const { ImapClientInterface } = require('../server/clients/interfaces');

test('ImapClient implements ImapClientInterface', () => {
  const client = new ImapClient({});
  expect(client).toBeInstanceOf(ImapClientInterface);
});
