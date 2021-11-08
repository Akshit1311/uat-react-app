import { useEffect, useState } from "react";
import { States, MapType } from "./states";

const MAP_AREA = "0 0 650 696";
const WHITE = "#ffffff";
const BLACK = '#000000'
const THEME_COLOR = "rgb(1, 119, 250)"
const THEME_COLOR_LITE = 'rgb(96 169 251)'
const ID = "id"

export default function IndiaMap() {
  const [indiaMap, setIndiaMap] = useState<MapType[]>([]);
  const [activeStates, setActiveStates] = useState<MapType[]>([]);
  const [hoverStates, setHoverStates] = useState<MapType[]>([]);

  const stateValidator = (array: any, accessor: string, value: string) => {
    return array.findIndex((obj: any) => obj[accessor] === value);
  };

  const fillClick = (stateId: string) => {
    const selected = stateValidator(activeStates, ID, stateId);
    if (selected !== -1) return true;
  };
  const fillHover = (stateId: string) => {
    const selected = stateValidator(hoverStates, ID, stateId);
    if (selected !== -1) return true
  };

  const fillStates = (stateId: string) => {
    if (fillHover(stateId)) return THEME_COLOR_LITE
    if (fillClick(stateId)) return THEME_COLOR
    return WHITE
  }

  const handleMouseEnter = (state: MapType) => {
    setHoverStates([state]);
  };
  const handleStateMouseLeave = () => setHoverStates([]);

  const handleStateClick = (state: MapType) => {
    const isSelected = stateValidator(activeStates, ID, state.id)
    if (isSelected !== -1) {
      const states = [...activeStates]
      states.splice(isSelected, 1)
      return setActiveStates(states)
    }
    setActiveStates((prevState: Array<MapType>) => [...prevState, state]);
  }

  useEffect(() => {
    setIndiaMap(States);
  }, []);

  return (
    <div className="m-2 mt-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={MAP_AREA}
        aria-label="Map of India"
      >
        {indiaMap.map((state: MapType) => (
          <path
            onMouseEnter={() => handleMouseEnter(state)}
            onMouseLeave={handleStateMouseLeave}
            onClick={(e) => handleStateClick(state)}
            key={state.id}
            d={state.d}
            id={state.id}
            fill={fillStates(state.id)}
            stroke={BLACK}
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}
