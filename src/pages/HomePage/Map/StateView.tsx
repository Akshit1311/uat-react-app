import React from "react";
import {
  stateWiseMap,
  StateWiseMap as StateWiseMapType,
} from "../../../config/stateWiseMap";
import styled from "styled-components";

export interface StateViewProps {
  selectedArea: string;
}

const MapWrapper = styled.div`
  color: ${(props) => props.theme.map.color} !important;
`;

export default function StateView({ selectedArea }: StateViewProps) {
  return (
    <MapWrapper
      className="m-2 mt-0 pt-0 d-flex justify-content-center"
      style={{ position: "relative" }}
    >
      <svg viewBox="-50 0 550 550">
        {stateWiseMap
          .filter((state: StateWiseMapType) => {
            return state.id === selectedArea;
          })
          .map((state: StateWiseMapType, index:number) => (
            <path stroke="black" strokeWidth={"1"} key={index} fill="white" d={state.d} />
          ))}
      </svg>
    </MapWrapper>
  );
}
