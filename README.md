# Stencil Helmet

This is a [Stencil](https://github.com/ionic-team/stencil) component meant to be used within Stencil apps to declaratively update the document `<head>`. It renders nothing and so can only be used within a Stencil app, not as a standalone web component.

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [To Do](#to-do)

---

## Installation

You can install stencil-helmet like you would any other module with `npm`:

```
npm install @stencil/helmet
```

## Usage

Use stencil-helmet by importing it as needed and nesting tags that you would normally place in `<head>`.

```jsx
import Helmet from '@stencil/helmet';

export class MyComponent{
  // ...

  render() {
    return (
      <div>
        <Helmet>
          <title>{this.title}</title>
          <meta name="description" content={this.description}/>
        </Helmet>
        <h1>{this.title}</h1>
      </div>
    );
  }
}
```

## Contributing

To get going, just clone this repo and then:

```
npm install
npm start
```

To test in a working Stencil app, I'd recommend using [`npm link`](https://docs.npmjs.com/cli/link).

## To Do

- [ ] Set up and write unit tests.
- [ ] Add contributing guidelines.
- [ ] Add GitHub issue template.

