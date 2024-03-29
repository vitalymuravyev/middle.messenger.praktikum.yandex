import Block from '../../core/Block';
import * as template from './chatPreview.hbs';
import * as styles from './chatPreview.css';

interface Props {
  name: string;
  text: string;
  time?: string;
  unreadNumber: number;
  events?: {
    click?: (evt: Event) => void
  }
}

export class ChatPreview extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
