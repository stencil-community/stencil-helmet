import { VNode } from './types';

export const hasChildren = ({ vchildren }: VNode) =>
  Array.isArray(vchildren);

export const hasAttributes = ({ vattrs }: VNode, requiredAttrs: string[] = []) =>
  typeof vattrs === 'object' &&
  requiredAttrs.every(vattrs.hasOwnProperty.bind(vattrs));

export const isTextNode = ({ vtext }: VNode) =>
  typeof vtext === 'string';
