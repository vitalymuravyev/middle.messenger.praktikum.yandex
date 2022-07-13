import Block from '../../core/Block';
import template from './link.hbs';
import * as styles from './link.css';

interface Props {
  url: string;
  text: string;
  className: string;
}

export class Link extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props, styles});
  }
}