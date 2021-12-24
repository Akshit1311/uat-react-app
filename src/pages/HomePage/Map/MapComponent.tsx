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

const MAP_AREA_INDIA = "-200 0 1230 1106";
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
  console.log("India Map Svg", indiaMap);
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

  const populateDistrictCircle = () => {
    // if (districtWiseCircle.length > 0) return;
    const newArray = new Array();
    if (mapMode.id === MapVariables.DISTRICT.id) {
      District.forEach((district: any) => {
        const newObj: any = new Object();

        if (district.title.toLowerCase() == "mumbai") {
          newObj["radius"] = "18";
        } else if (
          district.title.toLowerCase() == "Krishnagiri".toLowerCase()
        ) {
          newObj["radius"] = "10";
        } else if (district.title.toLowerCase() == "Jalgaon".toLowerCase()) {
          newObj["radius"] = "20";
        } else if (district.title.toLowerCase() === "Khordha".toLowerCase()) {
          newObj["radius"] = "15";
        } else if (district.title.toLowerCase() === "Pune".toLowerCase()) {
          newObj["radius"] = "13";
        } else if (district.title.toLowerCase() === "Guntur".toLowerCase()) {
          newObj["radius"] = "14";
        } else if (district.title.toLowerCase() === "Udupi".toLowerCase()) {
          newObj["radius"] = "15";
        } else if (district.title.toLowerCase() === "Kollam".toLowerCase()) {
          newObj["radius"] = "12";
        } else {
          newObj["radius"] = "0";
        }
        newObj["transform"] = district.transform;
        newObj["title"] = district.title;
        newObj["id"] = district.id;
        newArray.push(newObj);
      });
    }
    if (mapMode.id === MapVariables.INDIA.id) {
      District.forEach((district: any) => {
        const newObj: any = new Object();

        if (district.title.toLowerCase() == "mumbai") {
          newObj["radius"] = "0";
        } else if (
          district.title.toLowerCase() == "Krishnagiri".toLowerCase()
        ) {
          newObj["radius"] = "50";
        } else if (district.title.toLowerCase() == "Jalgaon".toLowerCase()) {
          newObj["radius"] = "60";
        } else if (district.title.toLowerCase() === "Khordha".toLowerCase()) {
          newObj["radius"] = "70";
        } else {
          newObj["radius"] = "0";
        }
        newObj["transform"] = district.transform;
        newObj["title"] = district.title;
        newObj["id"] = district.id;
        newArray.push(newObj);
      });
    }
    if (mapMode.id === MapVariables.CITY.id) {
      District.forEach((district: any) => {
        const newObj: any = new Object();

        if (district.title.toLowerCase() == "mumbai") {
          newObj["radius"] = "18";
        } else if (
          district.title.toLowerCase() == "Krishnagiri".toLowerCase()
        ) {
          newObj["radius"] = "10";
        } else if (district.title.toLowerCase() == "Jalgaon".toLowerCase()) {
          newObj["radius"] = "20";
        } else if (district.title.toLowerCase() === "Khordha".toLowerCase()) {
          newObj["radius"] = "15";
        } else if (district.title.toLowerCase() === "Pune".toLowerCase()) {
          newObj["radius"] = "13";
        } else if (district.title.toLowerCase() === "Guntur".toLowerCase()) {
          newObj["radius"] = "14";
        } else if (district.title.toLowerCase() === "Udupi".toLowerCase()) {
          newObj["radius"] = "15";
        } else if (district.title.toLowerCase() === "Koraput".toLowerCase()) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Chikkaballapura".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Sundargarh".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (district.title.toLowerCase() === "Haver".toLowerCase()) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Papum Pare".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Shivamogga".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Puducherry".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Puducherry".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Puducherry".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Malkangiri".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Puducherry".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Visakhapatnam".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Puducherry".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (district.title.toLowerCase() === "Cuttack".toLowerCase()) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "East Garo Hills".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (district.title.toLowerCase() === "Nashik".toLowerCase()) {
          newObj["radius"] = "15";
        } else if (district.title.toLowerCase() === "Kalahandi".toLowerCase()) {
          newObj["radius"] = "15";
        } else if (
          district.title.toLowerCase() === "Subarnapur".toLowerCase()
        ) {
          newObj["radius"] = "15";
        } else if (district.title.toLowerCase() === "Bametara".toLowerCase()) {
          newObj["radius"] = "12";
        } else if (district.title.toLowerCase() === "Phek".toLowerCase()) {
          newObj["radius"] = "12";
        } else if (district.title.toLowerCase() === "Zunheboto".toLowerCase()) {
          newObj["radius"] = "12";
        } else if (district.title.toLowerCase() === "Wokha".toLowerCase()) {
          newObj["radius"] = "12";
        } else if (district.title.toLowerCase() === "Gomati".toLowerCase()) {
          newObj["radius"] = "12";
        } else {
          newObj["radius"] = "0";
        }
        newObj["transform"] = district.transform;
        newObj["title"] = district.title;
        newObj["id"] = district.id;
        newArray.push(newObj);
      });
    }

    setDistrictWiseCircle(newArray);
  };

  const populateDistrictsBoarders = () => {
    setDistrictsBoarder(Districts2);
  };

  const responsiveImageHeight = (mapArea: string) => {
    console.log("Height", height);
    const split: string[] = mapArea.split(" ");
    // -200 0 800 687
    // if (height > 728 && height < 800) return mapArea;
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
    populateDistrictCircle();
    populateDistrictsBoarders();
  }, [mapMode, theme]);

  const maxCountValue = findMaxValue(
    tableState.data || [],
    appliedFilters.roles
  );

  // const getBubbleData = (stateName:string) => {
  //   const findState = StateCircle
  // }

  // const bubbleWrapper = (mapData:any) =>{
  //   const newList:any[] = []
  //   mapData.forEach((stateData:any)=>{
  //     newList.push({})
  //   })
  //   return []
  // }
  const mixDataWithId = () => {
    const findId = (stateName: string) =>
      indiaMap.find((item: any) => {
        return item.text.toLowerCase() == stateName.toLowerCase();
      });
    const newList = new Array();

    stateBubbles.forEach((i: any) => {
      const filteredState = findId(i.title);
      if (filteredState) {
        i.name = i.title;
        i.text = i.title;
        i.id = filteredState.id;
      }
      newList.push(i);
    });
    console.log("India Map", indiaMap);
    console.log("New Json", StateBorders);
    console.log("New map List", newList);
  };

  const bubbleRadiusWraper = (percent: number) => {
    console.log("Percentage Radius", percent);
    const radius = (percent / 100) * 75;
    console.log("Radius", radius);
    return radius;
  };

  return (
    <MapWrapper
      className="m-2 mt-0 pt-0 d-flex justify-content-center"
      style={{ position: "relative" }}
    >
      {!isCircleActive && scaleBarVisible && (
        <div className="gradient-bar-map gradient-bar-map d-flex justify-content-between">
          <p className="min-gradient-bar">0</p>
          <p className="max-gradient-bar">{maxCountValue}</p>
        </div>
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
      {console.log("tableLoading", tableLoading)}
      {!loadingIndiaMap && !tableLoading && (
        <svg viewBox={getViewBoxArea()} aria-label="Map of India">
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
