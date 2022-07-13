import Block from './Block';

const renderDom = (selector: string, component: Block) => {
  const root = document.querySelector(selector);

  if (!root) {
    throw new Error('Селектор не найден')
  }

  root.innerHTML = '';

  root.append(component.getContent());
}

export default renderDom;