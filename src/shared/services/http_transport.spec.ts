import chai from 'chai';
import SinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import { HTTP } from './http_transport.ts';

describe('HTTP Trasport', () => {
  chai.use(SinonChai);

  const sandbox = createSandbox();
  let http: HTTP;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HTTP('');
    request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.resolve());
  });

  afterEach(() => sandbox.restore());

  it('stringifies query object for GET request', () => {
    http.get('/chat', { params: { a: 1, b: 1 } });

    chai.expect(request).calledWithMatch('/chat?a=1&b=1', { params: { a: 1, b: 1 }, method: 'GET' });
  });

  it('sends GET request without query params if they are not provided', () => {
    http.get('/chat', { params: {} });

    chai.expect(request).calledWithMatch('/chat', { params: {}, method: 'GET' });
  });

  it('sends POST request with data if data is provided', () => {
    http.post('/chat/12', { data: { a: 1, b: 1 } });

    chai.expect(request).calledWithMatch('/chat/12', { data: { a: 1, b: 1 }, method: 'POST' });
  });

  it('sends PUT request with data if data is provided', () => {
    http.put('/chat/12', { data: { a: 1, b: 1 } });

    chai.expect(request).calledWithMatch('/chat/12', { data: { a: 1, b: 1 }, method: 'PUT' });
  });

  it('sends DELETE request with data if data is provided', () => {
    http.delete('/chat', { data: { id: 1 } });

    chai.expect(request).calledWithMatch('/chat', { data: { id: 1 }, method: 'DELETE' });
  });
});
