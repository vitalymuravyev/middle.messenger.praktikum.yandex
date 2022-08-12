import Block from './Block';

function renderDom<T extends {}>(selector: string, component: Block<T>) {
  const root = document.querySelector(selector);

  if (!root) {
    throw new Error('Селектор не найден');
  }

  root.innerHTML = '';

  root.append(component.getContent());
}

export default renderDom;
