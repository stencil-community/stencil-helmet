import type { ChildNode } from '@stencil/core';

import RenderTypes from '../src/render';

beforeEach(() => {
  document.head.innerHTML = '';
});

describe('title', () => {
  const titleNode: ChildNode = {
    vtag: 'title',
    vchildren: [{
      $text$: 'bar'
    } as any]
  };

  it('should only render a valid title', () => {
    expect(RenderTypes.title(titleNode, document.head))
      .toBeInstanceOf(Array);
    expect(RenderTypes.title({ ...titleNode, vchildren: null }, document.head))
      .toBeUndefined();
  });

  it('should return two elements', () => {
    expect(RenderTypes.title(titleNode, document.head))
      .toHaveLength(2);
  });
});

describe('meta', () => {
  const metaNode: ChildNode = {
    vtag: 'meta',
    vattrs: {
      name: 'foo',
      content: 'bar'
    },
    vchildren: null,
    vtext: null
  };

  it('should return one element without a match', () => {
    expect(RenderTypes.meta(metaNode, document.head))
      .toBeInstanceOf(HTMLElement);
  });

  it('should return two elements with a match', () => {
    document.head.innerHTML = `<meta name="foo" content="test"/>`;
    expect(RenderTypes.meta(metaNode, document.head))
      .toHaveLength(2);
  });
});

describe('link', () => {
  const linkNode: ChildNode = {
    vtag: 'link',
    vattrs: {
      name: 'foo',
      content: 'bar'
    },
    vchildren: null,
    vtext: null
  };

  it('should not render any children', () => {
    expect(RenderTypes.link({
      ...linkNode,
      vchildren: [{
        $tag$: 'span'
      }]
    })).toBeUndefined();
  });

  it('should render an element', () => {
    expect(RenderTypes.link(linkNode))
      .toBeInstanceOf(HTMLElement);
  });
});

describe('style', () => {
  const styleNode: ChildNode = {
    vtag: 'style',
    vchildren: [{
      $text$: `body { color: blue; }`
    } as any],
    vattrs: null,
    vtext: null
  };

  it('should only render text children', () => {
    expect(RenderTypes.style({
      ...styleNode,
      vchildren: null
    })).toBeUndefined();
  });

  it('should render an elment', () => {
    expect(RenderTypes.style(styleNode))
      .toBeInstanceOf(HTMLElement);
  });
});

describe('script', () => {
  const scriptNode = {
    vtag: 'script',
    vchildren: null,
    vattrs: null,
    vtext: null
  };

  it('should render inline scripts', () => {
    expect(RenderTypes.script({
      ...scriptNode,
      vchildren: [{ $text$: 'alert("foo")' }]
    })).toBeInstanceOf(HTMLElement);
  });

  it('should render external scripts', () => {
    expect(RenderTypes.script({
      ...scriptNode,
      vattrs: { src: '/script.js' }
    })).toBeInstanceOf(HTMLElement);
  });
});

describe('base', () => {
  const baseNode = {
    vtag: 'base',
    vattrs: {
      href: 'localhost'
    },
    vchildren: null,
    vtext: null
  };

  it('should not render any children', () => {
    expect(RenderTypes.base({
      ...baseNode,
      vchildren: [{
        $tag$: 'span'
      }]
    })).toBeUndefined();
  });

  it('should render an element', () => {
    expect(RenderTypes.base(baseNode))
      .toBeInstanceOf(HTMLElement);
  });
});

describe('template', () => {
  const templateNode = {
    vtag: 'template',
    vattrs: null,
    vchildren: null,
    vtext: null
  };

  it('should render an element', () => {
    expect(RenderTypes.template(templateNode))
      .toBeInstanceOf(HTMLElement);
  });
});

describe('noscript', () => {
  const noscriptNode = {
    vtag: 'noscript',
    vattrs: null,
    vchildren: null,
    vtext: null
  };

  it('should render an element', () => {
    expect(RenderTypes.template(noscriptNode))
      .toBeInstanceOf(HTMLElement);
  });
});
