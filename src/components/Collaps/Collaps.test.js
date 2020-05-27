import { mount } from "enzyme";
import Collaps from "./Collaps";
import React from "react";
import collaps from "../../resources/textConfigs/collaps";

describe("Collaps component", () => {
  const CollapsWrapper = mount(<Collaps collaps={collaps} />);
  it("should render without explosion", () => {
    expect(CollapsWrapper.length).toEqual(1);
  });
});
