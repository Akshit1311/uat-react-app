import React, { useEffect, useState, useContext } from "react";
import { States, MapType } from "./states";
import { District, DistrictType } from "./districts";
import * as MapVariables from "./variables";
import { ThemeContext } from ".././../../config/context";

const MAP_AREA_INDIA = "0 0 650 696";
const BLACK = "#000000";

const CIRCLE_SCALE = "scale(1.42)"

export default function DisabledMap() {
  const [indiaMap, setIndiaMap] = useState<MapType[]>([]);
  const [districtWiseCircle, setDistrictWiseCircle] = useState<any[]>([]);
 
  const theme = useContext(ThemeContext);

  const populateDisctrictCircle = () => {
    // if (districtWiseCircle.length > 0) return;
    const newArray = new Array();
    District.forEach((district: any) => {
      console.log(district);
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
    console.log(newArray);
    setDistrictWiseCircle(newArray);
  };
  useEffect(() => {
    setIndiaMap(States);
    populateDisctrictCircle()
  }, []);
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={MAP_AREA_INDIA}
        aria-label="Map of India"
      >
        {indiaMap.map((state: MapType) => (
          <path
            key={state.id}
            d={state.d}
            id={state.id}
            fill={"none"}
            stroke={theme.map.mapBorder}
            strokeWidth={1}
          />
        ))}
        <g style={{ transform: CIRCLE_SCALE }}>
            {districtWiseCircle.map((districts: DistrictType) => (
              <circle
                transform={districts.transform}
                fill-opacity="0.25"
                pointer-events="all"
                style={{ cursor: "pointer" }}
                fill="none"
                stroke="#0177FA"
                strokeWidth="1.4"
                r={districts.radius}
              >
                <title>{districts.title}</title>
              </circle>
              
            ))}
          </g>
          <g style={{ transform: CIRCLE_SCALE  }}>
              <circle
                transform={'translate(300,37)'}
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
                transform={'translate(300,52)'}
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
                transform={'translate(300,67)'}
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
    </div>
  );
}
