import React from "react";
import MapComponent from "./MapComponent";

export default function DisabledMap(props: any) {
  const { mapViewResource, countResource } = props;
  return (
    <div className="sticky-disabled-map">
      <MapComponent
        mapViewResource={mapViewResource}
        countResource={countResource}
        viewAreaCircle="-20 0 900 800"
        viewAreaMap="0 0 1030 906"
        scaleBarVisible={false}
        startupType={props.startupType}
      />
    </div>
  );
}
