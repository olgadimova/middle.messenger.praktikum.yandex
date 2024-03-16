export class BaseAPI {
  public create(_data: Record<string, string | number>) {
    throw new Error('Not implemented');
  }

  public request(_data?: Record<string, string | number>) {
    throw new Error('Not implemented');
  }

  public update(_data?: Record<string, string | number>) {
    throw new Error('Not implemented');
  }

  public delete() {
    throw new Error('Not implemented');
  }
}
