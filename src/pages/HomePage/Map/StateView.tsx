import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { ThemeColorIdentifier } from "../../../helper-function/themeColor";
import { ThemeContext } from "../../../config/context";
import { Tooltip as MuiToolTip } from "@mui/material";
import {
  DistrictBorderType,
  StatesDistrictView,
  StateWiseMapViewType,
} from "./statesDistrictView";
import { StartupTypesKeys } from "../StateViewDataTable/table";

interface StatisticsDataCount {
  Exploring: number;
  Incubator: number;
  Corporate: number;
  SIH_Admin: number;
  Mentor: number;
  Academia: number;
  GovernmentBody: number;
  ConnectToPotentialPartner: number;
  IndiaMarketEntry: number;
  Individual: number;
  ServiceProvider: number;
  Investor: number;
  Startup: number;
  Accelerator: number;
  DpiitCertified: number;
  TaxExempted: number;
  WomenLed: number;
  FFS: number;
  PatentStartup: number;
  SeedFundStartup: number;
  ShowcasedStartups: number;
}
interface StatisticsData {
  districtId: string;
  district: string;
  stateId: string;
  state: string;
  statistics: StatisticsDataCount;
}

interface StatisticsDataMainObj {
  from: string;
  to: string;
  data: StatisticsData[];
}
export interface StateViewProps {
  selectedArea: string;
  colorTheme: any;
  startupType: any;
  data: StatisticsDataMainObj;
}

const MapWrapper = styled.div`
  color: ${(props) => props.theme.map.color} !important;
`;

export default function StateView({
  selectedArea,
  colorTheme,
  startupType,
  data,
}: StateViewProps) {
  const theme = useContext(ThemeContext);
  const componentProps = {
    tooltip: {
      sx: {
        fontSize: "15px",
        background: theme.tooltip.background,
        border: `2px solid ${ThemeColorIdentifier(colorTheme)}`,
        borderRadius: "5px",
        color: theme.tooltip.text,
        cursor: "grab",
        zIndex: 10000,
      },
    },
    arrow: {
      sx: {
        color: theme.tooltip.background,
        "&::before": {
          border: `2px solid ${ThemeColorIdentifier(colorTheme)}`,
          backgroundColor: theme.tooltip.background,
          boxSizing: "border-box",
        },
      },
    },
  };

  const findMaximumValue = () => {
    let max = 0;
    console.log("COuntValues2312312321", data);
    if (Array.isArray(data.data)) {
      data.data.forEach((district: any) => {
        const value =
          district.statistics[
            StartupTypesKeys[
              typeof startupType === "object" ? startupType.text : "Startup"
            ]
          ];
        if (!value) {
          const case1Value = district.statistics.Startup;
          max = case1Value > max ? case1Value : max;
        } else {
          console.log("COuntValues2312312321", value);
          max = value > max ? value : max;
        }
      });
    }
    return max;
    console.log("Max Value Gradient", max);
  };

  const getStatistics = (districtName: string) => {
    if (Array.isArray(data.data)) {
      return data.data.find((district: StatisticsData) => {
        if (!district.district || !districtName) return;
        return district.district.toLowerCase() == districtName.toLowerCase();
      });
    }

    return null;
  };

  const roundOff = (value: number) => {
    if (value < 0.3) return value + 0.1;
    else return value;
  };

  const getColorOpacity = (districtName: string) => {
    const maxValue = findMaximumValue();
    const statistics: any = getStatistics(districtName);
    console.log("MaxValueSTatistics", maxValue, statistics);
    if (statistics && maxValue) {
      const startupTypeLocal: string =
        typeof startupType === "object" ? startupType.text : "Startup";
      console.log(
        "startupType",
        startupType,
        maxValue,
        Number(
          statistics.statistics[StartupTypesKeys[startupTypeLocal] ? StartupTypesKeys[startupTypeLocal] : "Startup"]
        ),
        statistics.district,
        startupTypeLocal,
        StartupTypesKeys[startupTypeLocal]
      );
      if (
        Number(statistics.statistics[StartupTypesKeys[startupTypeLocal]]) === 0
      ) {
        return 0;
      }
      const val = StartupTypesKeys[startupTypeLocal] ? StartupTypesKeys[startupTypeLocal] : "Startup"
      const colorLevel: number =
        Number(statistics.statistics[val]) /
        maxValue;
      console.log("ColorLevel", colorLevel);
      // return 1
      return roundOff(colorLevel);
    }
    return 0;
  };

  // useEffect(() => {
  //   findMaximumValue();
  // }, [data, startupType]);

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
        {StatesDistrictView.filter((state: any) => {
          return state.id === selectedArea;
        }).map((state: any, index: number) =>
          state.path.map((district: DistrictBorderType) => (
            <MuiToolTip
              placement="top"
              title={district.name}
              followCursor
              arrow
              componentsProps={componentProps}
            >
              <path
                stroke="black"
                fill={ThemeColorIdentifier(colorTheme)}
                strokeWidth={"1"}
                key={index}
                fillOpacity={getColorOpacity(district.name)}
                d={district.d}
              />
            </MuiToolTip>
          ))
        )}
      </svg>
    </MapWrapper>
  );
}
