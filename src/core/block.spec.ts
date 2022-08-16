import * as Handlebars from 'handlebars';
import Block from "./Block";
import { expect } from 'chai';

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

interface Props {
  text: string
}

class Component extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    const template = Handlebars.compile('<div>{{text}}</div>');
    return this.compile(template, this.props);
  }
}

describe('Component', () => {
  const component = new Component({text: 'Test'});

  it('render content', () => {
    expect(component.getContent().innerHTML).equals('Test');
  })

  it('change content', () => {
    component.setProps({
      text: 'Changed text',
    })
    expect(component.getContent().innerHTML).equals('Changed text');
  })
})