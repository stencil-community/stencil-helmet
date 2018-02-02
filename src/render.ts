import { addElementToHead } from './dom';
import { VNode } from './types';

const hasChildren = ({ vchildren }: VNode) =>
  Array.isArray(vchildren);

const hasAttributes = ({ vattrs }: VNode) =>
  typeof vattrs === 'object';

const isTextNode = ({ vtext }: VNode) =>
  typeof vtext === 'string';

export function title(node: VNode) {
  if (hasChildren(node) && isTextNode(node.vchildren[0])) {
    document.title = node.vchildren[0].vtext;
  }
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
  if (!hasChildren(node)) {
    addElementToHead(node);
  }
}

export function style(node: VNode) {
  if (hasChildren(node) && isTextNode(node.vchildren[0])) {
    addElementToHead(node);
  }
}

export function script(node: VNode) {
  if (hasChildren(node) || hasAttributes(node)) {
    addElementToHead(node);
  }
}

export function base(node: VNode) {
  if (!hasChildren(node) && hasAttributes(node)) {
    addElementToHead(node);
  }
}

export function template(node: VNode) {
  addElementToHead(node);
}
