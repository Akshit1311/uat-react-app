import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StartupTypesKeys } from "../../config/Constants";
import { ThemeContext } from "../../config/context";
import { StateBorders } from "../../config/countryMap";
import { ThemeColorIdentifier } from "../../helper-function/themeColor";
import { useMutate } from "../../hooks/useMutate";
import { ConfigState } from "../../store/config";

interface MapProps {
  stateId: string | null;
}

const MAP_AREA_INDIA = "0 0 1030 906";

export default function Map({ stateId }: MapProps) {
  const config: ConfigState = useSelector((s: any) => s.config);
  const theme = useContext(ThemeContext);

  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const [fetchTableData, tableState, tableLoading] = useMutate(
    "/data/v2/statistics/country/5f02e38c6f3de87babe20cd2/2015-01-01/" +
      currentDate,
    {
      from: "2015-01-01",
      to: "2022-01-02",
      data: [],
    }
  );

  const [type, setType] = useState("Startups");

  useEffect(() => {
    const value: any = ThemeColorToType(config.colorTheme);
    setType(value);
  }, [config.colorTheme]);

  useEffect(() => {
    if(tableState && tableState.data && tableState.data.length == 0){
      fetchTableData()
    }
  }, [tableState])

  const ThemeColorToType = (value: string) => {
    value = value.toLowerCase();
    if (value === "theme-1") return "Startup";
    if (value === "theme-3") return "Mentor";
    if (value === "theme-4") return "Incubator";
    if (value === "theme-5") return "Investor";
    if (value === "theme-6") return "Accelerator";
    // if (value === "theme-7") return "GovernmentBody";
  };

  const findMaxValue = (array: any[], accessor: string) => {
    const newList = [...array];
    const n: any[] = [];

    if (accessor[0] == "Startup") {
      const key = StartupTypesKeys[type];
      newList.forEach((a: any) => n.push(a.statistics[key]));
    } else {
      newList.forEach((a: any) => n.push(a.statistics[accessor]));
    }
    const max = Math.max(...n);
    if (newList.length > 0) return max;
    else return 0;
  };

  const maxCountValue = findMaxValue(tableState.data || [], type);

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
      let stateValue: any;
      // if (accessor == "Startup") {
      //   const key = StartupTypesKeys[type];
        stateValue = tableState.data[findStateIndex].statistics[type];       
      // } else {
      //   stateValue = tableState.data[findStateIndex].statistics[accessor];
      //   console.log('tableState 3', tableState.data[findStateIndex])
      // }
      
      const opacity =
        stateValue !== 0 && maxValue !== 0 ? (stateValue / maxValue) * 100 : 0;

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
  return (
    <div className="w-100 view-insight-map">
      <svg
        style={{ transform: "scale(1.15)" }}
        viewBox="-100 0 1030 906"
        aria-label="Map of India"
        className="safari-svg"
      >
        {StateBorders.map((state: any, index: number) => {
          state.text = state.name;
          return (
            <path
              key={state.id}
              opacity={state.opacity}
              fillOpacity={
                tableState && tableState.data
                  ? getGradientColor(state.id, type, maxCountValue) + "%"
                  : "1"
              }
              strokeLinejoin={state.strokeLinejoin}
              transform={state.transform}
              d={state.d}
              fill={
                ThemeColorIdentifier(config.colorTheme)
                  
              }
              stroke={theme.map.mapBorder}
              strokeWidth={stateId === state.id ? "2.5" : 1}
            />
          );
        })}
      </svg>
    </div>
  );
}
