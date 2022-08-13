import Block from '../../core/Block';
import template from './button.hbs';
import * as styles from './button.css';

interface Props {
  text: string;
  events?: {
    click?: (e: Event) => void
  };
}

export class Button extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
