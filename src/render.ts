import util from './util';
import { createElement } from './dom';
import { VNode, FunctionalUtilities } from './types';

export default function render(fUtil: FunctionalUtilities) {
  const { hasAttributes, hasChildren, isTextNode } = util(fUtil);

  function title(node: VNode, head: HTMLElement) {
    if (hasChildren(node) && isTextNode(node.vchildren[0])) {
      return [
        createElement(node, fUtil),
        head.querySelector('title')
      ];
    }
  }

  function meta(node: VNode, head: HTMLElement) {
    if (hasAttributes(node, ['name', 'content'])) {
      const existingElement = head.querySelector(`meta[name="${node.vattrs.name}"]`);
      if (existingElement !== null) {
        return [
          createElement(node, fUtil),
          existingElement
        ];
      } else {
        return createElement(node, fUtil);
      }
    }
  }

  function link(node: VNode) {
    if (!hasChildren(node)) {
      return createElement(node, fUtil);
    }
  }

  function style(node: VNode) {
    if (hasChildren(node) && isTextNode(node.vchildren[0])) {
      return createElement(node, fUtil);
    }
  }

  function script(node: VNode) {
    if (hasChildren(node) || hasAttributes(node)) {
      return createElement(node, fUtil);
    }
  }

  function base(node: VNode) {
    if (!hasChildren(node) && hasAttributes(node)) {
      return createElement(node, fUtil);
    }
  }

  const template = (node) => createElement(node, fUtil);
  const noscript = (node) => createElement(node, fUtil); // SSR only

  return {
    title,
    meta,
    link,
    style,
    script,
    base,
    template,
    noscript
  }
}