import Component from '../services/component';

export default function renderDOM(query: string, block: Component) {
  const root = document.querySelector(query);

  root?.appendChild(block.getContent() as Node);

  block.dispatchComponentDidMount();

  return root;
}
