import type { ChildNode } from '@stencil/core';

const isObject = (val: any) => !Array.isArray(val) && val !== null && typeof val === 'object';

export const hasAttributes = ({ vattrs }: ChildNode, requiredAttrs: string[] = []) =>
  isObject(vattrs) && requiredAttrs.every(vattrs.hasOwnProperty.bind(vattrs));

export const isTextNode = ({ vtext }: ChildNode) => typeof vtext === 'string';

// Can't use instanceof HTMLElement because MockHTMLElement during pre-rendering isn't
export const isElement = (val: any) => typeof val === 'object' && val.nodeType === 1 && typeof val.ownerDocument === 'object';

export const isElementArray = (val: any) => Array.isArray(val) && val.every(isElement);
