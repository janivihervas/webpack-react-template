global.fetch = require("node-fetch")

const errHandler = (...args) => {
  throw new Error(args.join(" "))
}
console.error = errHandler
console.warning = errHandler
