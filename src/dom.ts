import { VNode, FunctionalUtilities } from './types';
import { isElement, isElementArray } from './util';

export const createElement = (node: VNode, fUtil: FunctionalUtilities) => {
  const vtag = fUtil.getTag(node);
  const vtext = fUtil.getText(node);
  const vattrs = fUtil.getAttributes(node);
  const vchildren = fUtil.getChildren(node);

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
      element.appendChild(createElement(child, fUtil));
    }
  }

  return element;
};

export const shouldApplyToHead = (val: any) =>
  isElement(val) || isElementArray(val) && val.length === 2;

export const applyToHead = (element: HTMLElement | HTMLElement[]) => {
  if (Array.isArray(element)) {
    return document.head.replaceChild.apply(document.head, element);
  }
  return document.head.appendChild(element);
}
