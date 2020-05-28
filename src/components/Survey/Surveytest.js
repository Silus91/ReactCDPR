import React from "react";
import { shallow } from "enzyme";
import Survey from "./Survey";

describe("Send Survey", () => {
  const SurveyWrapper = shallow(<Survey />);
  it("should render div", () => {
    expect(SurveyWrapper.find("div"));
  });
});
