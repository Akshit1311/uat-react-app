import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { States, MapType } from "./states";
import Tooltip from "rc-tooltip";

const MAP_AREA = "0 0 650 696";
const WHITE = "#ffffff";
const BLACK = "#000000";
const THEME_COLOR = "rgb(1, 119, 250)";
const THEME_COLOR_LITE = "rgb(96 169 251)";
const ID = "id";

const INITIAL_TOOLTIP_STATE = { visible: false, x: 0, y: 0 };

export default function IndiaMap() {
  const [indiaMap, setIndiaMap] = useState<MapType[]>([]);
  const [activeStates, setActiveStates] = useState<MapType[]>([]);
  const [hoverStates, setHoverStates] = useState<MapType[]>([]);
  const [toolTipState, setToolTipState] = useState(INITIAL_TOOLTIP_STATE);

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
    return WHITE;
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
    setActiveStates([state]);
  };

  useEffect(() => {
    setIndiaMap(States);
    setActiveStates([
      States[0],
      States[4],
      States[6],
      States[5],
      States[10],
      States[15],
      States[20],
      States[23],
    ]);
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
              fill={fillStates(state.id)}
              stroke={BLACK}
              strokeWidth={fillStroke(state.id)}
            />
          </Tooltip>
        ))}
      </svg>
    </div>
  );
}
