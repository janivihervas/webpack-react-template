# Template project for Webpack and React

Tired of those "simple" Webpack configuration files? Me too, that's why 
I created this template project. The main focus of this project is in 
Webpack configuration and testing setup, so you can also use frameworks other 
than React or add frameworks like Redux.

Features:
 - Simple, production-ready, fully-featured and reasonaboutable [Webpack](http://webpack.github.io/) configuration
 - [React](https://facebook.github.io/react/)
 - [react-hot-loader](https://github.com/gaearon/react-hot-loader)
 - ES6
 - [SCSS](http://sass-lang.com/)
 - [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) for testing
 - [Istanbul](https://github.com/gotwarlost/istanbul) code coverage
 - [ESLint](http://eslint.org/) and [Stylelint](https://github.com/stylelint/stylelint) for linting
 - [Docker](https://www.docker.com/) image based on [alpine:3.7](https://hub.docker.com/_/alpine/), [nginx](https://nginx.org/) as a server
 
## Setup

### Install

```
npm install
```

### Development

```
npm run serve
```

### Code quality

Run tests:
```
npm test
```

Generate coverage:
```
npm run test:coverage
```

Check coverage (edit limits in [`.istanbul.yml`](.istanbul.yml#L37-L49):
```
npm run test:check-coverage
```

Linting:
```
npm run lint:js
```
for JavaScript files and
```
npm run lint:scss
```
for SCSS files.

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
