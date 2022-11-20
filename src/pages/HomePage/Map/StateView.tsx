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
import { StartupTypesKeys } from "../../../config/Constants";

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
  setStateViewMode: any;
}

const MapWrapper = styled.div`
  color: ${(props) => props.theme.map.color} !important;
`;

export default function StateView({
  selectedArea,
  colorTheme,
  startupType,
  data,
  setStateViewMode,
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
    if (Array.isArray(data.data)) {
      data.data.forEach((district: any) => {
        const value = district.statistics[StartupTypesKeys[startupType.text]];
        if (!value) {
          const case1Value =
            district.statistics[StartupTypesKeys[startupType.text]];
          max = case1Value > max ? case1Value : max;
        } else {
          max = value > max ? value : max;
        }
      });
    }
    return max;
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
    if (value < 0.9) return value + 0.1;
    else return value;
  };

  const getColorOpacity = (districtName: string) => {
    const maxValue = findMaximumValue();
    const statistics: any = getStatistics(districtName);
    if (statistics && maxValue) {
      const startupTypeLocal: string = startupType.text;
      if (
        Number(statistics.statistics[StartupTypesKeys[startupTypeLocal]]) === 0
      ) {
        return 0;
      }
      const val = StartupTypesKeys[startupTypeLocal]
        ? StartupTypesKeys[startupTypeLocal]
        : "Startup";
      const colorLevel: number = Number(statistics.statistics[val]) / maxValue;
      return roundOff(colorLevel);
    }
    return 0;
  };

  const getCount = (districtName: string) => {
    const statistics: any = getStatistics(districtName);
    if (statistics) {
      const startupTypeLocal: string = startupType.text;
      if (
        Number(statistics.statistics[StartupTypesKeys[startupTypeLocal]]) === 0
      ) {
        return 0;
      }
      const val = StartupTypesKeys[startupTypeLocal]
        ? StartupTypesKeys[startupTypeLocal]
        : "Startup";

      
      return statistics.statistics[val];
    }
  };
  return (
    <MapWrapper
      className="m-2 mt-0 pt-0 d-flex justify-content-center"
      style={{ position: "relative" }}
    >
      <svg
        viewBox="-50 0 550 550"
        onDoubleClick={() => setStateViewMode(false)}
      >
        {StatesDistrictView.filter((state: any) => {
          return state.id === selectedArea;
        }).map((state: any, index: number) =>
          state.path.map((district: DistrictBorderType) => {
            return (
              <MuiToolTip
                placement="top"
                key={district.name}
                title={district.name}
                followCursor
                arrow
                componentsProps={componentProps}
              >
                <path
                  stroke="black"
                  fill={ThemeColorIdentifier(colorTheme)}
                  strokeWidth={"1"}
                  fillOpacity={getColorOpacity(district.name)}
                  d={district.d}
                />
              </MuiToolTip>
            );
          })
        )}
      </svg>
    </MapWrapper>
  );
}
