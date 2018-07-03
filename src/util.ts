import { VNode, FunctionalUtilities } from './types';

const isObject = (val: any) =>
  !Array.isArray(val) && val !== null && typeof val === 'object';

export const isElement = (val: any) =>
  val instanceof HTMLElement;

export const isElementArray = (val: any) =>
  Array.isArray(val) && val.every(isElement);

export default function util(fUtil: FunctionalUtilities) {

  const hasChildren = (node: VNode) =>
    Array.isArray(fUtil.getChildren(node));

  const hasAttributes = (node: VNode, requiredAttrs: string[] = []) => {
    const vattrs = fUtil.getAttributes(node);
    return isObject(vattrs) && requiredAttrs.every(vattrs.hasOwnProperty.bind(vattrs));
  }

  const isTextNode = (node: VNode) =>
    typeof fUtil.getText(node) === 'string';

  return {
    hasChildren,
    hasAttributes,
    isTextNode
  };
}
