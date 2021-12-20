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

interface IndiaMapTypes {
  mapViewResource: any;
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  React.useEffect(() => {
    function updateSize() {
      console.log(
        "Window Height, Width",
        window.innerHeight,
        window.innerWidth
      );
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const MapWrapper = styled.div`
  color: ${(props) => props.theme.map.color} !important;
`;
// const Path = styled.path`
//   stroke: ${(props) => props.theme.map.color};
// `;

const MAP_AREA_INDIA = "0 0 930 806";
const MAP_AREA_DISTRICTS = "0 0 620 614";
// const WHITE = "#ffffff";
// const BLACK = "#000000";
// const THEME_COLOR = "rgb(1, 119, 250)";
// const THEME_COLOR_LITE = "rgb(96 169 251)";
const ID = "id";

function IndiaMap({ mapViewResource }: IndiaMapTypes) {
  const { setSelectedStateByMap, setSelectedArea, mapMode, isCircleActive, countState } =
    mapViewResource;

  const theme = useContext(ThemeContext);

  const [fetchIndiaMap, indiaMap, loadingIndiaMap] = useQuery(
    "https://13.235.79.165:443/startup/states"
  );
  const [width, height] = useWindowSize();

  const [activeStates, setActiveStates] = useState<MapType[]>([]);
  const [hoverStates, setHoverStates] = useState<MapType[]>([]);
  const [districtWiseCircle, setDistrictWiseCircle] = useState<any[]>([]);
  const [districtsBoarder, setDistrictsBoarder] = useState<any>([]);

  const stateValidator = (array: any, accessor: string, value: string) => {
    return array.findIndex((obj: any) => obj[accessor] === value);
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
    // if (fillHover(stateId)) return theme.map.hover;
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
    console.log('Selected State', state)
    setSelectedStateByMap(state)
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
    console.log("Height", height)
    const split: string[] = mapArea.split(" ");

    // if (height > 728 && height < 800) return mapArea;
    if (height > 768) {
      const a: number = 768 - height;
      split[2] = (Number(split[2]) + a).toString();
      split[3] = (Number(split[3]) + a).toString();
      console.log(split.toString().replaceAll(",", " "))
      return split.toString().replaceAll(",", " ");
    }
    if (height < 768) {
      const a: number = height - 768;
      split[2] = (Number(split[2]) - a).toString();
      split[3] = (Number(split[3]) - a).toString();
      console.log(split.toString().replaceAll(",", " "))
      return split.toString().replaceAll(",", " ");
    }
  };

  const getViewBoxArea = () => {
    if (mapMode.id === MapVariables.DISTRICT.id)
      return responsiveImageHeight(MAP_AREA_DISTRICTS);
    if (mapMode.id === MapVariables.INDIA.id)
      return responsiveImageHeight(MAP_AREA_INDIA);
    if (mapMode.id === MapVariables.CITY.id)
      return responsiveImageHeight(MAP_AREA_INDIA);
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

  return (
    <MapWrapper className="m-2 mt-0 pt-0" style={{ position: "relative" }}>
      {!isCircleActive && (
        <div className="gradient-bar-map d-flex justify-content-between">
          <p className="min-gradient-bar">0</p>
          <p className="max-gradient-bar">{countState.maxRange}</p>
        </div>
      )}
      {loadingIndiaMap && (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center h-65">
          <MoonLoader color={"#0177FA"} loading={loadingIndiaMap} size={"25"} />
        </div>
      )}
      {console.log("Height Width", height, width)}
      {!loadingIndiaMap && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={getViewBoxArea()}
          aria-label="Map of India"
        >
          {mapMode.id === MapVariables.INDIA.id &&
            indiaMap.map((state: any, index: number) => (
              <Tooltip
                placement="top"
                animation="zoom"
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
          {console.log("MapBorder", theme["map"].mapBorder)}
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
            viewBox={MAP_AREA_INDIA}
          >
            <g style={{ transform: getViewBoxAreaCircle() }}>
              {districtWiseCircle.map((districts: DistrictType) => (
                <circle
                  transform={districts.transform}
                  fill-opacity="0.25"
                  pointer-events="all"
                  style={{ cursor: "pointer" }}
                  fill={"rgba(202, 227, 255, 0.4)"}
                  stroke="#0177FA"
                  strokeWidth="1.4"
                  r={districts.radius}
                >
                  <title>{districts.title}</title>
                </circle>
              ))}
            </g>
            <g style={{ transform: getViewBoxAreaCircle() }}>
              <circle
                transform={"translate(510,37)"}
                fill-opacity="0.25"
                pointer-events="all"
                style={{ cursor: "pointer" }}
                fill="none"
                stroke="#0177FA"
                strokeWidth="1.4"
                r={35}
              >
                <title>{"Info"}</title>
              </circle>
              <circle
                transform={"translate(510,52)"}
                fill-opacity="0.25"
                pointer-events="all"
                style={{ cursor: "pointer" }}
                fill="none"
                stroke="#0177FA"
                strokeWidth="1.4"
                r={50}
              >
                <title>{"Info"}</title>
              </circle>
              <circle
                transform={"translate(510,67)"}
                fill-opacity="0.25"
                pointer-events="all"
                style={{ cursor: "pointer" }}
                fill="none"
                stroke="#0177FA"
                strokeWidth="1.4"
                r={65}
              >
                <title>{"Info"}</title>
              </circle>
            </g>
          </svg>
        </>
      )}
    </MapWrapper>
  );
}

export default React.memo(IndiaMap);
