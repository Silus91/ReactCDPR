import React from "react";
import { shallow } from "enzyme";
import TextInput from "./TextInput";

const simulateOnChangeInput = (wrapper, inputSelector, newValue) => {
  const input = wrapper.find(inputSelector);
  input.simulate("change", {
    target: { value: newValue },
  });
  return wrapper.find(inputSelector);
};

describe("Text input", () => {
  const TextInputWrapper = shallow(<TextInput />);
  it("should render without explosion", () => {
    expect(TextInputWrapper).toBeTruthy();
  });
  it("should render icon", () => {
    expect(TextInputWrapper.find("i"));
  });
  it("should render label", () => {
    expect(TextInputWrapper.find("label"));
  });
  it("should render input", () => {
    expect(TextInputWrapper.find("input"));
  });
  it("should render span", () => {
    expect(TextInputWrapper.find("span"));
  });
  //   it("should let me fill form", () => {
  //     const TextInputWrapper = shallow(<TextInput />);
  //     // const nameInput = simulateOnChangeInput(
  //     //   TextInputWrapper,
  //     //   "#name",
  //     //   "testName"
  //     // );
  //     const inputTrial = TextInputWrapper.find("input");
  //     const test = inputTrial.simulate("change");
  //     expect(test).toHaveBeenCalled();
  //     // expect(nameInput.props().value).toEqual("testName");
  //   });
});
