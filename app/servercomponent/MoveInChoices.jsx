import dynamic from "next/dynamic";
import React from "react";

const MoveInChoicesDynamic = dynamic(() =>
  import("@/components/move-in-choices/MoveInChoices")
);

export default function MoveInChoices() {
  return <MoveInChoicesDynamic />;
}
