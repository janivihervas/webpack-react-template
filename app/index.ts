// import React from "react"
// import ReactDOM from "react-dom"
// import App from "./components/App"
import "./index.scss"
import "babel-polyfill"
//
// function mounted() {
//   console.log("App mounted!")
// }
//
// ReactDOM.render(<App mounted={mounted} />, document.getElementById("app"))
import _ from "lodash"
const app = document.getElementById("app")
if (app !== null) {
  app.innerHTML = `<h1>Hello world! ${_.random()}</h1>`
}