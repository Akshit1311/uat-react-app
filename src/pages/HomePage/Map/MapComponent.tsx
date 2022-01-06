import React, { useEffect, useState, useContext } from "react";
import { MapType } from "./states";
import Tooltip from "rc-tooltip";
import * as MapVariables from "./variables";
import { Districts2 } from "./districtsBoarders";
import styled from "styled-components";
import { ThemeContext } from ".././../../config/context";
import { useQuery } from "../../../hooks/useQuery";
import MoonLoader from "react-spinners/MoonLoader";
import { DistrictType, District } from "./districts";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { ThemeColorIdentifier } from "../../../helper-function/themeColor";
import { StateCircles } from "./StateCircle";
import { StateBorders } from "./StartupIndiaMap";

interface IndiaMapTypes {
  mapViewResource: any;
  viewAreaMap?: string;
  scaleBarVisible: boolean;
  viewAreaCircle?: string;
}

const MapWrapper = styled.div`
  color: ${(props) => props.theme.map.color} !important;
`;

const GradientBar = ({ maxCountValue }: any) => {
  const [currentCount, setCurrentCount ] = useState<any>(0)
  useEffect(() => {
    
    const count = maxCountValue;
    console.log("Count Children Before starting count", count);
    
    if (count && count > currentCount) {
      let interval: any;
      if (currentCount < count) {
        interval = setInterval(() => {
          setCurrentCount((prevState:any) => {
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
        console.log("SOmeethig Went Wrong")
      }
      return () => clearInterval(interval);
    } else if(count && count <  currentCount) {
      let interval: any;
      if (currentCount > count) {
        interval = setInterval(() => {
          setCurrentCount((prevState:any) => {
            if (prevState === Number(count) || prevState < Number(count)) {
              return count;
            }
            if((currentCount - count) > 10000){
              return prevState - 500
            }
            if((currentCount - count) > 5000){
              return prevState - 200
            }
            if((currentCount - count) > 1000){
              return prevState - 100
            }
            return prevState - 1;
          });
        }, 1);
      } else if (currentCount === count) {
        clearInterval(interval);
      } else {
        console.log("SOmeethig Went Wrong")
      }
      return () => clearInterval(interval);
    }
    console.log("End Interval");
  }, [maxCountValue]);
  return (
    <div className="gradient-bar-map d-flex justify-content-between">
      <p className="min-gradient-bar">0</p>
      <p className="max-gradient-bar">{currentCount}</p>
    </div>
  );
};

const windowWidth = window.innerWidth

const MAP_AREA_INDIA = windowWidth > 768 ? "-200 0 1230 1106" : '-60 0 1000 900';
const MAP_AREA_DISTRICTS = "0 0 620 614";
const ID = "id";

function IndiaMap({
  mapViewResource,
  viewAreaMap,
  viewAreaCircle,
  scaleBarVisible,
}: IndiaMapTypes) {
  const {
    setSelectedStateByMap,
    setSelectedArea,
    mapMode,
    isCircleActive,
    countState,
    colorTheme,
    tableState,
    appliedFilters,
    tableLoading,
  } = mapViewResource;

  const theme = useContext(ThemeContext);

  const [fetchIndiaMap, indiaMap, loadingIndiaMap] = useQuery(
    "https://api.startupindiaonline.com/startup/states"
  );
  const [width, height] = useWindowSize();

  const [activeStates, setActiveStates] = useState<MapType[]>([]);
  const [hoverStates, setHoverStates] = useState<MapType[]>([]);
  const [districtWiseCircle, setDistrictWiseCircle] = useState<any[]>([]);
  const [districtsBoarder, setDistrictsBoarder] = useState<any>([]);

  const [stateBubbles, setStateBubbles] = useState<any[]>(StateCircles);
  // const [maxValue, setMaxValue] = useState<number>(0)

  const stateValidator = (array: any, accessor: string, value: string) => {
    return array.findIndex((obj: any) => obj[accessor] === value);
  };

  const findMaxValue = (array: any[], accessor: string) => {
    const newList = [...array];
    const n: any[] = [];
    newList.forEach((a: any) => n.push(a.statistics[accessor]));
    const max = Math.max(...n);
    if (newList.length > 0) return max;
    else return 0;
  };

  const findCountTypeValue = (stateId: string) => {
    return tableState.data.findIndex((item: any) => item.id === stateId);
  };

  const getGradientColor = (
    stateId: string,
    accessor: string,
    maxValue: number
  ) => {
    const findStateIndex = findCountTypeValue(stateId);
    if (findStateIndex !== -1) {
      const stateValue = tableState.data[findStateIndex].statistics[accessor];
      const opacity = (stateValue / maxValue) * 100;
      return opacity;
    }
    return 0;
  };
  const fillClick = (stateId: string) => {
    const selected = stateValidator(activeStates, ID, stateId);
    if (selected !== -1) return true;
  };
  const fillHover = (stateId: string) => {
    const selected = stateValidator(hoverStates, ID, stateId);
    if (selected !== -1) return true;
  };

  const fillStates = (stateId: string) => {
    if (fillClick(stateId)) return theme.map.click;
    return theme.map.background;
  };

  const fillGradient = (stateId: string) => {
    if (fillClick(stateId)) return theme.map.click;
    return theme.map.background;
  };

  const fillStroke = (stateId: string) => {
    if (fillHover(stateId)) return 2;
    if (fillClick(stateId)) return 2.5;
    return 1;
  };
  const fillStrokeColor = (stateId: string) => {
    if (fillHover(stateId)) return theme.map.hover;
    if (fillClick(stateId)) return theme.map.color;
    return theme.map.mapBorder;
  };

  const handleMouseEnter = (state: any, mouseEvent: any) => {
    setHoverStates([state]);
  };
  const handleStateMouseLeave = () => setHoverStates([]);

  const handleStateClick = (state: any) => {
    const isSelected = stateValidator(activeStates, ID, state.id);
    if (isSelected !== -1) {
      const states = [...activeStates];
      states.splice(isSelected, 1);
      return setActiveStates(states);
    }
    setSelectedArea({ id: state.id, stateName: state.text });
    setActiveStates([state]);
    console.log("Selected State", state);
    setSelectedStateByMap(state);
  };

  const populateDistrictsBoarders = () => {
    setDistrictsBoarder(Districts2);
  };

  const responsiveImageHeight = (mapArea: string) => {
    console.log("Height", height);
    const split: string[] = mapArea.split(" ");
    if (height > 768) {
      const a: number = 768 - height;
      split[2] = (Number(split[2]) + a).toString();
      split[3] = (Number(split[3]) + a).toString();
      console.log(split.toString().replaceAll(",", " "));
      return split.toString().replaceAll(",", " ");
    }
    if (height < 768) {
      const a: number = height - 768;
      split[2] = (Number(split[2]) - a).toString();
      split[3] = (Number(split[3]) - a).toString();
      if (Number(split[2]) < 800) split[2] = "800";
      if (Number(split[3]) < 687) split[3] = "687";
      console.log(split.toString().replaceAll(",", " "));
      return split.toString().replaceAll(",", " ");
    }
  };

  const getViewBoxArea = () => {
    if (mapMode.id === MapVariables.DISTRICT.id)
      return responsiveImageHeight(MAP_AREA_DISTRICTS);
    if (mapMode.id === MapVariables.INDIA.id)
      return viewAreaMap ? viewAreaMap : MAP_AREA_INDIA;
    if (mapMode.id === MapVariables.CITY.id)
      return viewAreaMap ? viewAreaMap : MAP_AREA_INDIA;
  };

  const getViewBoxAreaCircle = () => {
    if (mapMode.id === MapVariables.DISTRICT.id) return "scale(1.38)";
    if (mapMode.id === MapVariables.INDIA.id) return "scale(1.42)";
    if (mapMode.id === MapVariables.CITY.id) return "scale(1.42)";
  };

  useEffect(() => {
    fetchIndiaMap();
    populateDistrictsBoarders();
  }, [mapMode, theme]);

  const maxCountValue = findMaxValue(
    tableState.data || [],
    appliedFilters.roles
  );

  const bubbleRadiusWraper = (percent: number) => {
    const radius = (percent / 100) * 75;
    return radius;
  };

  return (
    <MapWrapper
        className="m-2 mt-0 pt-0 d-flex justify-content-center"
        style={{ position: "relative" }}
    >
      {!isCircleActive && scaleBarVisible && (
        <GradientBar maxCountValue={maxCountValue} />
      )}
      {loadingIndiaMap ||
        (tableLoading && (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center h-65">
            <MoonLoader
              color={"#0177FA"}
              loading={loadingIndiaMap || tableLoading}
              size={"25"}
            />
          </div>
        ))}
      {!loadingIndiaMap && !tableLoading && (
        <svg viewBox={getViewBoxArea()} className="mt-c-5" aria-label="Map of India">
          {mapMode.id === MapVariables.INDIA.id &&
            StateBorders.map((state: any, index: number) => {
              state.text = state.name;
              return (
                <Tooltip
                  placement="top"
                  animation="zoom"
                  arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                  overlay={
                    <p style={{ paddingTop: "1px" }} className="px-2">
                      {state.name || index}
                    </p>
                  }
                >
                  <path
                    opacity={state.opacity}
                    strokeLinejoin={state.strokeLinejoin}
                    transform={state.transform}
                    d={state.d}
                    onMouseEnter={(e) => handleMouseEnter(state, e)}
                    onMouseLeave={handleStateMouseLeave}
                    onClick={(e) => handleStateClick(state)}
                    fillOpacity={
                      !isCircleActive
                        ? tableState && tableState.data
                          ? getGradientColor(
                              state.id,
                              appliedFilters.roles,
                              maxCountValue
                            ) + "%"
                          : "1"
                        : "0"
                    }
                    fill={ThemeColorIdentifier(colorTheme)}
                    stroke={fillStrokeColor(state.id)}
                    strokeWidth={fillStroke(state.id)}
                  />
                </Tooltip>
              );
            })}
          {mapMode.id === MapVariables.CITY.id &&
            indiaMap.map((state: any, index: number) => (
              <Tooltip
                placement="top"
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                overlay={
                  <p style={{ paddingTop: "1px" }} className="px-2">
                    {state.text}
                  </p>
                }
              >
                <path
                  onMouseEnter={(e) => handleMouseEnter(state, e)}
                  onMouseLeave={handleStateMouseLeave}
                  onClick={(e) => handleStateClick(state)}
                  key={index}
                  d={state.d}
                  id={state.id}
                  fill={fillStates(state.id)}
                  stroke={fillStrokeColor(state.id)}
                  strokeWidth={fillStroke(state.id)}
                />
              </Tooltip>
            ))}

          {mapMode.id === MapVariables.DISTRICT.id &&
            districtsBoarder.map((district: any, index: number) => (
              <path
                key={index}
                d={district.d}
                id={district.title}
                fill={"none"}
                stroke={theme.map.mapBorder}
                strokeWidth={"0.5"}
              />
            ))}
        </svg>
      )}
      {!loadingIndiaMap && isCircleActive && (
        <>
          <svg
            style={{ position: "absolute", left: 0 }}
            viewBox={viewAreaCircle ? viewAreaCircle : "-200 0 1100 1000"}
          >
            <g style={{ transform: "scale(1.2)" }}>
              {stateBubbles.map((bubble: any, index: number) => (
                <circle
                  transform={bubble.transform}
                  fill-opacity="0.05"
                  pointer-events="all"
                  style={{ cursor: "pointer" }}
                  fill={ThemeColorIdentifier(colorTheme)}
                  stroke={ThemeColorIdentifier(colorTheme)}
                  strokeWidth="1.4"
                  r={bubbleRadiusWraper(
                    tableState && tableState.data
                      ? getGradientColor(
                          bubble.id,
                          appliedFilters.roles,
                          maxCountValue
                        )
                      : 1
                  )}
                >
                  <title>{bubble.title}</title>
                </circle>
              ))}
            </g>
            {scaleBarVisible && (
              <g style={{ transform: "scale(1.2)" }}>
                <circle
                  transform={"translate(400,47)"}
                  fill-opacity="0.25"
                  pointer-events="all"
                  style={{ cursor: "pointer" }}
                  fill="none"
                  stroke={ThemeColorIdentifier(colorTheme)}
                  strokeWidth="1.4"
                  r={(75 / 100) * 50}
                >
                  <title>{"Info"}</title>
                </circle>
                <circle
                  transform={"translate(400,66)"}
                  fill-opacity="0.25"
                  pointer-events="all"
                  style={{ cursor: "pointer" }}
                  fill="none"
                  stroke={ThemeColorIdentifier(colorTheme)}
                  strokeWidth="1.4"
                  r={(75 / 100) * 75}
                >
                  <title>{"Info"}</title>
                </circle>
                <circle
                  transform={"translate(400,85)"}
                  fill-opacity="0.25"
                  pointer-events="all"
                  style={{ cursor: "pointer" }}
                  fill="none"
                  stroke={ThemeColorIdentifier(colorTheme)}
                  strokeWidth="1.4"
                  r={75}
                >
                  <title>{"Info"}</title>
                </circle>
              </g>
            )}
          </svg>
          {scaleBarVisible ? (
            <div style={{ position: "absolute" }}>
              <p
                className="max-gradient-bar p-0 m-0"
                style={{
                  fontSize: "6px",
                  right: "-5.2rem",
                  position: "absolute",
                  top: "2.7rem",
                }}
              >
                {Number.parseInt(((maxCountValue / 100) * 50).toString())}
              </p>
              <p
                className="max-gradient-bar p-0 m-0"
                style={{
                  fontSize: "8px",
                  right: "-5.5rem",
                  position: "absolute",
                  top: "4.1rem",
                }}
              >
                {Number.parseInt(((maxCountValue / 100) * 75).toString())}
              </p>
              <p
                className="max-gradient-bar p-0 m-0"
                style={{
                  fontSize: "10px",
                  right: "-5.7rem",
                  position: "absolute",
                  top: "5.6rem",
                }}
              >
                {maxCountValue}
              </p>
              {/* </div> */}
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </MapWrapper>
  );
}

export default React.memo(IndiaMap);
