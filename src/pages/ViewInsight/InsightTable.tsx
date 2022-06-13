import React, { useContext, useEffect, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { InsightRowType } from "./Accordion";
import _ from "lodash";
import StarIcon from "@mui/icons-material/Star";
import MoonLoader from "react-spinners/MoonLoader";
import { AiFillInfoCircle } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { ThemeContext } from "../../config/context";

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

export default function InsightTable({
  stateName,
  title,
  data,
  handleClickStar,
  starFill,
}: InsightTableProps) {
  const [sortKey, setSortKey] = useState<SortKeys>(SortKeys.TEXT);
  const [sortMode, setSortMode] = useState<number>(-1);
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

  const onSort = () => {
    console.log("OnSOrt1")
    if (sortMode === 0) return setSortedData(originalData);
    
    const result = originalData.sort((a: InsightRowType, b: InsightRowType) => {
      if (sortMode === 1) {
        console.log("SOrt Key Data 1", sortKey,typeof String(a[sortKey]).localeCompare(String(b[sortKey])));
        return String(a[sortKey]).localeCompare(String(b[sortKey]));
      }
      if (sortMode === 2) {
        console.log("SOrt Key Data 2", sortKey, String(b[sortKey]).localeCompare(String(a[sortKey])));
        return String(b[sortKey]).localeCompare(String(a[sortKey]));
      }
      return 0;
    });

    console.log("OnSOrt2")

    setSortedData(result);
  };

  useEffect(() => {
    onSort();
  }, [sortMode, sortKey]);

  const changeSortMode = (e: any, sortKey: SortKeys) => {
    setSortKey(sortKey);
    switch (sortMode) {
      case 0:
        setSortMode(1);
        break;
      case 1:
        setSortMode(2);
        break;
      case 2:
        setSortMode(0);
        break;
    }
    console.log("SortKey", sortKey);
    e.stopPropagation();
  };
  return (
    <div className="scroll-area-wrapper">
      <div className="scroll-area">
        <div
          className="view-insight-header"
          style={{ background: theme.accordionHeader }}
        >
          <div onClick={(e) => changeSortMode(e, SortKeys.TEXT)}>
            <StarBorderIcon className="hidden" />
            <span>{title}</span>
          </div>
          {stateName != "" || stateName ? (
            <>
              <div
                onClick={(e) => changeSortMode(e, SortKeys.COUNT)}
                className="border-type-2"
              >
                {stateName}
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
              </div>
              <div className="border-type-2">India</div>
            </>
          ) : (
            <>
              <div className="border-type-2">Total</div>
            </>
          )}
          <div className="border-type-3">Percentage</div>
        </div>
        {sortedData.map((insight: InsightRowType) => (
          <div className="view-insight-body">
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
