import React, { useContext } from "react";
import {
  stateWiseMap,
  StateWiseMap as StateWiseMapType,
} from "../../../config/stateWiseMap";
import styled from "styled-components";
import Maharashtra from "./statesDistrictView/Maharashtra.json"
import { ThemeColorIdentifier } from "../../../helper-function/themeColor";
import { ThemeContext } from "../../../config/context";
import { Tooltip as MuiToolTip } from "@mui/material";
import { DistrictBorderType, StatesDistrictView, StateWiseMapViewType } from "./statesDistrictView";
export interface StateViewProps {
  selectedArea: string;
  colorTheme: any;
}

const MapWrapper = styled.div`
  color: ${(props) => props.theme.map.color} !important;
`;

export default function StateView({ selectedArea, colorTheme }: StateViewProps) {
  const theme = useContext(ThemeContext)
  const componentProps = {
    tooltip: {
      sx: {
        fontSize: "15px",
        background: theme.tooltip.background,
        border: `2px solid ${ThemeColorIdentifier( colorTheme )}`,
        borderRadius: "5px",
        color: theme.tooltip.text,
        cursor: "grab",
        zIndex: 10000
      },
    },
    arrow: {
      sx: {
        color: theme.tooltip.background,
        "&::before": {
          border: `2px solid ${ThemeColorIdentifier( colorTheme )}`,
          backgroundColor: theme.tooltip.background,
          boxSizing: "border-box"
        },
      }
    }
  }
  return (
    <MapWrapper
      className="m-2 mt-0 pt-0 d-flex justify-content-center"
      style={{ position: "relative" }}
    >
      <svg viewBox="-50 0 550 550">
        {/* {
          Maharashtra.map((district, index:number)=>(
            <MuiToolTip placement="top" title={district.name} followCursor arrow componentsProps={componentProps}>
            <path stroke="black" strokeWidth={"1"} key={index} fill="white" d={district.d} />
            </MuiToolTip>
          ))
        } */}
        {StatesDistrictView
          .filter((state: StateWiseMapViewType) => {
            return state.id === selectedArea;
          })
          .map((state: StateWiseMapViewType, index:number) => state.path.map((district: DistrictBorderType)=>(
            <MuiToolTip placement="top" title={district.name} followCursor arrow componentsProps={componentProps}>
              <path stroke="black" strokeWidth={"1"} key={index} fill="white" d={district.d} />
            </MuiToolTip>
          )) )}
      </svg>
    </MapWrapper>
  );
}
