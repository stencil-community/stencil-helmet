import { createElement } from './dom';
import { VNode } from './types';

function title(node: VNode) {
  document.title = node.vchildren[0].vtext;
}

function meta(node: VNode) {
  const { name, content } = node.vattrs;
  const oldNode = document.querySelector(`meta [name="${name}"]`);
  if (oldNode) {
    oldNode.setAttribute('content', content);
  } else {
    const element = createElement(node.vtag, node.vattrs);
    document.head.appendChild(element);
  }
}

export default {
  title,
  meta
};
