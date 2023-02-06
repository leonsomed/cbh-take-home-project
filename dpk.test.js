const crypto = require('crypto');
const { deterministicPartitionKey, getPartitionKeyHash } = require('./dpk');

describe('deterministicPartitionKey', () => {
  const getGenericEvent = (partitionKey) => ({
    partitionKey,
    name: 'NAME',
    url: 'SOME_URL',
    version: '1.2.3',
    date: 78126382777,
  });
  const getHash = (data) =>
    crypto.createHash('sha3-512').update(data).digest('hex');

  it('Returns the default partition key "0" when no event parameter is passed', () => {
    const key = deterministicPartitionKey();
    expect(key).toBe('0');
  });

  it('Returns partitionKey field from event', () => {
    const partitionKey = Math.random().toString();
    const key = deterministicPartitionKey(getGenericEvent(partitionKey));
    expect(key).toBe(partitionKey);
  });

  it('Returns stringified partitionKey field from event when partitionKey is not a string', () => {
    const partitionKey = Math.random();
    const key = deterministicPartitionKey(getGenericEvent(partitionKey));
    expect(key).toBe(JSON.stringify(partitionKey));
  });

  it('Returns hash of event when partitionKey field does not exist in event', () => {
    const key = deterministicPartitionKey(getGenericEvent());
    const partitionKey = getHash(JSON.stringify(getGenericEvent()));
    expect(key).toBe(partitionKey);
  });

  it('Returns hash of partitionKey field when partitionKey exceeds the maximum key length', () => {
    const longPartitionKey = Array.from({ length: 500 }).join('1');
    const key = deterministicPartitionKey(getGenericEvent(longPartitionKey));
    const partitionKey = getHash(longPartitionKey);
    expect(key).toBe(partitionKey);
  });
});
