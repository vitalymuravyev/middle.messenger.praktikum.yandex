import Block from '../../core/Block';
import * as template from './message.hbs';
import * as styles from './message.css';

interface Props {
  content: string;
  time: string;
  className: string;
}

export class Message extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
