import { Route } from './Route';

interface RouteProps {
  rootQuery: string;
}

export class Router {
  private static __instance: Router;

  routes: Route<RouteProps>[];

  history: History;

  _currentRoute: Route<RouteProps> | null;

  _rootQuery: string;

  private _redirectPath: string[];

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._redirectPath = ['/', '/sign-up'];

    Router.__instance = this;
  }

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((evt: PopStateEvent) => {
      this._onRoute((evt.currentTarget as any).location.pathname);
    });
    this._onRoute(window.location.pathname);

    if (localStorage.getItem('active') && this._redirectPath.includes(window.location.pathname)) {
      this._onRoute('/messenger');
      this.history.pushState({}, '', '/messenger');
    }
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) return;

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    if (localStorage.getItem('active') && this._redirectPath.includes(pathname)) {
      pathname = '/messenger';
    }
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
