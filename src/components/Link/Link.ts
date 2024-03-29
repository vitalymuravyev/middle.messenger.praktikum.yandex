import Block from '../../core/Block';
import * as template from './link.hbs';
import * as styles from './link.css';

interface Props {
  url?: string;
  text: string;
  className: string;
  events?: {
    click?: (e: Event) => void;
  }
}

export class Link extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
