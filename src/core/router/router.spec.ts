import Block from '../Block';
import { Router } from './Router';
import { expect } from 'chai';
import { Route } from './Route';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM(
  '<html><body><div id="app"></div></body></html>',
  { url: 'http://localhost' },
  { runSripts: 'dangerously' },
)

global.document = dom.window.document;
global.window = dom.window;
if (dom.window.document.defaultView) {
  global.DocumentFragment = dom.window.document.defaultView.DocumentFragment;
}

class Page1 extends Block<any> {
  constructor(props: any) {
    super(props);
  }

  protected render(): DocumentFragment {
    const element = document.createElement('template');
    element.innerHTML = '<div>{{content}}</div>';
    return element.content;
  }
}

class Page2 extends Block<any> {
  constructor(props: any) {
    super(props);
  }

  protected render(): DocumentFragment {
    const element = document.createElement('template');
    element.innerHTML = '<div>{{content}}</div>';
    return element.content;
  }
}

const page1 = new Page1({});
const page2 = new Page2({});

describe('Router', () => {
  const router = new Router('#app');
  router.start();

  it('Should add "/"', () => {
    router.use('/', page1);
    expect(router.getRoute('/')).instanceOf(Route);
  });

  it('Should add "/page"', () => {
    router.use('/page', page2);
    expect(router.getRoute('/page')).instanceOf(Route);
  });
})