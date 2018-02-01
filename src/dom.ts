import { VNode } from './types';

const head = document.head;

export const createElement = ({ vtag, vattrs, vchildren, vtext }: VNode) => {
  if (vtext !== undefined) {
    return document.createTextNode(vtext);
  }

  const element = document.createElement(vtag as string);

  if (vattrs !== undefined) {
    for (const key in vattrs) {
      element.setAttribute(key, vattrs[key]);
    }
  }

  if (vchildren !== undefined) {
    for (const child of vchildren) {
      element.appendChild(createElement(child));
    }
  }

  return element;
};

export const addElementToHead = (node: VNode) =>
  head.appendChild(createElement(node));
