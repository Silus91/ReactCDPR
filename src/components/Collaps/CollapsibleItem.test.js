import { shallow } from "enzyme";
import CollapsibleItem from "./CollapsibleItem";
import React from "react";
import collaps from "../../resources/textConfigs/collaps";

describe("Collaps component", () => {
  const CollapsibleItemWrapper = shallow(<CollapsibleItem collaps={collaps} />);
  it("should render without explosion", () => {
    expect(CollapsibleItemWrapper.length).toEqual(1);
  });
  it("should render title", () => {
    expect(CollapsibleItemWrapper.find("h6"));
  });
  it("should render content text", () => {
    expect(CollapsibleItemWrapper.find("span"));
  });
});
