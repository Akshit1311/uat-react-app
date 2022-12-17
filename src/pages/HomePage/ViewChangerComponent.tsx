import axios from "axios";
import moment from "moment";
import "rc-tooltip/assets/bootstrap_white.css";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineLocationCity } from "react-icons/md";
import styled from "styled-components";
import { ThemeContext } from "../../config/context";
import { ThemeColorIdentifier } from "../../helper-function/themeColor";
import { useQuery } from "../../hooks/useQuery";
import { useWebQuery } from "../../hooks/useWebQuery";
import { useWindowSize } from "../../hooks/useWindowSize";
import "../../scss/HomePageStyles/viewChangerComponent.scss";
import { Card } from "../../styles-components/Cards";
import { SelectBox, SelectBoxLabel } from "../../styles-components/SelectBox";
import { StartupType } from "./index";
import MapViewButtonChangeGroup from "./MapViewButtonChangeGroup";

interface ViewChangerComponentsTypes {
  mapViewResources: any;
  setStartUpPolicyChart: React.Dispatch<boolean>;
  fetchPolicy: any;
  setStateViewMode: React.Dispatch<boolean>;
  stateViewMode: boolean;
  fetchDistrict: any;
  setStartupType: React.Dispatch<StartupType>;
}

const BASE_URL = process.env.REACT_APP_BACKEND_ENDPOINT;

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

const DATA_TABLE_API = `${BASE_URL}/data/v2/statistics/country/5f02e38c6f3de87babe20cd2/`;
const DISTRICT_API = `${BASE_URL}/data/v2/statistics/state/`;

const startupTypeValues: any[] = [
  "allStartups",
  "dpiitCertified",
  "showcased",
  "seedFunded",
  "fundOfFunds",
  "seedFunded",
  "patented",
  "womenOwned",
  "leadingSector",
  "declaredRewards",
];

