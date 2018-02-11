import "./index.scss"
import "babel-polyfill"
import "whatwg-fetch"
import App from "./components/App"

import React from "react"

import ReactDOM from "react-dom"
// import {AppContainer} from "react-hot-loader"

// const render = () => ReactDOM.render(
//   <AppContainer>
//     <App message={"Hello world!"} />
//   </AppContainer>,
//   document.getElementById("app"),
// )

// render()

// const hmrModule = module as any
// if (hmrModule.hot) {
//   hmrModule.hot.accept("./components/App", () => {
//     render()
//   })
// }

ReactDOM.render(
  <App message={"Hello world!"} />,
  document.getElementById("app"),
)