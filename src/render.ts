import { addElementToHead } from './dom';
import { VNode } from './types';

export function title(node: VNode) {
  document.title = node.vchildren[0].vtext;
}

export function meta(node: VNode) {
  const { name, content } = node.vattrs;
  const existingElement = document.head.querySelector(`meta[name="${name}"]`);
  if (existingElement !== null) {
    existingElement.setAttribute('content', content);
  } else {
    addElementToHead(node);
  }
}

export function link(node: VNode) {
  addElementToHead(node);
}

export function style(node: VNode) {
  addElementToHead(node);
}
