import { Component } from 'shared/services';
import { renderDOM } from 'shared/helpers';

type RouteProps = {
  rootQuery: string;
};

export class Route {
  private _pathname: string;

  private _blockClass: Component;

  private _block: Component | null;

  private _props: RouteProps;

  public constructor(pathname: string, view: Component, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  public match(pathname: string) {
    return pathname === this._pathname;
  }

  public render() {
    if (!this._block) {
      this._block = this._blockClass;

      if (this._block) {
        renderDOM(this._props.rootQuery, this._block);
      }
    } else {
      this._block.show();
    }
  }
}
