import Block from '../../core/Block';
import template from './avatar.hbs';

interface Props {
  link: string;
  events: {
    click: (evt: Event) => void
  }
}

export class Avatar extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
