import { convertToPublic, hasAttributes, hasChildren, isTextNode } from './util';
import { createElement } from './dom';
import type { ChildNode } from '@stencil/core';

function title(node: ChildNode, head: HTMLElement) {
  const firstChild = (node.vchildren || [])[0];
  if (hasChildren(node) && isTextNode(convertToPublic(firstChild))) {
    return [createElement(node), head.querySelector('title')];
  }
}

function meta(node: ChildNode, head: HTMLElement) {

  const namePropKey = node.vattrs.property ? 'property' : 'name';
  const namePropValue = node.vattrs.property || node.vattrs.name;

  const existingElement = head.querySelector(`meta[${namePropKey}="${namePropValue}"]`);
  if (existingElement !== null) {
    return [createElement(node), existingElement];
  } else {
    return createElement(node);
  }
}

function link(node: ChildNode) {
  if (!hasChildren(node)) {
    return createElement(node);
  }
}

function style(node: ChildNode) {
  const firstChild = (node.vchildren || [])[0];
  if (hasChildren(node) && isTextNode(convertToPublic(firstChild))) {
    return createElement(node);
  }
}

function script(node: ChildNode) {
  if (hasChildren(node) || hasAttributes(node)) {
    return createElement(node);
  }
}

function base(node: ChildNode) {
  if (!hasChildren(node) && hasAttributes(node)) {
    return createElement(node);
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
