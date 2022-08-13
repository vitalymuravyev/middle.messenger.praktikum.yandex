import Block from '../../core/Block';
import template from './chatInput.hbs';
import * as styles from './chatInput.css';

interface Props {
  name: string;
  className?: string;
  autocomplete: 'on' | 'off';
  placeholder?: string;
}

export class ChatInput extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
