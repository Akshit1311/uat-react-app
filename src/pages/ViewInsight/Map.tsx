import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../config/context";
import { StateBorders } from "../../config/countryMap";
import { ThemeColorIdentifier } from "../../helper-function/themeColor";
import { ConfigState } from "../../store/config";

interface MapProps {
  stateId: string | null;
}

const MAP_AREA_INDIA = "0 0 1030 906";

export default function Map({ stateId }: MapProps) {
  const config: ConfigState = useSelector((s: any) => s.config);
  const theme = useContext(ThemeContext);
  return (
    <div className="w-100 view-insight-map">
      <svg
        style={{ transform: "scale(1.15)" }}
        viewBox="-100 0 1030 906"
        aria-label="Map of India"
      >
        {StateBorders.map((state: any, index: number) => {
          state.text = state.name;
          return (
            <path
              key={state.id}
              opacity={state.opacity}
              strokeLinejoin={state.strokeLinejoin}
              transform={state.transform}
              d={state.d}
              fill={
                stateId === state.id
                  ? ThemeColorIdentifier(config.colorTheme)
                  : theme.map.background
              }
              stroke={theme.map.mapBorder}
              strokeWidth={"1"}
            />
          );
        })}
      </svg>
    </div>
  );
}
