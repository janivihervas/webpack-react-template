# Template project for React

<!-- toc -->

* [Setup](#setup)
  * [Prerequisites](#prerequisites)
  * [Install](#install)
  * [Development](#development)
  * [Test](#test)
  * [Format](#format)
  * [Lint](#lint)
  * [Build](#build)
* [License](#license)

<!-- tocstop -->

Simple and reasonaboutable, fully-featured, production-ready React project template.

**NOTE**: Hot reload of React components is not working properly.

Tools and frameworks used:

* [Webpack v3](http://webpack.github.io/) for bundling
* [React](https://facebook.github.io/react/) for rendering DOM
* [Jest](https://facebook.github.io/jest/) for testing
* [Typescript](https://www.typescriptlang.org/) for static types
* [SCSS](http://sass-lang.com/) for styles
* [Docker](https://www.docker.com/) image based on [alpine:3.7](https://hub.docker.com/_/alpine/), [nginx](https://nginx.org/) as a server
* [Prettier](https://github.com/prettier/prettier) for formatting
* [TSLint](https://palantir.github.io/tslint/) and [Stylelint](https://github.com/stylelint/stylelint) for linting

## Setup

### Prerequisites

You need to install

* [`parallel`](https://www.gnu.org/software/parallel/)
* [`nvm`](https://github.com/creationix/nvm#installation)

and run

```
nvm install
```

### Install

```
npm install
```

### Development

```
npm run serve
```

### Test

```
npm test
```

Update snapshots:

```
npm run test:update
```

### Format

```
npm run format
```

Generate table of contents for Markdown files:

```
npm run toc
```

### Lint

```
npm run lint
```

Fix linting errors:

```
npm run lint:fix
```

### Build

Build dist:

```
npm run dist
```

**NOTE:** source maps are included in dist, see [`webpack.config.js`](webpack.config.js#L147) to remove them

Build Docker image:

```
npm run docker:build
```

Run Docker container in port 80 (remove running container with `npm run docker:remove`):

```
npm run docker
```

## License

[MIT](LICENSE)
