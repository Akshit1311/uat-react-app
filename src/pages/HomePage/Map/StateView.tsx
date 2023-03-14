import React, { useContext, useEffect, useState } from "react";
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
  // GovernmentBody: number;
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
  role: string;
  dateRangeCount: boolean
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
  role,
  dateRangeCount
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
    let key:any = '';
    if(role !== 'Startup'){
      key = role
    }else{
      key = StartupTypesKeys[startupType.text]
    }
    if (Array.isArray(data.data)) {
      data.data.forEach((district: any) => {
        const value = district.statistics[key];        
        if (!value) {
          const case1Value =
            district.statistics[key];
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
 

  const getColorOpacity = (districtName: string, accessor: string) => {
    const maxValue = findMaximumValue();
    const statistics: any = getStatistics(districtName); 
    let key:any = '';
    if(accessor !== 'Startup'){
      key = accessor
    }else{
      key = StartupTypesKeys[startupType.text]
    }
     
    if (statistics && maxValue) {      
      if (
        Number(statistics.statistics[key]) === 0
      ) {
        return 0;
      }
      const val = key
        ? key
        : "Startup";

        
      const colorLevel: number = Number(statistics.statistics[val]) / maxValue;
      return roundOff(colorLevel);
    }
   
    return 0;
  };

  const getCount = (districtName: string, accessor: string) => {
    const statistics: any = getStatistics(districtName);
    if (statistics) {
      let key:any = '';
      if(accessor !== 'Startup'){
        key = accessor
      }else{
        key = StartupTypesKeys[startupType.text]
      }
      if (
        Number(statistics.statistics[key]) === 0
      ) {
        return 0;
      }
      const val = key
        ? key
        : "Startup";

      
      return statistics.statistics[val] ? statistics.statistics[val] : 0;
    }
  };

  const GradientBar = ({ maxCountValue }: any) => {
    const [currentCount, setCurrentCount] = useState<any>(0);
    useEffect(() => {
      const count = maxCountValue;
  
      if (count && count > currentCount) {
        let interval: any;
        if (currentCount < count) {
          interval = setInterval(() => {
            setCurrentCount((prevState: any) => {
              if (prevState === Number(count) || prevState > Number(count)) {
                return count;
              }
              if (count > 1000) {
                return prevState + 500;
              }
              if (count < 1000 && count > 500) {
                return prevState + 10;
              }
              return prevState + 1;
            });
          }, 1);
        } else if (currentCount === count) {
          clearInterval(interval);
        } else {
        }
        return () => clearInterval(interval);
      } else if (count && count < currentCount) {
        let interval: any;
        if (currentCount > count) {
          interval = setInterval(() => {
            setCurrentCount((prevState: any) => {
              if (prevState === Number(count) || prevState < Number(count)) {
                return count;
              }
              if (currentCount - count > 10000) {
                return prevState - 500;
              }
              if (currentCount - count > 5000) {
                return prevState - 200;
              }
              if (currentCount - count > 1000) {
                return prevState - 100;
              }
              return prevState - 1;
            });
          }, 1);
        } else if (currentCount === count) {
          clearInterval(interval);
        } else {
        }
        return () => clearInterval(interval);
      }
    }, [maxCountValue]);
    return (
      <div className="gradient-bar-map d-flex justify-content-between">
        <p className="min-gradient-bar">0</p>
        <p className="max-gradient-bar">{currentCount}</p>
      </div>
    );
  };
  return (
    <MapWrapper
      className="m-2 mt-0 pt-0 d-flex justify-content-center"
      style={{ position: "relative" }}
    >

        <GradientBar maxCountValue={findMaximumValue()} />
    
      <svg
        viewBox="-50 0 550 550"
        onDoubleClick={() => setStateViewMode(false)}
        className="safari-svg"
      >
        {StatesDistrictView.filter((state: any) => {
          return state.id === selectedArea;
        }).map((state: any, index: number) =>
          state.path.map((district: DistrictBorderType) => {
            let counts: number = getCount(district.name, role);
            return (
              <MuiToolTip
                placement="top"
                key={district.name}
                title={district.name + `(${counts ? counts : ''})`}
                followCursor
                arrow
                componentsProps={componentProps}
              >
                
                <path
                  stroke="black"
                  fill={ThemeColorIdentifier(colorTheme)}
                  strokeWidth={"1"}
                  fillOpacity={getColorOpacity(district.name,role)}
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
