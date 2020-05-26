import { mount } from "enzyme";
import CardTabs from "./CardTabs";

const config = [
  { id: 1, title: "kaka", body: "test" },
  { id: 2, title: "kaka2", body: "test2" },
];

describe("CardTabs component", () => {
  it("should render without explosion", () => {
    const CardTabsWrapper = mount(<CardTabs config={config} />);

    expect(CardTabsWrapper.length).toEqual(1);
  });

  it("should render tabs", () => {
    const CardTabsWrapper = mount(<CardTabs config={config} />);

    // it should have 2 children
    expect(CardTabsWrapper.find("li")).toHaveLength(2);
    // make sure it render title
    expect(CardTabsWrapper.first().find("a")).toEqual(config[0].title);
  });

  // it should render containers
});
