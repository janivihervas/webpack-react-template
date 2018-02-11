import React from "react"
import enzyme from "enzyme"
import Title from "./Title"

describe("<Title>", () => {
  it("should render props", () => {
    const el = enzyme.shallow(<Title message={"message"} />)
    expect(el.find("h1").text()).toEqual("message")
  })
})
