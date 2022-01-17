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
import { ThemeColorIdentifier } from "../../helper-function/themeColor";
import MapViewButtonChangeGroup from './MapViewButtonChangeGroup'
import { useWindowSize } from "../../hooks/useWindowSize"

interface ViewChangerComponentsTypes {
  mapViewResources: any;
  setStartUpPolicyChart: React.Dispatch<boolean>;
  fetchPolicy: any;
  setStateViewMode: React.Dispatch<boolean>;
  stateViewMode: boolean;
}

const DARK_THEME_DROPDOWN = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>")`;
const LIGHT_THEME_DROPDOWN = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>")`;

const ViewMoreButton = styled.button<any>`
  font-family: Montserrat;
  padding-top: 7px;
  font-weight: 600;
  font-size: 14px;
  border: 2px solid ${(props: any) => ThemeColorIdentifier(props.colorTheme)};
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
  setStateViewMode,
  stateViewMode,
}: ViewChangerComponentsTypes) {
  const [windowWidth, windowHeight] = useWindowSize()
  const {
    isCircleActive,
    mapMode,
    setIsCircleActive,
    setMapMode,
    setSelectedArea,
    selectedArea,
    getCounts,
    colorTheme,fetchDateRange, dateRangeState, dateRangeLoading
  } = mapViewResources;

  const theme = useContext(ThemeContext);


  const [fetchStartUpTypes, startUpTypes, startTypesLoading] = useQuery(
    "/static/startupTypes"
  );
  const [fetchStartUpCount, countState, countLoading] = useQuery("");

  const [selectedStartUpType, setSelectedStartupType] = useState<any>(0);

  const dateRangeChange = async (changeEvent: any) => {
    const value = changeEvent.target.value;
    if (value === "none") {
      return getCounts();
    }
    getCounts(value);
  };

  const startTypeChange = (changeEvent: any) => {
    const value = changeEvent.target.value;
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

  const redirectToStatePolicy = () => {
    const stateToRedirect = selectedArea.stateName.replaceAll(" ", "-");
    window.location.href = `https://www.startupindia.gov.in/content/sih/en/state-startup-policies/${stateToRedirect}-state-policy.html`;
  };
  const resourse ={ isCircleActive, colorTheme, mapMode,setMapMode, setIsCircleActive }
  return (
    <div className="view-changer-component-styles" style={{ marginTop: windowWidth > 768 ? '24px':'0px' }}>
      <div className={`row ${ windowWidth < 768 ? "" : " mx-0 px-0"}`}>
        <div className="mx-1 col-12 align-items-center justify-content-between d-none d-sm-flex">
          <SelectBoxLabel className="p-0 m-0">Date Range</SelectBoxLabel>
          <SelectBox
            id="dataRangeSelectBox"
            marginBottom="-0.3rem"
            colorTheme={colorTheme}
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
        {
          windowWidth > 768 ? (
            <MapViewButtonChangeGroup {...resourse} />
          ): (<></>)
        }
        <div className="mx-1 col-12 mt-4 pt-0 view-changer-startup-card">
          <Card>
            {/* <div className="select-type-card"> */}
            <h5 className="mb-3 text-bold font-Mont">
              {selectedArea.stateName.toUpperCase()} STARTUPS
            </h5>
            <div>
              <SelectBoxLabel>Select Type</SelectBoxLabel>
              <SelectBox
                colorTheme={colorTheme}
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
              background={theme.bgCard4}
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
                  colorTheme={colorTheme}
                  shadow={true}
                  onClick={() => redirectToStatePolicy()}
                  className={`btn btn-radius w-100 mt-4 ${ stateViewMode ? 'mb-0': ''}`}
                >
                  {VIEW_STATE_STARTUP_POLICY}
                </ViewMoreButton>
                {!stateViewMode && (
                  <ViewMoreButton
                    colorTheme={colorTheme}
                    shadow={false}
                    onClick={() => {
                      setStateViewMode(true);
                    }}
                    className="btn background-color-theme btn-radius w-100 text-white mb-0"
                  >
                    {VIEW_MORE + selectedArea.stateName}
                  </ViewMoreButton>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ViewChangerComponent;
