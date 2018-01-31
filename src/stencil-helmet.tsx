import render from './render';
import { TAG_NAMES } from './constants';

declare const h: Function;

const isValidNode = VNode =>
  TAG_NAMES.indexOf(VNode.vtag) > -1;

const renderToHead = VNode =>
  render[VNode.vtag](VNode);

const StencilHelmet = ({ children }: { [key: string]: any }) => {
  children
    .filter(isValidNode)
    .forEach(renderToHead);
  return <span></span>; // return null once that's supported
};

export default StencilHelmet;
