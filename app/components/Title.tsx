import React, {PureComponent} from "react"

interface Props {
  message: string
}

export default class Title extends PureComponent<Props> {
  public render() {
    return <h1>{this.props.message}</h1>
  }
}
