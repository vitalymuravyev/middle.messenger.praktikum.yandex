import Block from '../../core/Block';
import template from './chatPreview.hbs';
import * as styles from './chatPreview.css';

interface Props {
  name: string;
  text: string;
  time: string;
  unread_number: string;
}

export class ChatPreview extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
