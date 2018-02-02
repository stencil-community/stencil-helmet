import {
  hasAttributes,
  hasChildren,
  isTextNode
} from '../src/util';

describe('hasChildren', () => {
  it('checks that vchildren is an Array', () => {
    expect(hasChildren({})).toBe(false);
    expect(hasChildren({ vchildren: [] })).toBe(true);
    expect(hasChildren({ vchildren: null })).toBe(false);
  })
});

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


