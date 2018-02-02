import { hasAttributes, hasChildren, isTextNode } from './util';
import { addElementToHead } from './dom';
import { VNode } from './types';

export function title(node: VNode) {
  if (hasChildren(node) && isTextNode(node.vchildren[0])) {
    document.title = node.vchildren[0].vtext;
  }
}

export function meta(node: VNode) {
  if (hasAttributes(node, ['name', 'content'])) {
    const existingElement = document.head.querySelector(`meta[name="${node.vattrs.name}"]`);
    if (existingElement !== null) {
      existingElement.setAttribute('content', node.vattrs.content);
    } else {
      addElementToHead(node);
    }
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

export const template = addElementToHead;
export const noscript = addElementToHead; // SSR only
