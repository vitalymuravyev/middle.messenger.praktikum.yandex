import Block from '../../core/Block';
import template from './message.hbs';
import * as styles from './message.css';

interface Props {
  content: string;
  time: string;
  className: string;
}

export class Message extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
