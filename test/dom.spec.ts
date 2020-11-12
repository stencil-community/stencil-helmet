import { createElement, shouldApplyToHead, applyToHead } from '../src/dom';

import type { ChildNode, FunctionalUtilities, VNode } from '@stencil/core';

const convertToPublic = (node: VNode): ChildNode => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$,
});

const convertToPrivate = (node: ChildNode): VNode => {
  const vnode = newVNode(node.vtag as any, node.vtext);
  vnode.$attrs$ = node.vattrs;
  vnode.$children$ = node.vchildren;
  vnode.$key$ = node.vkey;
  vnode.$name$ = node.vname;
  return vnode;
};

export const newVNode = (tag: string, text: string) => {
  const vnode: VNode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null,
  };
  vnode.$attrs$ = null;
  vnode.$key$ = null;
  vnode.$name$ = null;
  return vnode;
};

const mockUtils: FunctionalUtilities = {
  forEach: () => { },
  map: (children: VNode[], cb: (vnode: ChildNode, index: number, array: ChildNode[]) => ChildNode): VNode[] => {
    return children.map(convertToPublic).map(cb).map(convertToPrivate);
  }
}

const testVNode: ChildNode = {
  vtag: 'span',
  vattrs: {
    id: 'foo'
  },
  vchildren: [{
    vtext: 'bar'
  } as any],
  vtext: null
};

describe('createElement', () => {
  it('returns an element', () => {
    expect(createElement(testVNode, mockUtils))
      .toBeInstanceOf(HTMLElement);
  })

  it('assigns attributes', () => {
    expect((createElement(testVNode, mockUtils) as HTMLElement).id)
      .toBe('foo');
  });

  it('works recursively', () => {
    expect(createElement(testVNode, mockUtils).hasChildNodes())
      .toBe(true);
  });

  it('returns text nodes', () => {
    expect(createElement(testVNode, mockUtils).firstChild)
      .toBeInstanceOf(Text);
  });
});

describe('shouldApplyToHead', () => {
  it('returns true for HTMLElement', () => {
    expect(shouldApplyToHead(createElement(testVNode, mockUtils))).toBe(true);
  });

  it('returns true for HTMLElement[]', () => {
    expect(shouldApplyToHead([
      createElement(testVNode, mockUtils),
      createElement(testVNode, mockUtils)
    ])).toBe(true);
  });

  it('checks for HTMLElement[] length of 2', () => {
    expect(shouldApplyToHead([
      createElement(testVNode, mockUtils)
    ])).toBe(false);
  });

  it('returns false for non-HTMLElements', () => {
    expect(shouldApplyToHead(5)).toBe(false);
    expect(shouldApplyToHead(document.createTextNode('foo'))).toBe(false);
    expect(shouldApplyToHead({})).toBe(false);
  });
});

describe('applyToHead', () => {
  document.head.innerHTML = ``;
  const element = createElement(testVNode, mockUtils) as HTMLElement;
  const otherElement = createElement(testVNode, mockUtils) as HTMLElement;

  it('appends single elements to head', () => {
    applyToHead(element);
    expect(document.head.firstChild).toBe(element);
    expect(document.head.children.length).toBe(1);
  });

  it('replaces pairs of nodes with replaceChild', () => {
    applyToHead([otherElement, element]);
    expect(document.head.firstChild).toBe(otherElement);
    expect(document.head.children.length).toBe(1);
  });
});
