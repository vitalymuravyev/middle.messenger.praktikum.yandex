import Block from '../../core/Block';
import template from './input.hbs';
import * as styles from './input.css';

interface Props {
  name: string;
  type: 'text' | 'password';
  text: string;
  events?: {
    blur?: () => void;
    focus?: () => void;
  }
}

export class Input extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props, styles})
  }
}