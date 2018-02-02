[![CircleCI](https://img.shields.io/circleci/project/github/ionic-team/stencil-helmet/master.svg)](https://circleci.com/gh/ionic-team/stencil-helmet)
[![@stencil/helmet](https://img.shields.io/npm/v/@stencil/helmet.svg)](https://npm.im/@stencil/helmet)

# Stencil Helmet

> Declaratively update the `<head>` from a Stencil app.

---

This is a [Stencil](https://github.com/ionic-team/stencil) component meant to be used within Stencil apps to declaratively update the document `<head>`. You pass it elements that you'd normally place in `<head>`, and it updates `<head>` accordingly. Each instance will override duplicate tags from preceding instances.

**Note** that, because it uses virtual DOM as input, stencil-helmet can only be used within Stencil apps and not as a standalone web component.

## Installation

```
npm install @stencil/helmet
```

## Usage

```jsx
import Helmet from '@stencil/helmet';

//...
export class MyComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>{this.title}</title>
          <meta name="description" content={this.description}/>
          <link rel="stylesheet" href="/styles.css"/>
        </Helmet>
      </div>
    );
  }
}
```
