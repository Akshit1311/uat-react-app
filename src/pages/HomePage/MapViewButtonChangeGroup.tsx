import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import React from "react";
import { GiPeru } from "react-icons/gi";
import { IoMapSharp } from "react-icons/io5";
import { MdOutlineLocationCity } from "react-icons/md";
import { RiDropFill } from "react-icons/ri";
import "../../scss/HomePageStyles/viewChangerComponent.scss";
import { IconButton } from "../../styles-components/Button";
import * as MapVariables from "./Map/variables";


export default function MapViewChangeButtonGroup(props:any){
    const { isCircleActive, colorTheme, mapMode,setMapMode, setIsCircleActive, additionalClass } = props;
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
      const defaultView = () => setMapMode(MapVariables.INDIA);

      const circleView = () => {
        setIsCircleActive((prevState: boolean) => !prevState);
      };
    
      const districtView = () => setMapMode(MapVariables.DISTRICT);
      const cityView = () => {
        setMapMode(MapVariables.CITY);
        circleView();
      };
    return(
        <div className={`mx-1 col-12 mt-4 `}>
          <div className={`d-flex justify-content-between `}>
            <div>
              <Tooltip
                animation="zoom"
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={stateText}
              >
                <IconButton
                  colorTheme={colorTheme}
                  onClick={defaultView}
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
              </Tooltip>
              <Tooltip
                animation="zoom"
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={cityText}
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
                    style={{ marginTop: "-5px", marginLeft: "1px" }}
                    size={18}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                animation="zoom"
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={districtText}
              >
                <IconButton
                  onClick={districtView}
                  colorTheme={colorTheme}
                  active={mapMode.id === MapVariables.DISTRICT.id}
                  className={`btn btn-icon-handler  ${
                    mapMode.id === MapVariables.DISTRICT.id ? "bg-active" : ""
                  }`}
                >
                  <GiPeru
                    style={{ marginTop: "-6px", marginLeft: "-1px" }}
                    size={18}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <IconButton
                active={isCircleActive}
                colorTheme={colorTheme}
                onClick={circleView}
                className={`btn btn-icon-handler shadow-small ${
                  isCircleActive ? "bg-active" : ""
                }`}
              >
                <RiDropFill
                  size={18}
                  style={{ marginTop: "-5px", marginLeft: "1px" }}
                />
              </IconButton>
            </div>
          </div>
        </div>
    )
}