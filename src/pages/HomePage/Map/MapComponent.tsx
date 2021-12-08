import { useEffect, useState, useContext } from "react";
import { States, MapType } from "./states";
import Tooltip from "rc-tooltip";
import { IDType } from "./variables";
import { District, DistrictType } from "./districts";
import * as MapVariables from "./variables";
import { DistrictBoarder, Districts2 } from "./districtsBoarders";
import styled from "styled-components";
import { statesDpiit } from "./statesApi";
import { ThemeContext } from ".././../../config/context";
import { useQuery } from "../../../hooks/useQuery";

interface IndiaMapTypes {
  mapViewResource: any;
}

const MapWrapper = styled.div`
  color: ${(props) => props.theme.map.color} !important;
`;
const Path = styled.path`
  stroke: ${(props) => props.theme.map.color};
`;

const MAP_AREA_INDIA = "0 0 820 696";
const MAP_AREA_DISTRICTS = "0 0 470 465";
const WHITE = "#ffffff";
const BLACK = "#000000";
const THEME_COLOR = "rgb(1, 119, 250)";
const THEME_COLOR_LITE = "rgb(96 169 251)";
const ID = "id";

export default function IndiaMap({ mapViewResource }: IndiaMapTypes) {
  const { selectedArea, setSelectedArea, mapMode, isCircleActive,countState } =
    mapViewResource;

  const theme = useContext(ThemeContext);

  const [ fetchIndiaMap, indiaMap, loadingIndiaMap ] = useQuery('https://13.235.79.165:443/startup/states');

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
    return theme.map.mapBorder
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
    setSelectedArea({ id:state.id, stateName: state.text });
    setActiveStates([state]);
  };

  const populateDistrictCircle = () => {
    // if (districtWiseCircle.length > 0) return;
    const newArray = new Array();
    District.forEach((district: any) => {
      const newObj: any = new Object();

      if (district.title.toLowerCase() == "mumbai") {
        newObj["radius"] = "18";
      } else if (district.title.toLowerCase() == "Krishnagiri".toLowerCase()) {
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
    setDistrictWiseCircle(newArray);
  };

  const populateDistrictsBoarders = () => {
    setDistrictsBoarder(Districts2);
  };

  const getViewBoxArea = () => {
    if (mapMode.id === MapVariables.DISTRICT.id) return MAP_AREA_DISTRICTS;
    if (mapMode.id === MapVariables.INDIA.id) return MAP_AREA_INDIA;
  };
  const getViewBoxAreaCircle = () => {
    if (mapMode.id === MapVariables.DISTRICT.id) return "scale(1.38)";
    if (mapMode.id === MapVariables.INDIA.id) return "scale(1.42)";
  };

  // const fetchStateListWithName = async () => {
  //   const response = await statesDpiit("");
  //   console.log("States Dpiit", response);
  //   // setIndiaMap(States);
  // };

  useEffect(() => {
    fetchIndiaMap();
    populateDistrictCircle();
    populateDistrictsBoarders();
  }, [mapMode, theme]);

  return (
    <MapWrapper className="m-2 mt-0 pt-3" style={{ position: "relative" }}>
      {!isCircleActive && (
        <div className="gradient-bar-map d-flex justify-content-between">
          <p className="min-gradient-bar">0</p>
          <p className="max-gradient-bar">{countState.maxRange}</p>
        </div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={getViewBoxArea()}
        aria-label="Map of India"
      >
        {mapMode.id === MapVariables.INDIA.id &&
          indiaMap.map((state:any) => (
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
                key={state.id}
                d={state.d}
                id={state.id}
                fill={fillStates(state.id)}
                stroke={fillStrokeColor(state.id)}
                strokeWidth={fillStroke(state.id)}
              />
            </Tooltip>
          ))}
        {console.log("MapBorder", theme["map"].mapBorder)}
        {mapMode.id === MapVariables.CITY.id && <div />}

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
      {isCircleActive && (
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
                  fill={'rgba(202, 227, 255, 0.4)'}
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
