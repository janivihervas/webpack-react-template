import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "./index.scss"

function mounted() {
  console.log("App mounted!")
}

ReactDOM.render(<App mounted={mounted} />, document.getElementById("app"))
