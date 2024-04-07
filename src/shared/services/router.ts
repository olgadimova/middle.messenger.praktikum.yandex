import { Component } from './component.ts';
import { Route } from './route.ts';

export class Router {
  private _currentRoute: Route | null | undefined = null;

  private _rootQuery: string | null = null;

  static __instance: Router;

  public routes: Route[] = [];

  public history: History | null = null;

  public constructor(rootQuery: string) {
    if (Router.__instance) {
      throw new Error('Router already exists, use static getInstance method!');
    }

    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this.routes = [];
    this.history = window.history;

    Router.__instance = this;
  }

  private _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route) {
      route = this.getRoute('/404');
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route?.render();
  }

  public static getInstance() {
    if (Router.__instance) {
      return Router.__instance;
    }

    return new Router('');
  }

  public use(pathname: string, block: Component) {
    if (this._rootQuery) {
      const route = new Route(pathname, block, { rootQuery: this._rootQuery });
      this.routes.push(route);
    }

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  public go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history?.back();
  }

  public forward() {
    this.history?.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
