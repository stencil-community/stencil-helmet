import { VNode } from './types';

const head = document.head;

export const createElement = (tagName, attributes) => {
  const element = document.createElement(tagName);
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });
  return element;
};

export const addElementToHead = (node: VNode) =>
  head.appendChild(createElement(node.vtag, node.vattrs));
