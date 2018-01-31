import render from './render';
import { VNode, Props } from './types';

declare const h: Function;

const validTagNames = Object.keys(render);

const isValidNode = (node: VNode) =>
  validTagNames.indexOf(node.vtag as string) > -1;

const renderToHead = (node: VNode) =>
  render[node.vtag](node);

const StencilHelmet = ({ children }: Props) => {
  children
    .filter(isValidNode)
    .forEach(renderToHead);
  return <span></span>; // return null once that's supported
};

export default StencilHelmet;
