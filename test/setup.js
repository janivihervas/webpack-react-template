require('babel-register')({
  // ignore node_modules except libraries that need to be babelified
  // ignore: /node_modules\/(?!(lib1|lib2))/
});

require.extensions['.scss'] = function () {
  return null;
};

require.extensions['.css'] = function () {
  return null;
};
