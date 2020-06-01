import { mount } from "enzyme";
import QuoteGenerator from "./QuoteGenerator";
import React from "react";
import configs from "../../resources/textConfigs/configsCDPR";

describe("CardTabs component", () => {
  const QuoteGeneratorWrapper = mount(<QuoteGenerator allQuotes={allQuotes} />);
  it("should render without explosion", () => {
    expect(QuoteGeneratorWrapper.length).toEqual(1);
  });
  it("should render span", () => {
    expect(QuoteGeneratorWrapper.find("span"));
  });
  it("should render content text", () => {
    expect(QuoteGeneratorWrapper.find("h5"));
  });
});
