import React, { useEffect, useState, useContext } from "react";
import { MapType } from "./states";
import * as MapVariables from "./variables";
import { DistrictBoarder, Districts2 } from "./districtsBoarders";
import styled from "styled-components";
import { ThemeContext } from ".././../../config/context";
import { useQuery } from "../../../hooks/useQuery";
import MoonLoader from "react-spinners/MoonLoader";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { ThemeColorIdentifier } from "../../../helper-function/themeColor";
import { StateCircles } from "./StateCircle";
import { StateBorders } from "./StartupIndiaMap";
import { useWebQuery } from "../../../hooks/useWebQuery";
import { useHistory } from "react-router-dom";
import { ThemeProvider, Tooltip as MuiToolTip } from "@mui/material"

interface IndiaMapTypes {
  mapViewResource: any;
  viewAreaMap?: string;
  scaleBarVisible: boolean;
  viewAreaCircle?: string;
}

function DistrictPath({ district, componentProps, theme }: any) {
  const [isToolTipVisible, setToolTipVisible]= useState<boolean>(false)
  return (
    // <MuiToolTip placement="top" title={district.title} open={isToolTipVisible} arrow componentsProps={componentProps}>
      <path
        onMouseEnter={() => setToolTipVisible(true)}
        onMouseLeave={() => setToolTipVisible(false)}
        d={district.d}
        id={district.title}
        fill={"none"}
        stroke={theme.map.mapBorder}
        strokeWidth={"0.5"}
      />
    // </MuiToolTip>
  )
}

