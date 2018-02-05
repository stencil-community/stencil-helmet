import * as render from './render';
import { VNode, Props } from './types';
import { shouldApplyToHead, applyToHead } from './dom';

const validTagNames = Object.keys(render);

const isValidNode = (node: VNode) =>
  validTagNames.indexOf(node.vtag as string) > -1;

const renderNode = (node: VNode) =>
  render[node.vtag](node, document.head);

const StencilHelmet = ({ children }: Props) => {
  children
    .filter(isValidNode)
    .map(renderNode)
    .filter(shouldApplyToHead)
    .forEach(applyToHead);
  return <span></span>; // return null once that's supported
};

export default StencilHelmet;
