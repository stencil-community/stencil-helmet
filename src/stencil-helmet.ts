import render from './render';
import { VNode, Props, FunctionalComponent } from './types';
import { shouldApplyToHead, applyToHead } from './dom';


export const Helmet: FunctionalComponent<Props> = ({ children = [] }, fUtil) => {
  const renderFns = render(fUtil);
  const headExists = document && document.head;

  const validTagNames = Object.keys(renderFns);

  const isValidNode = (node: VNode) => {
    const tagName = fUtil.getTag(node);
    return validTagNames.indexOf(tagName as string) > -1;
  }

  const renderNode = (node: VNode) => {
    const tagName = fUtil.getTag(node);
    const currentAttributes = fUtil.getAttributes(node);
    return renderFns[tagName](currentAttributes, document.head);
  }

  if (headExists) {
    children
      .filter(isValidNode)
      .map(renderNode)
      .filter(shouldApplyToHead)
      .forEach(applyToHead)
  }
  return null;
};

export default Helmet;
