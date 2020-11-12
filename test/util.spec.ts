import {
  hasAttributes,
  isTextNode,
  isElement,
  isElementArray
} from '../src/util';

describe('hasAttributes', () => {
  it('checks that vattrs is an Object', () => {
    expect(hasAttributes({})).toBe(false);
    expect(hasAttributes({ vattrs: {} })).toBe(true);
    expect(hasAttributes({ vattrs: null })).toBe(false);
  });
});

describe('isTextNode', () => {
  it('checks that vtext is a string', () => {
    expect(isTextNode({})).toBe(false);
    expect(isTextNode({ vtext: '' })).toBe(true);
    expect(isTextNode({ vtext: 'foo' })).toBe(true);
    expect(isTextNode({ vtext: null })).toBe(false);
  });
});

describe('isElement', () => {
  it('checks for instance of HTMLElement', () => {
    expect(isElement(document.body)).toBe(true);
    expect(isElement(document.createTextNode('foo')))
      .toBe(false);
  });
});

describe('isElementArray', () => {
  it('checks for an HTMLElement array', () => {
    expect(isElementArray([document.body])).toBe(true);
    expect(isElementArray([
      document.body,
      document.createTextNode('foo')
    ])).toBe(false);
  });
});


