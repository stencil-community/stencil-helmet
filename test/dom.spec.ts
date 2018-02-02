import { createElement } from '../src/dom';
import { VNode } from '../src/types';

const testVNode: VNode = {
  vtag: 'span',
  vattrs: {
    id: 'foo'
  },
  vchildren: [{
    vtext: 'bar'
  }]
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
