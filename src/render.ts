import { addElementToHead } from './dom';
import { VNode } from './types';

function title(node: VNode) {
  document.title = node.vchildren[0].vtext;
}

function meta(node: VNode) {
  const { name, content } = node.vattrs;
  const existingElement = document.querySelector(`meta [name="${name}"]`);
  if (existingElement !== null) {
    existingElement.setAttribute('content', content);
  } else {
    addElementToHead(node);
  }
}

function link(node: VNode) {
  addElementToHead(node);
}

export default {
  title,
  meta,
  link
};
