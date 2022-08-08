import Block from '../../core/Block';
import template from './userInfoItem.hbs';
import * as styles from './userInfoItem.css';

interface Props {
  name: string;
  value: string;
  title: string;
}

export class UserInfoItem extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
