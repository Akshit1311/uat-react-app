import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MoonLoader from "react-spinners/MoonLoader";
import { ThemeColorIdentifier } from "../../helper-function/themeColor";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { ThemeContext } from "../../config/context";
import { InsightRowType } from "./Accordion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";


interface InsightTableProps {
  stateName: string | null;
  title: string;
  data: InsightRowType[];
  starFill?: boolean;
  handleClickStar: any;
  type: string;
  loading: boolean;
}

enum SortKeys {
  TEXT = "text",
  COUNT = "count",
  TOTAL = "count",
  INDIA_TOTAL = "indiaTotal",

}

interface SortIconsType {
  sortMode: number;
  sortKey: SortKeys;
  primaryKey: string;
}

function SortIcons({ sortMode, sortKey, primaryKey }: SortIconsType) {
  const style = { cursor: "pointer" };
  return (
    <>
      {sortMode === 1 && sortKey === primaryKey ? (
        <span className="d-flex flex-column p-0" style={{ ...style }}>
          <ArrowDropDownIcon fontSize="small" />
        </span>
      ) : (
        <></>
      )}
      {sortMode === 2 && sortKey === primaryKey ? (
        <span className="d-flex flex-column p-0" style={{ ...style }}>
          <ArrowDropUpIcon fontSize="small" />
        </span>
      ) : (
        <></>
      )}
      {sortMode === 3 || sortKey !== primaryKey ? (
        <span className="d-flex flex-column p-0" style={{ ...style }}>
          <ArrowDropUpIcon fontSize="small" style={{ marginBottom: "-7px" }} />
          <ArrowDropDownIcon fontSize="small" style={{ marginTop: "-7px" }} />
        </span>
      ) : (
        <></>
      )}
    </>
  );
}

export default function InsightTable({
  stateName,
  title,
  data,
  handleClickStar,
  starFill,
  type,
  loading,
}: InsightTableProps) {
  const [sortKey, setSortKey] = useState<SortKeys>(SortKeys.TEXT);
  const [sortMode, setSortMode] = useState<number>(3);
  const [originalData, setOriginalData] = useState<InsightRowType[]>([]);
  const [sortedData, setSortedData] = useState<InsightRowType[]>([]);

  useEffect(() => {
    setOriginalData(data);
    setSortedData(data);
  }, [data]);

  const theme = useContext(ThemeContext);
  const componentProps = {
    tooltip: {
      sx: {
        fontSize: "15px",
        background: theme.tooltipViewInsight.background,
        color: theme.tooltipViewInsight.color,
      },
    },
    arrow: {
      sx: {
        color: theme.tooltipViewInsight.background,
        left: "6px !important",
        "&::before": {
          backgroundColor: theme.tooltipViewInsight.background,
          boxSizing: "border-box",
        },
      },
    },
  };

  const onSort = (sortMode: number, sortKey: string) => {
    if (sortMode === 3) {
      return setSortedData(data);
    } else {
      const result = originalData.sort(
        (a: any, b: any) => {
          let key:string = sortKey === "text" ? type : sortKey;
          if (sortMode === 1) {
            if (key === "count" || key === "indiaTotal") {
              return Number(a[key]) - Number(b[key]);
            } else {
              return String(a[key]) > String(b[key]) ? -1 : 1;
            }
          }

          if (sortMode === 2 && key === "count") {
            if (key === "count" || key === "indiaTotal") {
              return Number(b[key]) - Number(a[key]);
            } else {
              return String(b[key]) < String(a[key]) ? -1 : 1;
            }
          }
          return 0;
        }
      );

      setSortedData(
        sortMode == 2 && sortKey !== "count" ? result.reverse() : result
      );
    }
  };

  const changeSortMode = (e: any, sortKey: SortKeys) => {
    setSortKey(sortKey);
    switch (sortMode) {
      case 3:
        onSort(1, sortKey);
        setSortMode(1);
        break;
      case 1:
        onSort(2, sortKey);
        setSortMode(2);
        break;
      case 2:
        onSort(3, sortKey);
        setSortMode(3);
        break;
    }
    e.stopPropagation();
  };
  return (
    <div className="scroll-area-wrapper">
      <div className="scroll-area">
        <div
          className={`view-insight-header-${theme.viewInsightClass}`}
          style={{ background: theme.accordionHeader }}
        >
          <div onClick={(e) => changeSortMode(e, SortKeys.TEXT)}>
            <StarBorderIcon className="hidden" />
            <span>{title}</span>{" "}
            <SortIcons
              sortKey={sortKey}
              sortMode={sortMode}
              primaryKey={SortKeys.TEXT}
            />
          </div>
          {stateName != "" || stateName ? (
            <>
              <div
                onClick={(e) => changeSortMode(e, SortKeys.COUNT)}
                className="border-type-2"
              >
                {stateName}{" "}
                <SortIcons
                  sortKey={sortKey}
                  sortMode={sortMode}
                  primaryKey={SortKeys.COUNT}
                />
              </div>
              <div
                className="border-type-2"
                onClick={(e) => changeSortMode(e, SortKeys.INDIA_TOTAL)}
              >
                India{" "}
                <SortIcons
                  sortKey={sortKey}
                  sortMode={sortMode}
                  primaryKey={SortKeys.INDIA_TOTAL}
                />
              </div>
            </>
          ) : (
            <>
              <div
                className="border-type-2"
                onClick={(e) => changeSortMode(e, stateName != "" ? SortKeys.INDIA_TOTAL : SortKeys.TOTAL)}
              >
                Total
                <SortIcons
                  sortKey={sortKey}
                  sortMode={sortMode}
                  primaryKey={SortKeys.INDIA_TOTAL}
                />
              </div>
            </>
          )}
          
        </div>
        {sortedData && sortedData.length == 0 ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <MoonLoader
              color={ThemeColorIdentifier(theme.color)}
              loading={true}
              size={"25px"}
            />
          </div>
        ) : (
          sortedData.map((insight: any) => (
            <div className={`view-insight-body-${theme.viewInsightClass}`}>
              <div>
                {starFill ? (
                  <StarIcon
                    className="icon-hover-selected"
                    onClick={() => handleClickStar(insight)}
                  />
                ) : (
                  <StarBorderIcon
                    onClick={() => handleClickStar(insight)}
                    className="icon-hover-unselected"
                  />
                )}
                <span>{insight[type]}</span>
              </div>
              {typeof stateName === "string" && stateName.length > 0 ? (
                <>
                  <div className="border-type-2 font-500 text-right">
                    {insight.count}
                  </div>
                  
                  <div
                    onClick={(e) => changeSortMode(e, SortKeys.INDIA_TOTAL)}
                    className="border-type-2 font-500 text-right"
                  >
                    {insight.indiaTotal}
                  </div>
                  
                </>
              ) : (
                <>
                  <div className="border-type-2 font-500 text-right">
                    {insight.count}
                  </div>
                  
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
