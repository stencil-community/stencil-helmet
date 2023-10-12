import type { ChildNode, FunctionalUtilities, VNode } from '@stencil/core';
import { createElement } from './dom';
import { hasAttributes, isTextNode } from './util';

const hasChildren = (node: ChildNode) => Array.isArray(node.vchildren);

const getFirstChild = (vchildren: VNode[], utils: FunctionalUtilities) => {
  let firstChild = null;
  utils.forEach(vchildren || [], (c: ChildNode, i: number) => {
    if (i === 0) {
      firstChild = c;
      return;
    }
  });
  return firstChild;
}

function title(node: ChildNode, head: HTMLElement, utils: FunctionalUtilities) {
  const firstChild = getFirstChild(node.vchildren || [], utils);
  if (firstChild && isTextNode(firstChild)) {
    return [createElement(node, utils), head.querySelector('title')];
  }
}

function meta(node: ChildNode, head: HTMLElement, utils: FunctionalUtilities) {
  const namePropKey = (() => {
    if (node.vattrs?.property) {
      return 'property';
    }

    if (node.vattrs?.itemprop || node.vattrs?.itemProp) {
      return 'itemprop';
    }

    if (node.vattrs?.httpequiv || node.vattrs?.httpEquiv) {
      return 'httpequiv';
    }

    return 'name';
  })();
  const namePropValue = node.vattrs?.property || node.vattrs?.name || node.vattrs?.itemprop || node.vattrs?.itemProp || node.vattrs?.httpequiv || node.vattrs?.httpEquiv;

  const existingElement = head.querySelector(`meta[${namePropKey}="${namePropValue}"]`);
  if (existingElement !== null) {
    return [createElement(node, utils), existingElement];
  } else {
    return createElement(node, utils);
  }
}

function link(node: ChildNode, _head: HTMLElement, utils: FunctionalUtilities) {
  if (!hasChildren(node)) {
    return createElement(node, utils);
  }
}

function style(node: ChildNode, _head: HTMLElement, utils: FunctionalUtilities) {
  const firstChild = getFirstChild(node.vchildren || [], utils);
  if (firstChild && isTextNode(firstChild)) {
    return createElement(node, utils);
  }
}

function script(node: ChildNode, _head: HTMLElement, utils: FunctionalUtilities) {
  if (hasChildren(node) || hasAttributes(node)) {
    return createElement(node, utils);
  }
}

function base(node: ChildNode, _head: HTMLElement, utils: FunctionalUtilities) {
  if (!hasChildren(node) && hasAttributes(node)) {
    return createElement(node, utils);
  }
}

const template = createElement;
const noscript = createElement; // SSR only

const types = {
  title,
  meta,
  link,
  style,
  script,
  base,
  template,
  noscript,
} as { [key: string]: any };

export default types;