const MapWrapper = styled.div`
  color: ${(props) => props.theme.map.color} !important;
`;

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
  const MAP_AREA_INDIA = width > 768 ? "-200 0 1230 1006" : "-15 0 900 950";
  const MAP_AREA_BUBBLE = width > 768 ? "-200 0 1100 1000" : "-30 0 800 800";

  const [activeStates, setActiveStates] = useState<any[]>([]);
  const [hoverStates, setHoverStates] = useState<MapType[]>([]);
  const [districtsBoarder, setDistrictsBoarder] = useState<any>([]);

  const [stateBubbles, setStateBubbles] = useState<any[]>(StateCircles);

  const query = useWebQuery();
  const history = useHistory();

  useEffect(() => {
    const stateName = query.get("state");
    const stateId = query.get("id");

    const activeState = StateBorders.find((item) => item.id === stateId);
    if (activeState) setActiveStates([activeState]);
    else setActiveStates([]);
  }, [query.get("state"), query.get("id")]);
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
      if (
        opacity === 0 &&
        accessor[0] !== ["Startup"][0] &&
        accessor[0] !== ["Incubator"][0]
      ) {
        return opacity;
      } else if (opacity < 20 && opacity > 0) {
        return opacity + 5;
      } else {
        return opacity;
      }
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
    setSelectedStateByMap(state);
    history.push(`/?id=${state.id}&state=${state.name}`);
  };

  const populateDistrictsBoarders = () => {
    // const newArray: any[] = [];

    // const findDistrict = (title: string) => newArray.findIndex((i) =>
    //   i.title == title
    // )
    // DistrictBoarder.forEach((district) => {
    //   if (district.title) {
    //     const index = findDistrict(district.title)
    //     console.log("title", index)
    //     if (index === -1) newArray.push(district)
    //   }
    // })
    // console.log("Distrct Length ", DistrictBoarder.length, newArray.length)
    setDistrictsBoarder(Districts2);
  };

  const responsiveImageHeight = (mapArea: string) => {
    const split: string[] = mapArea.split(" ");
    if (height > 768) {
      const a: number = 980 - height;
      split[0] = Number('-120').toString();
      split[2] = (Number(split[2]) + a).toString();
      split[3] = (Number(split[3]) + a - 90).toString();
      split.toString().replaceAll(",", " ");
      return split.toString().replaceAll(",", " ");
    }
    if (height < 768) {
      const a: number = height - 768;
      split[2] = (Number(split[2]) - a).toString();
      split[3] = (Number(split[3]) - a).toString();
      if (Number(split[2]) < 800) split[2] = "800";
      if (Number(split[3]) < 687) split[3] = "687";
      split.toString().replaceAll(",", " ");
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
      style={{ position: "relative", maxWidth: "99vw", overflow: "hidden" }}
    >
      {!isCircleActive && scaleBarVisible && (
        <GradientBar maxCountValue={maxCountValue} />
      )}
      {loadingIndiaMap === false && tableLoading === false ? (
        <svg
          viewBox={getViewBoxArea()}
          className="mt-c-5-2"
          aria-label="Map of India"
        >
          <g style={{ transform: "scale(1)" }}>

            <MuiToolTip placement="top" title={'Lakshadweep'} followCursor arrow componentsProps={componentProps}>
              <circle
                onClick={() =>
                  handleStateClick({
                    name: "Lakshadweep",
                    text: "Lakshadweep",
                    id: "5f48ce592a9bb065cdf9fb2f",
                  })
                }
                transform={"translate(150,800)"}
                fillOpacity="0.00"
                pointerEvents="all"
                style={{ cursor: "pointer" }}
                fill={ThemeColorIdentifier(colorTheme)}
                strokeOpacity={"0"}
                strokeWidth="1.4"
                r={65}
              ></circle>
            </MuiToolTip>
          </g>

          {mapMode.id === MapVariables.INDIA.id &&
            StateBorders.map((state: any, index: number) => {
              state.text = state.name;
              return (
                <MuiToolTip placement="top" title={state.name} followCursor arrow componentsProps={componentProps}>
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
                </MuiToolTip>
              );
            })}

          {mapMode.id === MapVariables.CITY.id &&
            StateBorders.map((state: any, index: number) => {
              state.text = state.name;
              return (
                <MuiToolTip placement="top" title={state.name} followCursor arrow componentsProps={componentProps}>
                  <path
                    opacity={state.opacity}
                    strokeLinejoin={state.strokeLinejoin}
                    transform={state.transform}
                    d={state.d}
                    onMouseEnter={(e) => handleMouseEnter(state, e)}
                    onMouseLeave={handleStateMouseLeave}
                    // onClick={(e) => handleStateClick(state)}
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
                </MuiToolTip>
              );
            })}


          {mapMode.id === MapVariables.DISTRICT.id &&
            districtsBoarder.map((district: any, index: number) => (
              <DistrictPath theme={theme} district={district} componentProps={componentProps} />
            ))}
        </svg>
      ) : (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center h-65">
          <MoonLoader
            color={ThemeColorIdentifier(colorTheme)}
            loading={true}
            size={"25px"}
          />
        </div>
      )}
      {!loadingIndiaMap && isCircleActive && (
        <>
          <svg
            style={{ position: "absolute", left: 0 }}
            className="mt-c-5-2"
            viewBox={viewAreaCircle ? viewAreaCircle : MAP_AREA_BUBBLE}
          >
            <g style={{ transform: "scale(1.2)" }}>
              {stateBubbles.map((bubble: any, index: number) => (
                <circle
                  key={index}
                  transform={bubble.transform}
                  fill-opacity="0.05"
                  pointerEvents="all"
                  style={{ cursor: "pointer" }}
                  fill={ThemeColorIdentifier(colorTheme)}
                  stroke={ThemeColorIdentifier(colorTheme)}
                  strokeWidth="1.4"
                  // r={5}
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
                <text
                  x={width > 768 ? "36.3%" : "50%"}
                  y={width < 768 ? "8%" : '6.5%'}
                  stroke="#00000"
                  stroke-width="2px"
                  dy=".3em"
                  text-anchor="middle"
                  className="font-Mont"
                  alignment-baseline="bottom"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    fill: theme.color
                  }}
                >
                  {Number.parseInt(((maxCountValue / 100) * 50).toString())}
                </text>
                <text
                  x={width > 768 ? "36.4%" : "50%"}
                  y={width < 768 ? "13%" : '10.5%'}
                  stroke="#00000"
                  stroke-width="2px"
                  dy=".3em"
                  text-anchor="middle"
                  alignment-baseline="bottom"
                  className="font-Mont"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    fill: theme.color
                  }}
                >
                  {Number.parseInt(((maxCountValue / 100) * 75).toString())}
                </text>
                <text
                  x={width > 768 ? "36.4%" : "50%"}
                  y={width < 768 ? "17.5%" : '14.5%'}
                  stroke="#00000"
                  stroke-width="2px"
                  dy=".3em"
                  text-anchor="middle"
                  alignment-baseline="bottom"
                  className="font-Mont"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    fill: theme.color
                  }}
                >
                  {maxCountValue}
                </text>
                <circle
                  transform={"translate(400,47)"}
                  fill-opacity="0.25"
                  pointerEvents="all"
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
                  pointerEvents="all"
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
                  pointerEvents="all"
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
          {/* {scaleBarVisible ? (
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
            </div>
          ) : (
            <></>
          )} */}
        </>
      )}
    </MapWrapper>

  );
}

export default React.memo(IndiaMap);
