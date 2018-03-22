import { VNode } from '../src/types';
import * as render from '../src/render';

beforeEach(() => {
  document.head.innerHTML = '';
});

describe('title', () => {
  const titleNode: VNode = {
    vtag: 'title',
    vchildren: [{
      vtext: 'bar'
    }]
  };

  it('should only render a valid title', () => {
    expect(render.title(titleNode, document.head))
      .toBeInstanceOf(Array);
    expect(render.title({ ...titleNode, vchildren: null }, document.head))
      .toBeUndefined();
  });

  it('should return two elements', () => {
    expect(render.title(titleNode, document.head))
      .toHaveLength(2);
  });
});

describe('meta', () => {
  const metaNode: VNode = {
    vtag: 'meta',
    vattrs: {
      name: 'foo',
      content: 'bar'
    },
    vchildren: null,
    vtext: null
  };

  it('should require name and content attributes', () => {
    expect(render.meta({ ...metaNode, vattrs: null }, document.head))
      .toBeUndefined();
    expect(render.meta({ ...metaNode, vattrs: { name: 'foo' } }, document.head))
      .toBeUndefined();
  });

  it('should return one element without a match', () => {
    expect(render.meta(metaNode, document.head))
      .toBeInstanceOf(HTMLElement);
  });

  it('should return two elements with a match', () => {
    document.head.innerHTML = `<meta name="foo" content="test"/>`;
    expect(render.meta(metaNode, document.head))
      .toHaveLength(2);
  });
});

describe('link', () => {
  const linkNode: VNode = {
    vtag: 'link',
    vattrs: {
      name: 'foo',
      content: 'bar'
    },
    vchildren: null,
    vtext: null
  };

  it('should not render any children', () => {
    expect(render.link({
      ...linkNode,
      vchildren: [{
        vtag: 'span'
      }]
    })).toBeUndefined();
  });

  it('should render an element', () => {
    expect(render.link(linkNode))
      .toBeInstanceOf(HTMLElement);
  });
});

describe('style', () => {
  const styleNode: VNode = {
    vtag: 'style',
    vchildren: [{
      vtext: `body { color: blue; }`
    }],
    vattrs: null,
    vtext: null
  };

  it('should only render text children', () => {
    expect(render.style({
      ...styleNode,
      vchildren: null
    })).toBeUndefined();
  });

  it('should render an elment', () => {
    expect(render.style(styleNode))
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
    expect(render.script({
      ...scriptNode,
      vchildren: [{ vtext: 'alert("foo")' }]
    })).toBeInstanceOf(HTMLElement);
  });

  it('should render external scripts', () => {
    expect(render.script({
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
    expect(render.base({
      ...baseNode,
      vchildren: [{
        vtag: 'span'
      }]
    })).toBeUndefined();
  });

  it('should render an element', () => {
    expect(render.base(baseNode))
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
    expect(render.template(templateNode))
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
    expect(render.template(noscriptNode))
      .toBeInstanceOf(HTMLElement);
  });
});
