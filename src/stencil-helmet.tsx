import render from './render';

declare const h: Function;

const validTagNames = Object.keys(render);

const isValidNode = VNode =>
  validTagNames.indexOf(VNode.vtag) > -1;

const renderToHead = VNode =>
  render[VNode.vtag](VNode);

const StencilHelmet = ({ children }: { [key: string]: any }) => {
  children
    .filter(isValidNode)
    .forEach(renderToHead);
  return <span></span>; // return null once that's supported
};

export default StencilHelmet;
