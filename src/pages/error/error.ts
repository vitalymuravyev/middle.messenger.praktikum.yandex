import Block from '../../core/Block';
import template from './error.hbs';
import * as styles from './error.css';
import { Link } from '../../components/Link';

export interface ErrorPage {
  number: number;
  text: string;
  link_text: string;
}

export class Error extends Block {
  constructor(props: ErrorPage) {
    super(props);
  }

  protected initChildren() {
    this.children.link = new Link({
      text: this.props.link_text,
      className: 'link-button',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
