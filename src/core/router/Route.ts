import renderDom from '../renderDom';
import Block from '../Block';
import { isEqualString } from '../../utils/isEqualString';

export class Route<Props extends {}> {
  _pathname: string;

  _block: InstanceType<typeof Block> | null;

  _blockClass: any;

  _props: Props;

  constructor(pathname: string, view: InstanceType<typeof Block>, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqualString(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    }
    renderDom(this._props.rootQuery, this._block as InstanceType<typeof Block>);
  }
}
