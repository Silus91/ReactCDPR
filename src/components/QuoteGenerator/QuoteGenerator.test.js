import { mount } from "enzyme";
import QuoteGenerator from "./QuoteGenerator";
import React from "react";

describe("Quotegenerator component", () => {
  const QuoteGeneratorWrapper = mount(<QuoteGenerator allQuotes={allQuotes} />);
  it("should render without explosion", () => {
    expect(QuoteGeneratorWrapper.length).toEqual(1);
  });
  it("should render span", () => {
    expect(QuoteGeneratorWrapper.find("span"));
  });
  it("should render content header", () => {
    expect(QuoteGeneratorWrapper.find("h5"));
  });
});
