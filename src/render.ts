import { hasAttributes, hasChildren, isTextNode } from './util';
import { createElement } from './dom';
import { VNode } from './types';

export function title(node: VNode, head: HTMLElement) {
  if (hasChildren(node) && isTextNode(node.vchildren[0])) {
    return [
      createElement(node),
      head.querySelector('title')
    ];
  }
}

export function meta(node: VNode, head: HTMLElement) {
  if (hasAttributes(node, ['name', 'content'])) {
    const existingElement = head.querySelector(`meta[name="${node.vattrs.name}"]`);
    if (existingElement !== null) {
      return [
        createElement(node),
        existingElement
      ];
    } else {
      return createElement(node);
    }
  }
}

export function link(node: VNode) {
  if (!hasChildren(node)) {
    return createElement(node);
  }
}

export function style(node: VNode) {
  if (hasChildren(node) && isTextNode(node.vchildren[0])) {
    return createElement(node);
  }
}

export function script(node: VNode) {
  if (hasChildren(node) || hasAttributes(node)) {
    return createElement(node);
  }
}

export function base(node: VNode) {
  if (!hasChildren(node) && hasAttributes(node)) {
    return createElement(node);
  }
}

export const template = createElement;
export const noscript = createElement; // SSR only
