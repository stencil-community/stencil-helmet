import type { ChildNode, VNode } from '@stencil/core';

const isObject = (val: any) => !Array.isArray(val) && val !== null && typeof val === 'object';

export const hasChildren = ({ vchildren }: ChildNode) => Array.isArray(vchildren);

export const hasAttributes = ({ vattrs }: ChildNode, requiredAttrs: string[] = []) =>
  isObject(vattrs) && requiredAttrs.every(vattrs.hasOwnProperty.bind(vattrs));

export const isTextNode = ({ vtext }: ChildNode) => typeof vtext === 'string';

// Can't use instanceof HTMLElement because MockHTMLElement during pre-rendering isn't
export const isElement = (val: any) => typeof val === 'object' && val.nodeType === 1 && typeof val.ownerDocument === 'object';

export const isElementArray = (val: any) => Array.isArray(val) && val.every(isElement);

export const convertToPublic = (node: VNode): ChildNode => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$,
});