function ViewChangerComponent({
  mapViewResources,
  setStartUpPolicyChart,
  fetchPolicy,
  setStateViewMode,
  stateViewMode,
  fetchDistrict,
  setStartupType,
}: ViewChangerComponentsTypes) {
  const [windowWidth, windowHeight] = useWindowSize();
  const {
    isCircleActive,
    mapMode,
    setIsCircleActive,
    setMapMode,
    setSelectedArea,
    selectedArea,
    getCounts,
    colorTheme,
    fetchDateRange,
    dateRangeState,
    dateRangeLoading,
    appliedFilters,
    activeCard,
    fetchTableData,
    setDateRangeCount,
    setStartupCount,
    startupCount,
  } = mapViewResources;

  const theme = useContext(ThemeContext);
  const today = "2015-01-01" + "/" + moment(new Date()).format("YYYY-MM-DD");
  const query = useWebQuery();

  const [newCount, setNewCount] = useState<number>(startupCount);
  const [selectedStartTypeIndex, setSelectedStartupTypeIndex] =
    useState<number>(1);

  const [fetchStartUpTypes, startUpTypes, startTypesLoading] = useQuery(
    "/static/startupTypes"
  );
  const [fetchStartUpCount, countState, countLoading] =
    useQuery("home/startupCounts");

  const [selectedStartUpType, setSelectedStartupType] = useState<any>(0);
  const [selectedDateRange, setSelectedDateRange] = useState<string>("");

  const dateRangeChange = async (changeEvent: any) => {
    const value = changeEvent.target.value;
    if (value === "none") {
      return getCounts();
    }

    fetchTableData(DATA_TABLE_API + value);
    getCounts(value);
    fetchInitialCount(selectedStartTypeIndex, value);
    setSelectedDateRange(value);
    if (appliedFilters.states[0]) {
      fetchDistrict(DISTRICT_API + appliedFilters.states[0] + "/" + value);
    }
  };

  const startTypeChange = (changeEvent: any) => {
    const value = changeEvent.target.value;
    const obj = startUpTypes.filter((item: any) => item.index == value);    
    setSelectedStartupType(value);
    setSelectedStartupTypeIndex(value);
    setStartupType(obj[0]);
    
    if (!appliedFilters.states[0]) {      
      fetchInitialCount(value, selectedDateRange);
    }
  };

  const getThemeDropDownImage = () => {
    if (theme.dropDownColorCode === 1) return LIGHT_THEME_DROPDOWN;
    if (theme.dropDownColorCode === 0) return DARK_THEME_DROPDOWN;
  };

  useEffect(() => {
    if (countState["dpiitCertified"]) {
      setNewCount(countState["dpiitCertified"]);
    }
  }, [countState]);

  useEffect(() => {
    fetchDateRange();
    fetchStartUpTypes();
    fetchStartUpCount();    
    // fetchInitialCount(0);
  }, []);

  // function for creating apiurl
  const apiUrl = (dateRange: string) => {
    let url = "home/startupCounts?";
    if (query.get("id")) {
      url += `stateId=${query.get("id")}&`;
    }
    if (dateRange) {
      let dates: any = dateRange.split("/");
      dates = `from=${dates[0]}&to=${dates[1]}`;
      url += dates;
    }

    return url;
  };

  const fetchInitialCount = async (startupType: number, dateRange: string) => {
    try {
      // create and get api url
      let url = apiUrl(dateRange);
      let data;
      let key;
      // get data from api call
      if (startupType != 8) {
        const { data: response } = await axios.get(url);
        data = response;
        key = startupTypeValues[startupType];
      } else {
        const { data: response } = await axios.get("home/leadingsector");
        data = response;
        key = "count";
      }
      // fetch data according to index key
      
      //setting up data in state
      if (data[key]) {
        setNewCount(data[key]);       
      } else if (startupType == 0) {
        // setNewCount(startupCount);
      } else {
        setNewCount(0);        
      }

      if (data[key] && data[key] > 0) {
        setDateRangeCount(true);
      } else if (startupType == 0 && startupCount > 0) {
        setDateRangeCount(true);
      } else {
        setDateRangeCount(false);
      }
    } catch (error) {}
  };

  useEffect(()=>{    
    if(selectedStartTypeIndex != 0){      
      setStartupCount(newCount);
    }    
  },[newCount])
  
  useEffect(() => {
    if (activeCard !== "Startups") {
      setNewCount(startupCount);
      setDateRangeCount(true);   
      setSelectedStartupTypeIndex(1)   
    } else {
      setStartupType({
        index: "1",
        text: "DPIIT recognised startups",
      });
      
    }   
  }, [activeCard]);

  useEffect(() => {
    // if (selectedStartTypeIndex == 0) {
    //   setNewCount(startupCount);      
    //   if (startupCount > 0) {
    //     setDateRangeCount(true);
    //   } else {
    //     setDateRangeCount(false);
    //   }
    // } else {
      fetchInitialCount(selectedStartTypeIndex, selectedDateRange);
    // }
  }, [
    appliedFilters.states,
    selectedStartTypeIndex,
    query.get("id"),
    startupCount,
  ]);

  

  const redirectToStatePolicy = () => {
    const stateToRedirect = selectedArea.stateName.replaceAll(" ", "-");
    window.location.href = `https://www.startupindia.gov.in/content/sih/en/state-startup-policies/${stateToRedirect}-state-policy.html`;
  };

  const resourse = {
    isCircleActive,
    colorTheme,
    mapMode,
    setMapMode,
    setIsCircleActive,
    activeCard,
    stateViewMode,
  };

 

  return (
    <div
      className="view-changer-component-styles"
      style={{ marginTop: windowWidth > 768 ? "24px" : "0px" }}
    >
      <div className={`row ${windowWidth < 768 ? "" : " mx-0 px-0"}`}>
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
            <option value={today}>All </option>
            {dateRangeState.map((item: any) => (
              <option
                key={item.from + "/" + item.to}
                value={item.from + "/" + item.to}
              >
                {" "}
                {item.text}{" "}
              </option>
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
        {windowWidth > 768 ? <MapViewButtonChangeGroup {...resourse} /> : <></>}
        <div className="mx-1 col-12 mt-4 pt-0 view-changer-startup-card">
          <Card>
            {/* <div className="select-type-card"> */}
            <h5 className="mb-3 text-bold font-Mont">
              {selectedArea.stateName.toUpperCase()} STARTUPS
            </h5>
            <div>
              <SelectBoxLabel>Select Startup Type</SelectBoxLabel>
              <SelectBox
                colorTheme={colorTheme}
                style={{
                  backgroundImage: getThemeDropDownImage(),
                }}
                marginBottom="20px"
                value={selectedStartTypeIndex}
                onChange={startTypeChange}
              >
               
                {startUpTypes.map((item: any, index: number) => (
                  <option
                    key={item.index}
                    value={item.index}                  
                  >                  
                    {item.text}
                  </option>
                ))}
              </SelectBox>
            </div>
            <Card
              background={theme.bgCard4}
              className="d-flex flex-row align-items-center px-3 py-3 my-0 mb-1 justify-content-center"
              style={{ height: "60px" }}
              border={true}
            >
              {newCount > 0 ? (
                <h3 className="p-0 m-0 text-center">{newCount}</h3>
              ) : (
                <p className="text-muted m-0 p-0 font-500">
                  {"Data Not Available."}
                </p>
              )}
            </Card>
            {selectedArea.id !== "india" && (
              <>
                <ViewMoreButton
                  colorTheme={colorTheme}
                  shadow={true}
                  onClick={() => redirectToStatePolicy()}
                  className={`btn btn-radius w-100 mt-4 ${
                    stateViewMode || activeCard !== "Startups" ? "mb-0" : ""
                  }`}
                >
                  {VIEW_STATE_STARTUP_POLICY}
                </ViewMoreButton>
                {!stateViewMode && activeCard === "Startups" && (
                  <ViewMoreButton
                    colorTheme={colorTheme}
                    shadow={false}
                    onClick={() => {
                      setStateViewMode(true);
                      fetchDistrict();
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
