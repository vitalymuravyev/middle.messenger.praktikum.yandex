import Block from '../../core/Block';
import * as template from './avatar.hbs';

interface Props {
  link: string;
  events: {
    click: (evt: Event) => void
  }
}

export class Avatar extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
