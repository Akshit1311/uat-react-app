import { Input } from "reactstrap";
import React, { useContext, useEffect, useState } from "react";
import { IoMapSharp } from "react-icons/io5";
import { RiDropFill } from "react-icons/ri";
import { MdOutlineLocationCity } from "react-icons/md";
import { GiPeru } from "react-icons/gi";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import * as MapVariables from "./Map/variables";
import moment from "moment";
import HomeApis from "../../config/homepageApis.json";
import "../../scss/HomePageStyles/viewChangerComponent.scss";
import { Card } from "../../styles-components/Cards";
import { SelectBox, SelectBoxLabel } from "../../styles-components/SelectBox";
import styled from "styled-components";
import { IconButton } from "../../styles-components/Button";
import { ThemeContext } from "../../config/context";
import { useQuery } from "../../hooks/useQuery";

interface ViewChangerComponentsTypes {
  mapViewResources: any;
  setStartUpPolicyChart: React.Dispatch<boolean>;
  fetchPolicy: any;
}

const DARK_THEME_DROPDOWN = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>")`;
const LIGHT_THEME_DROPDOWN = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>")`;

const ViewMoreButton = styled.button<any>`
  font-family: Montserrat;
  padding-top: 7px;
  font-weight: 600;
  font-size: 14px;
  border: 2px solid #0177fa;
  margin-bottom: 20px;
  color: ${(props) => props.theme.color};
  box-shadow: ${(props) =>
    props.shadow ? "0px 0px 10px rgba(1, 119, 250, 0.19)" : "none"} !important;
`;

const VIEW_MORE = "View more about ";
const VIEW_STATE_STARTUP_POLICY = "View State Startup Policy";

function ViewChangerComponent({
  mapViewResources,
  setStartUpPolicyChart,
  fetchPolicy,
}: ViewChangerComponentsTypes) {
  const {
    isCircleActive,
    mapMode,
    setIsCircleActive,
    setMapMode,
    setSelectedArea,
    selectedArea,
    getCounts,
  } = mapViewResources;

  const theme = useContext(ThemeContext);

  const [fetchDateRange, dateRangeState, dateRangeLoading] = useQuery(
    "/static/searchDateRanges"
  );
  const [fetchStartUpTypes, startUpTypes, startTypesLoading] = useQuery(
    "/static/startupTypes"
  );
  const [fetchStartUpCount, countState, countLoading] = useQuery("");

  const [selectedStartUpType, setSelectedStartupType] = useState<any>(0);

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

  const dateRangeChange = async (changeEvent: any) => {
    const value = changeEvent.target.value;
    if (value === "none") {
      return getCounts();
    }
    // const today = new Date();
    // const beginDate = await moment(today).format("YYYY-MM-DD");
    // const endDate = await moment(today)
    //   .subtract({ months: value })
    //   .format("YYYY-MM-DD");
    const valueSplit = value.split("/");
    const beginData = valueSplit[0];
    const endDate = valueSplit[1];
    getCounts(HomeApis.countDateRange + value);
  };

  const startTypeChange = (changeEvent: any) => {
    const value = changeEvent.target.value;
    console.log(value);
    setSelectedStartupType(value);
    fetchStartUpCount("/startup/startupCount/" + value);
  };

  const getThemeDropDownImage = () => {
    if (theme.dropDownColorCode === 1) return LIGHT_THEME_DROPDOWN;
    if (theme.dropDownColorCode === 0) return DARK_THEME_DROPDOWN;
  };

  useEffect(() => {
    fetchDateRange();
    fetchStartUpTypes();
    fetchStartUpCount("/startup/startupCount/0");
  }, []);

  return (
    <div className="view-changer-component-styles">
      <div className="">
        <div className="mx-1 col-12 d-flex align-items-center justify-content-between">
          <SelectBoxLabel className="p-0 m-0">Date Range</SelectBoxLabel>
          <SelectBox
            id="dataRangeSelectBox"
            marginBottom="0px"
            style={{
              backgroundImage: getThemeDropDownImage(),
            }}
            onChange={dateRangeChange}
          >
            <option value="none">All </option>
            {dateRangeState.map((item: any) => (
              <option value={item.from + "/" + item.to}> {item.text} </option>
            ))}
          </SelectBox>
          <button
            style={{ visibility: "hidden" }}
            className="bg-white text-dark shadow-none btn btn-icon-handler border-primary"
          >
            <MdOutlineLocationCity
              style={{ marginTop: "-7px", marginLeft: "-1px" }}
              size={18}
            />
          </button>
        </div>
        <div className="mx-1 col-12 mt-4">
          <div className="d-flex justify-content-between">
            <div>
              <Tooltip
                animation="zoom"
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={stateText}
              >
                <IconButton
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
                  active={mapMode.id === MapVariables.CITY.id}
                  className={`btn btn-icon-handler border-primary dark ${
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
                  active={mapMode.id === MapVariables.DISTRICT.id}
                  className={`btn btn-icon-handler border-primary ${
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
                onClick={circleView}
                className={`btn btn-icon-handler border-primary shadow-small ${
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
        <div className="mx-1 col-12 mt-4 pt-0">
          <Card>
            {/* <div className="select-type-card"> */}
            <h5 className="mb-3 font-poppins">
              {selectedArea.stateName.toUpperCase()} STARTUPS
            </h5>
            <div>
              <SelectBoxLabel>Select Type</SelectBoxLabel>
              <SelectBox
                style={{
                  backgroundImage: getThemeDropDownImage(),
                }}
                marginBottom="20px"
                onChange={startTypeChange}
              >
                {startUpTypes.map((item: any) => (
                  <option value={item.index}>{item.text}</option>
                ))}
              </SelectBox>
            </div>
            <Card
              background={theme.bgColorStart}
              className="d-flex flex-row align-items-center px-3 py-3 my-0 mb-1"
              border={true}
            >
              <h3 className="p-0 m-0">{countState}</h3>
              <span className="selected-startups">
                {startUpTypes[selectedStartUpType]
                  ? startUpTypes[selectedStartUpType].text
                  : ""}
              </span>
            </Card>
            {selectedArea.id !== "india" && (
              <>
                <ViewMoreButton
                  shadow={true}
                  className="btn btn-radius w-100 mt-4"
                >
                  {VIEW_STATE_STARTUP_POLICY}
                </ViewMoreButton>
                <ViewMoreButton
                  shadow={false}
                  onClick={() => {
                    setStartUpPolicyChart(true);
                  }}
                  className="btn btn-primary btn-radius w-100 text-white"
                >
                  {VIEW_MORE + selectedArea.stateName}
                </ViewMoreButton>
              </>
            )}
            {/* </div> */}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ViewChangerComponent;
