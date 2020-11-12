import RenderTypes from './render';
import { shouldApplyToHead, applyToHead } from './dom';
import type { VNode, FunctionalUtilities, ChildNode } from '@stencil/core';

const headExists = document && document.head;

const validTagNames = Object.keys(RenderTypes);

const isValidNode = (node: ChildNode) => validTagNames.indexOf(node.vtag as string) > -1;

const renderNode = (node: ChildNode, utils: FunctionalUtilities): HTMLElement => RenderTypes[node.vtag as string](node, document.head, utils);

export const Helmet = (_props: any, children: VNode[], utils: FunctionalUtilities) => {
  console.log("HELMET2");
  console.trace();
  // eval('debugger');
  if (!headExists) {
    return null;
  }

  const rendered: HTMLElement[] = [];
  const validChildren = [];
  utils.forEach(children, (n: ChildNode) => {
    if (isValidNode(n)) {
      validChildren.push(n);
      rendered.push(renderNode(n, utils));
    }
  });

  console.log('RENDERING NODES', rendered, rendered.filter(shouldApplyToHead));
  // Build an HTMLElement for each provided virtual child
  rendered
    .filter(shouldApplyToHead)
    .forEach(applyToHead as any);

  return null;
}

export default Helmet;