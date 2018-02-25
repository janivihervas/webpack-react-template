# Template project for React

[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)

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
