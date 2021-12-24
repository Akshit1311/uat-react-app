import React from "react";
import MapComponent from "./MapComponent";

export default function DisabledMap(props: any) {
  const { mapViewResource } = props;
  return (
    <div className="position-relative">
      <MapComponent
        mapViewResource={mapViewResource}
        viewAreaCircle="-20 0 900 800"
        viewAreaMap="0 0 1030 906"
        scaleBarVisible={false}
      />
      <div className="position-absolute h-100 w-100" style={{ zIndex: 10, top: 0, left: 0 }}>

      </div>
    </div>
  );
}
