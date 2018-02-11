import React from "react"
import enzyme from "enzyme"
import renderer from "react-test-renderer"

import {App} from "./App"

describe("<App>", () => {
  it("should render", () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should render Hello World!", () => {
    const app = enzyme.render(<App />)
    expect(app.find("h1").text()).toEqual("Hello World!")
  })
})
