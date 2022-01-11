import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { InsightRowType } from "./Accordion";
import _ from "lodash";
import StarIcon from "@mui/icons-material/Star";

interface InsightTableProps {
  stateName: string | null;
  title: string;
  data: InsightRowType[];
  starFill?: boolean;
  handleClickStar: any;
}

export default function InsightTable({
  stateName,
  title,
  data,
  handleClickStar,
  starFill,
}: InsightTableProps) {
  return (
    <>
      <div className="scroll-area">
        <div className="view-insight-header">
          <div>
            <StarBorderIcon className="hidden" />
            <span>{title}</span>
          </div>
          <div className="border-type-2">{stateName}</div>
          <div className="border-type-3">Percentage</div>
          <div className="border-type-2">India</div>
          <div className="border-type-3">Percentage</div>
        </div>
        {data.map((insight: InsightRowType) => (
          <div className="view-insight-body">
            <div>
              {starFill ? (
                <StarIcon
                  className="icon-hover-selected"
                  onClick={() => handleClickStar(insight)}
                />
              ) : (
                <StarBorderIcon onClick={() => handleClickStar(insight)} className="icon-hover-unselected" />
              )}
              <span>{insight.text}</span>
            </div>
            <div className="border-type-2 font-500 text-right">{insight.count}</div>
            <div className="border-type-3 font-500 text-right">{insight.percentage} %</div>
            <div className="border-type-2 font-500 text-right">{insight.indiaTotal}</div>
            <div className="border-type-3 font-500 text-right">
              {insight.indiaPercentage} %
            </div>
          </div>
        ))}
      </div>
    </>
  );
}