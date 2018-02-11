import React, {PureComponent} from "react"
import {hot} from "react-hot-loader"

import "./App.scss"
import Title from "./Title"

export class App extends PureComponent {
  public render() {
    return (
      <div className="app">
        <Title message={"Hello World!"} />
      </div>
    )
  }
}

export default hot(module)(App)
