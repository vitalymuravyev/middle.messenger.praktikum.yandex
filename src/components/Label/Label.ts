import Block from '../../core/Block';
import * as template from './label.hbs';
import * as styles from './label.css';

interface Props {
  name: string;
  text: string;
}

export class Label extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
