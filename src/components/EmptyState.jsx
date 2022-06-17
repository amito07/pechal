import React from "react";
import { Empty } from "antd";

import EmptyStateImage from "../assets/images/Empty-State.svg";

function EmptyState({ description }) {
  return <Empty style={{ marginTop: "5em" }} image={EmptyStateImage} description={description} />;
}

export default EmptyState;
