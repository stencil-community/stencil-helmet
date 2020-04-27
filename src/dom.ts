import { isElement, isElementArray, convertToPublic } from './util';
import type { ChildNode } from '@stencil/core';

export const createElement = ({ vtag, vattrs, vchildren, vtext }: ChildNode) => {
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
    for (const child of vchildren) {
      element.appendChild(createElement(convertToPublic(child)));
    }
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