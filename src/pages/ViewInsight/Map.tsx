import React from "react";
import { StateBorders } from "../../config/countryMap";

interface MapProps {
  stateId: string | null;
}

const MAP_AREA_INDIA = "0 0 1030 906";

export default function Map({ stateId }: MapProps) {
  return (
    <div className="w-100 view-insight-map">
      <svg style={{ transform: "scale(1.15)" }} viewBox="-100 0 1030 906" aria-label="Map of India">
        {StateBorders.map((state: any, index: number) => {
          state.text = state.name;
          return (
            <path
              opacity={state.opacity}
              strokeLinejoin={state.strokeLinejoin}
              transform={state.transform}
              d={state.d}
              // onMouseEnter={(e) => handleMouseEnter(state, e)}
              // onMouseLeave={handleStateMouseLeave}
              // onClick={(e) => handleStateClick(state)}
              // fillOpacity={
              //   !isCircleActive
              //     ? tableState && tableState.data
              //       ? getGradientColor(
              //           state.id,
              //           appliedFilters.roles,
              //           maxCountValue
              //         ) + "%"
              //       : "1"
              //     : "0"
              // }
              fill={stateId === state.id ? "#0177fa" : "white"}
              stroke={"black"}
              strokeWidth={"1"}
            />
          );
        })}
      </svg>
    </div>
  );
}
