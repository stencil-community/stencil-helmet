import render from './render';
import { VNode, Props } from './types';

const validTagNames = Object.keys(render);

const isValidNode = (node: VNode) =>
  validTagNames.indexOf(node.vtag as string) > -1;

const renderNode = (node: VNode) =>
  render[node.vtag](node);

const StencilHelmet = ({ children }: Props) => {
  children
    .filter(isValidNode)
    .forEach(renderNode);
  return <span></span>; // return null once that's supported
};

export default StencilHelmet;
