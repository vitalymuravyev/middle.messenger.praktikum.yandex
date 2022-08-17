import Block from '../../core/Block';
import * as template from './userInfoItem.hbs';
import * as styles from './userInfoItem.css';

interface Props {
  value: string;
  title: string;
}

export class UserInfoItem extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
