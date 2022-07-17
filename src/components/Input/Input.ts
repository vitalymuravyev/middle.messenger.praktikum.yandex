import Block from '../../core/Block';
import template from './input.hbs';
import * as styles from './input.css';

interface Props {
  name: string;
  type: 'text' | 'password' | 'email' | 'tel';
  text: string;
  events?: {
    blur?: (e: Event) => void;
    focus?: (e?: Event) => void;
  }
}

export class Input extends Block {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
