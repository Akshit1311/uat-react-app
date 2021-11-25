import { useEffect, useState } from "react";
import { States, MapType } from "./states";
import Tooltip from "rc-tooltip";
import { IDType } from "./variables";
import { District, DistrictType } from "./districts";

interface IndiaMapTypes {
  mapViewResource: any;
}

const MAP_AREA = "0 0 650 696";
const WHITE = "#ffffff";
const BLACK = "#000000";
const THEME_COLOR = "rgb(1, 119, 250)";
const THEME_COLOR_LITE = "rgb(96 169 251)";
const ID = "id";

export default function IndiaMap({ mapViewResource }: IndiaMapTypes) {
  const { selectedArea, setSelectedArea, mapMode, isCircleActive } =
    mapViewResource;

  const [indiaMap, setIndiaMap] = useState<MapType[]>([]);
  const [activeStates, setActiveStates] = useState<MapType[]>([]);
  const [hoverStates, setHoverStates] = useState<MapType[]>([]);
  const [districtWiseCircle, setDistrictWiseCircle] = useState<any[]>([]);

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
    if (fillHover(stateId)) return THEME_COLOR_LITE;
    if (fillClick(stateId)) return THEME_COLOR;
    return "rgba(0,0,0,0)";
  };

  const fillStroke = (stateId: string) => {
    if (fillHover(stateId)) return 1.5;
    if (fillClick(stateId)) return 1.7;
    return 1;
  };

  const handleMouseEnter = (state: MapType, mouseEvent: any) => {
    setHoverStates([state]);
    console.log(mouseEvent);
  };
  const handleStateMouseLeave = () => setHoverStates([]);

  const handleStateClick = (state: MapType) => {
    const isSelected = stateValidator(activeStates, ID, state.id);
    if (isSelected !== -1) {
      const states = [...activeStates];
      states.splice(isSelected, 1);
      return setActiveStates(states);
    }
    setSelectedArea(state.accessor);
    // setMapMode(state.accessor)
    setActiveStates([state]);
  };

  const populateDisctrictCircle = () => {
    // if (districtWiseCircle.length > 0) return;
    const newArray = new Array();
    District.forEach((district: any) => {
      console.log(district)
      const newObj: any = new Object();

      if (district.title.toLowerCase() == "mumbai") {
        newObj["radius"] = "18";
      } else if (district.title.toLowerCase() == "Krishnagiri".toLowerCase()) {
        newObj["radius"] = "10";
      } else if (district.title.toLowerCase() == "Jalgaon".toLowerCase()) {
        newObj["radius"] = "20";
      } else if (district.title.toLowerCase()  === "Khordha".toLowerCase()) {
        newObj["radius"] = "15";
      } else if (district.title.toLowerCase()  === "Pune".toLowerCase()) {
        newObj["radius"] = "13";
      } else if (district.title.toLowerCase()  === "Guntur".toLowerCase()) {
        newObj["radius"] = "14";
      } else if (district.title.toLowerCase()  === "Udupi".toLowerCase()) {
        newObj["radius"] = "15";
      } else if (district.title.toLowerCase()  === "Kollam".toLowerCase()) {
        newObj["radius"] = "12";
      } else {
        newObj["radius"] = "0";
      }
      newObj["transform"] = district.transform;
      newObj["title"] = district.title;
      newObj["id"] = district.id;
      newArray.push(newObj);
    });
    console.log(newArray)
    setDistrictWiseCircle(newArray)
  };

  useEffect(() => {
    // if (selectedArea.id === "india") return setIndiaMap(States);
    // const state: MapType[] = States.filter(
    //   (item) => item.id === selectedArea.id
    // );
    setIndiaMap(States);
    populateDisctrictCircle()
  }, []);

  return (
    <div className="m-2 mt-0" style={{ position: "relative" }}>
      <div className="gradient-bar-map d-flex justify-content-between">
        <p className="min-gradient-bar">0</p>
        <p className="max-gradient-bar">2000</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={MAP_AREA}
        aria-label="Map of India"
      >
        {indiaMap.map((state: MapType) => (
          <Tooltip
            placement="top"
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            overlay={
              <p style={{ paddingTop: "1px" }} className="px-2">
                {state.accessor.name}
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
              // opacity
              fill={fillStates(state.id)}
              stroke={BLACK}
              strokeWidth={fillStroke(state.id)}
            />
          </Tooltip>
        ))}
        {isCircleActive && (
          <g style={{ transform: "scale(1.42)" }}>
            {districtWiseCircle.map((districts: DistrictType) => (
              <circle
                transform={districts.transform}
                fill-opacity="0.25"
                pointer-events="all"
                style={{ cursor: "pointer" }}
                fill="none"
                stroke="rgba(0, 123, 255, 1)"
                r={districts.radius}
              >
                <title>{districts.title}</title>
              </circle>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
