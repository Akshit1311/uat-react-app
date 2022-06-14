import "rc-tooltip/assets/bootstrap_white.css";
import React, { useEffect } from "react";
import { GiPeru } from "react-icons/gi";
import { IoMapSharp } from "react-icons/io5";
import { MdOutlineLocationCity } from "react-icons/md";
import { RiDropFill } from "react-icons/ri";
import "../../scss/HomePageStyles/viewChangerComponent.scss";
import { IconButton } from "../../styles-components/Button";
import * as MapVariables from "./Map/variables";
import { Tooltip as MuiToolTip } from "@mui/material";
import { ThemeContext } from "../../config/context";
import { ThemeColorIdentifier } from "../../helper-function/themeColor";

export default function MapViewChangeButtonGroup(props: any) {
  const {
    isCircleActive,
    colorTheme,
    mapMode,
    setMapMode,
    setIsCircleActive,
    additionalClass,
  } = props;
  const stateText = (
    <div className=" px-3" style={{ paddingTop: "2px" }}>
      <span>State</span>
    </div>
  );
  const districtText = (
    <div className=" px-3" style={{ paddingTop: "2px" }}>
      <span>District</span>
    </div>
  );
  const cityText = (
    <div className=" px-3" style={{ paddingTop: "2px" }}>
      <span>City</span>
    </div>
  );

  const circleText = (
    <div className=" px-3" style={{ paddingTop: "2px" }}>
    <span>View</span>
  </div>
  )
  const defaultView = () => setMapMode(MapVariables.INDIA);

  const circleView = () => {
    setIsCircleActive((prevState: boolean) => !prevState);
  };

  const districtView = () => setMapMode(MapVariables.DISTRICT);
  const cityView = () => {
    setMapMode(MapVariables.CITY);
    setIsCircleActive(true);
  };

  const theme = React.useContext(ThemeContext);
  const TOOLTIP_SX = {
    fontSize: "15px",
    background: theme.tooltip.background,
    border: `2px solid ${ThemeColorIdentifier(colorTheme)}`,
    borderRadius: "5px",
    color: theme.tooltip.text,
    padding: "0.1rem",
    cursor: "grab",
  };
  const ARROW_SX = {
    color: theme.tooltip.background,
    "&::before": {
      border: `2px solid ${ThemeColorIdentifier(colorTheme)}`,
      backgroundColor: theme.tooltip.background,
      boxSizing: "border-box",
    },
  };
  useEffect(() => {
    if (props.activeCard !== "Startups") {
      defaultView();
    }
  }, [props.activeCard]);
  return (
    <div className={`mx-1 col-12 mt-4 `}>
      <div className={`d-flex justify-content-between `}>
        <div className="d-flex">
          <MuiToolTip
            placement="top"
            title={stateText}
            arrow
            componentsProps={{
              tooltip: {
                sx: TOOLTIP_SX,
              },
              arrow: {
                sx: ARROW_SX,
              },
            }}
          >
            <IconButton
              colorTheme={colorTheme}
              onClick={() => {
                defaultView();
                setIsCircleActive(false);
              }}
              active={mapMode.id === MapVariables.INDIA.id}
              className={`btn-outline btn-icon-handler ${
                mapMode.id === MapVariables.INDIA.id ? "bg-active" : ""
              }`}
            >
              <IoMapSharp
                size={18}
                style={{ marginTop: "0px", marginLeft: "-1px" }}
              />
            </IconButton>
          </MuiToolTip>
          {props.activeCard === "Startups" ? (
            <>
              <MuiToolTip
                placement="top"
                title={cityText}
                arrow
                componentsProps={{
                  tooltip: {
                    sx: TOOLTIP_SX,
                  },
                  arrow: {
                    sx: ARROW_SX,
                  },
                }}
              >
                <IconButton
                  onClick={cityView}
                  colorTheme={colorTheme}
                  active={mapMode.id === MapVariables.CITY.id}
                  className={`btn btn-icon-handler  dark ${
                    mapMode.id === MapVariables.CITY.id ? "bg-active" : ""
                  }`}
                >
                  <MdOutlineLocationCity
                    // style={{ marginTop: "-8px" }}
                    size={18}
                  />
                </IconButton>
              </MuiToolTip>
              <MuiToolTip
                placement="top"
                title={districtText}
                arrow
                componentsProps={{
                  tooltip: {
                    sx: TOOLTIP_SX,
                  },
                  arrow: {
                    sx: ARROW_SX,
                  },
                }}
              >
                <IconButton
                  onClick={() => {
                    districtView();
                    setIsCircleActive(false);
                  }}
                  colorTheme={colorTheme}
                  active={mapMode.id === MapVariables.DISTRICT.id}
                  className={`btn btn-icon-handler  ${
                    mapMode.id === MapVariables.DISTRICT.id ? "bg-active" : ""
                  }`}
                >
                  <GiPeru
                    // style={{ marginTop: "-8px", marginLeft: "-1px" }}
                    size={18}
                  />
                </IconButton>
              </MuiToolTip>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <MuiToolTip
            placement="top"
            title={circleText}
            arrow
            componentsProps={{
              tooltip: {
                sx: TOOLTIP_SX,
              },
              arrow: {
                sx: ARROW_SX,
              },
            }}
          >
            <IconButton
              active={isCircleActive}
              colorTheme={colorTheme}
              onClick={circleView}
              className={`btn btn-icon-handler shadow-small ${
                isCircleActive ? "bg-active" : ""
              } ${mapMode.id === MapVariables.DISTRICT.id ? "d-none" : ""}`}
            >
              <RiDropFill
                size={18}
                // style={{ marginTop: "-5px", marginLeft: "1px" }}
              />
            </IconButton>
          </MuiToolTip>
        </div>
      </div>
    </div>
  );
}
