import {configure} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({adapter: new Adapter()})

global.fetch = require("node-fetch")

const errHandler = (...args) => {
  throw new Error(args.join(" "))
}
console.error = errHandler
console.warning = errHandler
