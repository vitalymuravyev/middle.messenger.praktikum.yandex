import Block from '../Block';
import { Router } from './Router';
import { expect } from 'chai';
import { Route } from './Route';
import * as sinon from 'sinon';

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

describe('Router', () => {
  const router = new Router('#app');
  router.start();

  it('Should add "/"', () => {
    router.use('/', Page1);
    expect(router.getRoute('/')).instanceOf(Route);
  });

  it('Should add "/page"', () => {
    router.use('/page', Page2);
    expect(router.getRoute('/page')).instanceOf(Route);
  });

  it('Should go to "/page"', () => {
    router.go('/page');
    expect(router._currentRoute?._pathname).to.equal('/page')
  })

  it('Should go back', () => {
    const backSpy = sinon.spy(global.window.history, 'back');
    router.back();
    expect(backSpy.called).to.be.true;
  })

  it('Should go forward', () => {
    const forwardSpy = sinon.spy(global.window.history, 'forward');
    router.forward();
    expect(forwardSpy.called).to.be.true;
  })
})