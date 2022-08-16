import { HTTPTransport } from './fetch';
import { expect } from "chai";

global.XMLHttpRequest = require('xhr2');

describe('Fetch', () => {
  const base = 'http://httpbin.org/';
  const fetch = new HTTPTransport(base);

  it('Should perform GET request', async () => {
    const result = await fetch.get('/get', {});
    expect(result.statusText).equals('OK');
  });
  it('Should perform POST request', async () => {
    const result = await fetch.post('/post', {});
    expect(result.statusText).equals('OK');
  });
  it('Should perform PUT request', async () => {
    const result = await fetch.put('/put', {});
    expect(result.statusText).equals('OK');
  });
  it('Should perform DELETE request', async () => {
    const result = await fetch.delete('/delete', {});
    expect(result.statusText).equals('OK');
  });
})