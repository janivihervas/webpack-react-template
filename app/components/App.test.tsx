import React from "react"
import TestUtils from "react-addons-test-utils"
import {describe, it} from "mocha"
import {assert} from "chai"

import App from "./App.jsx"
import {assertReactElements} from "../helpers"

describe("App", () => {
  const renderer = TestUtils.createRenderer()

  it("should render correctly", () => {
    const fn = () => {}

    renderer.render(<App mounted={fn} />)
    const el = renderer.getRenderOutput()

    assertReactElements(
      el,
      <div>
        <h1 />
      </div>,
    )
  })

  it("should call this.props.mounted() on componentDidMount", () => {
    let called = false
    const fn = () => {
      called = true
    }

    renderer.render(<App mounted={fn} />)

    const instance = renderer._instance._instance

    assert(!called)
    instance.componentDidMount()
    assert(called)
  })
})
