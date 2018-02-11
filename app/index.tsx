import "./index.scss"
import "babel-polyfill"
import "whatwg-fetch"
import React from "react"
import {render} from "react-dom"

import App from "./components/App"

render(<App />, document.getElementById("app"))
