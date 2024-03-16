export class BaseAPI {
  public create(_data: Record<string, string | number>) {
    throw new Error('Not implemented');
  }

  public request(_options: { data?: Record<string, string | number>; params?: Record<string, string | number> }) {
    throw new Error('Not implemented');
  }

  public update(_data?: Record<string, string | number>) {
    throw new Error('Not implemented');
  }

  public delete(_data?: Record<string, string | number>) {
    throw new Error('Not implemented');
  }
}
