import React from "react";
import { shallow } from "enzyme";
import CountdownTimer from "./CountdownTimer";

describe("Countdown Timer", () => {
  const CountdownTimerWrapper = shallow(<CountdownTimer />);
  it("should render without explosion", () => {
    expect(CountdownTimerWrapper).toBeTruthy();
  });
  it("should render span", () => {
    expect(CountdownTimerWrapper.find("span").length).toEqual(4);
  });
});
