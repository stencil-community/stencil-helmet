import { isElement, isElementArray } from './util';
import type { ChildNode, FunctionalUtilities } from '@stencil/core';

export const createElement = ({ vtag, vattrs, vchildren, vtext }: ChildNode, utils: FunctionalUtilities) => {
  if (vtext != null) {
    return document.createTextNode(vtext);
  }

  const element = document.createElement(vtag as string);

  if (vattrs != null) {
    for (const key in vattrs) {
      element.setAttribute(key, vattrs[key]);
    }
  }

  if (vchildren != null) {
    utils.forEach(vchildren, (child: ChildNode) => {
      element.appendChild(createElement(child, utils));
    });
  }

  return element;
};

export const shouldApplyToHead = (val: any) => isElement(val) || (isElementArray(val) && val.length === 2);

export const applyToHead = (element: HTMLElement | HTMLElement[]) => {
  if (Array.isArray(element)) {
    return document.head.replaceChild(element[0], element[1]);
  }
  return document.head.appendChild(element);
};