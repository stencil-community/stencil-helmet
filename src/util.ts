import { VNode } from './types';

const isObject = (val: any) =>
  !Array.isArray(val) && val !== null && typeof val === 'object';

export const hasChildren = ({ vchildren }: VNode) =>
  Array.isArray(vchildren);

export const hasAttributes = ({ vattrs }: VNode, requiredAttrs: string[] = []) =>
  isObject(vattrs) && requiredAttrs.every(vattrs.hasOwnProperty.bind(vattrs));

export const isTextNode = ({ vtext }: VNode) =>
  typeof vtext === 'string';

export const isElement = (val: any) =>
  val instanceof HTMLElement;

export const isElementArray = (val: any) =>
  Array.isArray(val) && val.every(isElement);
