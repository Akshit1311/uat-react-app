import React, { useContext } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { InsightRowType } from "./Accordion";
import _ from "lodash";
import StarIcon from "@mui/icons-material/Star";
import MoonLoader from "react-spinners/MoonLoader";
import { AiFillInfoCircle } from "react-icons/ai"
import { Tooltip } from "@mui/material";
import { ThemeContext } from "../../config/context";

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
  const theme = useContext(ThemeContext)
  const componentProps = {
    tooltip: {
      sx: {
        fontSize: "15px",
        background: theme.tooltipViewInsight.background,
        color: theme.tooltipViewInsight.color
      },
    },
    arrow: {
      sx: {
        color: theme.tooltipViewInsight.background,
        left: '6px !important' ,
        "&::before": {
          backgroundColor: theme.tooltipViewInsight.background,
          boxSizing: "border-box"
        },
      }
    }
  }
  return (
    <div className='scroll-area-wrapper'>
      <div className="scroll-area">
        <div className="view-insight-header">
          <div>
            <StarBorderIcon className="hidden" />
            <span>{title}</span>
          </div>
          {console.log("STateName", stateName,)}
          {
            stateName != "" || stateName ? (
              <>
                <div className="border-type-2">{stateName}</div>
                <div className="border-type-3">Percentage
                  <Tooltip title={"Percentage is calculated \n based on the total number"} placement={'top'} arrow componentsProps={componentProps}>
                    <span className="text-secondary"><AiFillInfoCircle /></span>
                  </Tooltip>
                </div>
                <div className="border-type-2">India</div>
              </>
            ) : (
              <>
                <div className="border-type-2">Total</div>
              </>
            )
          }
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

            {
              stateName !== "" || !stateName ? (
                <>
                  <div className="border-type-2 font-500 text-right">{insight.count}</div>
                  <div className="border-type-3 font-500 text-right">{insight.percentage} %</div>
                  <div className="border-type-2 font-500 text-right">{insight.indiaTotal}</div>
                </>
              ) : (
                <>

                </>
              )
            }
            <div className="border-type-3 font-500 text-right">
              {insight.indiaPercentage} %
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
