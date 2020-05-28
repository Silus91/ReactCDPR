import React from "react";
import { shallow } from "enzyme";
import SocialButton from "./SocialButton";

describe("Social Button", () => {
  const SocialButtonWrapper = shallow(<SocialButton />);
  it("should render without explosion", () => {
    expect(SocialButtonWrapper).toBeTruthy();
  });
  it("should render a tag", () => {
    expect(SocialButtonWrapper.find("a"));
  });
  it("should render img", () => {
    expect(SocialButtonWrapper.find("img"));
  });
});
