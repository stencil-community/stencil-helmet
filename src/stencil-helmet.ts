import RenderTypes from './render';
import { shouldApplyToHead, applyToHead } from './dom';
import type { VNode, FunctionalUtilities, ChildNode } from '@stencil/core';

const headExists = document && document.head;

const validTagNames = Object.keys(RenderTypes);

const isValidNode = (node: VNode) => validTagNames.indexOf(node.$tag$ as string) > -1;

const renderNode = (node: ChildNode): HTMLElement => RenderTypes[node.vtag as string](node, document.head);

export const Helmet = (_props: any, children: VNode[], utils: FunctionalUtilities) => {
  if (!headExists) {
    return null;
  }

  const validChildren = children.filter(isValidNode);

  // Build an HTMLElement for each provided virtual child
  const rendered: HTMLElement[] = [];
  utils.forEach(validChildren, (n: ChildNode) => {
    rendered.push(renderNode(n));
  });

  rendered
    .filter(shouldApplyToHead)
    .forEach(applyToHead as any);

  return null;
}

export default Helmet;