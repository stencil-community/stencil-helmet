import { createElement, shouldApplyToHead, applyToHead } from '../src/dom';
import { VNode } from '../src/types';

const testVNode: VNode = {
  vtag: 'span',
  vattrs: {
    id: 'foo'
  },
  vchildren: [{
    vtext: 'bar'
  }],
  vtext: null
};

describe('createElement', () => {
  it('returns an element', () => {
    expect(createElement(testVNode))
      .toBeInstanceOf(HTMLElement);
  })

  it('assigns attributes', () => {
    expect((createElement(testVNode) as HTMLElement).id)
      .toBe('foo');
  });

  it ('works recursively', () => {
    expect(createElement(testVNode).hasChildNodes())
      .toBe(true);
  });

  it('returns text nodes', () => {
    expect(createElement(testVNode).firstChild)
      .toBeInstanceOf(Text);
  });
});

describe('shouldApplyToHead', () => {
  it('returns true for HTMLElement', () => {
    expect(shouldApplyToHead(createElement(testVNode))).toBe(true);
  });

  it('returns true for HTMLElement[]', () => {
    expect(shouldApplyToHead([
      createElement(testVNode),
      createElement(testVNode)
    ])).toBe(true);
  });

  it('checks for HTMLElement[] length of 2', () => {
    expect(shouldApplyToHead([
      createElement(testVNode)
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
  const element = createElement(testVNode) as HTMLElement;
  const otherElement = createElement(testVNode) as HTMLElement;

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
