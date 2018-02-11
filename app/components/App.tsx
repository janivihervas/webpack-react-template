import React, {PureComponent} from "react"
import "./App.scss"

export interface Props {
  message: string
}

export default class App extends PureComponent<Props> {
  render() {
    return (
      <div className="app">
        <h1>{this.props.message}</h1>
        <p>lololo</p>
      </div>
    )
  }
}
