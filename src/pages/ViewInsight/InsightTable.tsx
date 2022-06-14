import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
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
}

enum SortKeys {
  TEXT = "text",
  COUNT = "count",
  PERCENTAGE = "percentage",
  INDIA_TOTAL = "indiaTotal",
  INDIA_PERCENTAGE = "indiaPercentage",
}

interface SortIconsType {
  sortMode: number;
  sortKey: SortKeys;
  primaryKey: string;
}

function SortIcons({ sortMode, sortKey, primaryKey }: SortIconsType) {
  return (
    <>
      {sortMode === 1 && sortKey === primaryKey ? (
        <span className="d-flex flex-column p-0">
          <ArrowDropDownIcon fontSize="small" />
        </span>
      ) : (
        <></>
      )}
      {sortMode === 2 && sortKey === primaryKey ? (
        <span className="d-flex flex-column p-0">
          <ArrowDropUpIcon fontSize="small" />
        </span>
      ) : (
        <></>
      )}
      {sortMode === 3 || sortKey !== primaryKey ? (
        <span className="d-flex flex-column p-0">
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

  const onSort = (sortMode: number, sortKey: SortKeys) => {
    if (sortMode === 3) {
      return setSortedData(data);
    } else {
      const result = originalData.sort(
        (a: InsightRowType, b: InsightRowType) => {
          if (sortMode === 1) {
            console.log(
              "SOrt Key Data 1",
              sortKey,
              a[sortKey],
              b[sortKey],
              String(a[sortKey]).localeCompare(String(b[sortKey]))
            );
            return String(a[sortKey]).localeCompare(String(b[sortKey]));
          }
          if (sortMode === 2) {
            console.log(
              "SOrt Key Data 2",
              sortKey,
              String(b[sortKey]).localeCompare(String(a[sortKey]))
            );
            return String(b[sortKey]).localeCompare(String(a[sortKey]));
          }
          return 0;
        }
      );

      console.log(
        "OnSOrt2",
        sortMode,
        sortMode == 2 ? result.reverse() : result
      );

      setSortedData(sortMode == 2 ? result.reverse() : result);
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
                className="border-type-3"
                onClick={(e) => changeSortMode(e, SortKeys.PERCENTAGE)}
              >
                Percentage
                <Tooltip
                  title={
                    "Percentage is calculated \n based on the total number"
                  }
                  placement={"top"}
                  arrow
                  componentsProps={componentProps}
                >
                  <span className="text-secondary">
                    <AiFillInfoCircle />
                  </span>
                </Tooltip>
                <SortIcons
                  sortKey={sortKey}
                  sortMode={sortMode}
                  primaryKey={SortKeys.PERCENTAGE}
                />
              </div>
              <div
                className="border-type-2"
                onClick={(e) => changeSortMode(e, SortKeys.INDIA_PERCENTAGE)}
              >
                India{" "}
                <SortIcons
                  sortKey={sortKey}
                  sortMode={sortMode}
                  primaryKey={SortKeys.INDIA_PERCENTAGE}
                />
              </div>
            </>
          ) : (
            <>
              <div
                className="border-type-2"
                onClick={(e) => changeSortMode(e, SortKeys.INDIA_PERCENTAGE)}
              >
                Total
                <SortIcons
                  sortKey={sortKey}
                  sortMode={sortMode}
                  primaryKey={SortKeys.INDIA_PERCENTAGE}
                />
              </div>
            </>
          )}
          <div
            className="border-type-3"
            onClick={(e) => changeSortMode(e, SortKeys.INDIA_PERCENTAGE)}
          >
            Percentage
            <SortIcons
              sortKey={sortKey}
              sortMode={sortMode}
              primaryKey={SortKeys.INDIA_PERCENTAGE}
            />
          </div>
        </div>
        {sortedData.map((insight: InsightRowType) => (
          <div className={`view-insight-body-${theme.viewInsightClass}` }>
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
              <span>{insight.text}</span>
            </div>
            {typeof stateName === "string" && stateName.length > 0 ? (
              <>
                <div className="border-type-2 font-500 text-right">
                  {insight.count}
                </div>
                <div
                  onClick={(e) => changeSortMode(e, SortKeys.PERCENTAGE)}
                  className="border-type-3 font-500 text-right"
                >
                  {insight.percentage} %
                </div>
                <div
                  onClick={(e) => changeSortMode(e, SortKeys.INDIA_TOTAL)}
                  className="border-type-2 font-500 text-right"
                >
                  {insight.indiaTotal}
                </div>
                <div
                  onClick={(e) => changeSortMode(e, SortKeys.INDIA_PERCENTAGE)}
                  className="border-type-3 font-500 text-right"
                >
                  {insight.indiaPercentage} %
                </div>
              </>
            ) : (
              <>
                <div className="border-type-2 font-500 text-right">
                  {insight.count}
                </div>
                <div className="border-type-3 font-500 text-right">
                  {insight.percentage} %
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
