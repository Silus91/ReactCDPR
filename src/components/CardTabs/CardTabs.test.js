import { mount } from "enzyme";
import CardTabs from "./CardTabs";
import React from "react";
import configs from "../../resources/textConfigs/configsCDPR";

describe("CardTabs component", () => {
  const CardTabsWrapper = mount(<CardTabs configs={configs} />);
  it("should render without explosion", () => {
    expect(CardTabsWrapper.length).toEqual(1);
  });
  it("should render tabs", () => {
    expect(CardTabsWrapper.find("li").length).toEqual(configs.length);
  });
  it("should render content text", () => {
    expect(CardTabsWrapper.find("p").length).toEqual(configs.length);
  });
});
