import React, { useState, useContext, useEffect, useMemo } from "react";
import CountsBlockComponent from "./CountsBlockComponent";
import LeftNavComponent from "./LeftNav/LeftNavComponent";
import MapComponent from "./Map/MapComponent";
import StartupsListComponent from "./StartupsListComponent";
import ViewChangerComponent from "./ViewChangerComponent";
import "../../scss/HomePageStyles/homePage.scss";
import styled from "styled-components";
import * as MapVariables from "./Map/variables";
import { Button } from "../../styles-components/Button";
import { useQuery } from "../../hooks/useQuery";
import HomePageApi from "../../config/homepageApis.json";
import { NAVBAR_HEIGHT } from "../../config/context";
import { ThemeContext } from "../../config/context";
import DataTable from "./DataTable";
import {
  PageWrapper,
  PageWrapperContainer,
} from "../../styles-components/PageWrapper";
import { useMutate } from "../../hooks/useMutate";
import StateView from "./Map/StateView";
import { ThemeButton as FilterButton } from "../../styles-components/Button";
import { BiFilter } from "react-icons/bi";
import MobileFilter from "./LeftNav/MobileFilter";
import SearchBar from "./AllSearch";
import MapViewChangeButtonGroup from "./MapViewButtonChangeGroup";
import ViewInsight from "./ViewInsight";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useWebQuery } from "../../hooks/useWebQuery";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setColorTheme } from "../../store/config";
import moment from "moment";
import StateViewDataTable from "./StateViewDataTable";

const ButtonGroup = styled.div`
  border: ${(props) => props.theme.togglerButton.border};
  @media (max-width: 768px) {
    width: 70%;
  }
`;

const Strip = styled.div`
  background-color: ${(props) => props.theme.bgStripe};
  color: ${(props) => props.theme.color};
  box-shadow: ${(props) => props.theme.shadowStripe};
`;
// box-shadow: 0px 0px 10px rgba(193, 193, 193, 0.25);

const INITIAL_FILTER_STATE2 = {
  industries: [],
  sectors: [],
  stages: [],
  states: [],
  badges: [],
  counts: [],
  registrationFrom: "",
  registrationTo: "",
};

interface HomePageTypes {
  navHeight: string;
}

const INITIAL_FILTER_STATE = {
  industries: [],
  sectors: [],
  states: [],
  stages: [],
  badges: [],
  roles: ["Startup"],
  counts: [],
  registrationFrom: "",
  registrationTo: "",
};

const INITIAL_DISTRICT_STATISTICS = {
  from: "2015-01-10",
  to: "2022-01-01",
  data: [],
};

export interface StartupType {
  index: string;
  text: string;
}

export class CountBlockModel {
  Exploring: number = 0;
  Incubator: number = 0;
  Corporate: number = 0;
  SIH_Admin: number = 0;
  Mentor: number = 0;
  Academia: number = 0;
  GovernmentBody: number = 0;
  ConnectToPotentialPartner: number = 0;
  IndiaMarketEntry: number = 0;
  Individual: number = 0;
  ServiceProvider: number = 0;
  Investor: number = 0;
  Startup: number = 0;
  Accelerator: number = 0;
  maxRange: number = 0;
}

const HomePage = (props: HomePageTypes) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const [selectedArea, setSelectedArea] = useState<MapVariables.IDType>(
    MapVariables.INDIA
  );
  const [mapMode, setMapMode] = useState<MapVariables.IDType>(
    MapVariables.INDIA
  );

  const [activeCard, setActiveCard] = useState<string>("Startups");

  const [mobileFilterVisible, setMobileFilterVisible] =
    useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] =
    useState<any>(INITIAL_FILTER_STATE);

  const [isCircleActive, setIsCircleActive] = useState<boolean>(false);
  const [startUpPolicyChart, setStartUpPolicyChart] = useState<boolean>(false);
  const [selectedStateByMap, setSelectedStateByMap] = useState({
    id: "",
    name: "",
  });
  const [countState, setCountState] = useState<any>(new CountBlockModel());

  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const [fetchTableData, tableState, tableLoading] = useMutate(
    "/data/v2/statistics/country/5f02e38c6f3de87babe20cd2/2015-01-01/" +
      currentDate,
    {
      from: "2015-01-01",
      to: "2022-01-02",
      data: [],
    }
  );

  const addIdNameText = (data: any) => {
    data = data.data.map((i: any) => {
      i.name = i.state ? i.state : "";
      i.text = i.state ? i.state : "";
      i.id = i.stateId ? i.stateId : "";
      return i;
    });
    return data;
  };
  // const tableState = addIdNameText(statisticsData);

  // const tableState = useMemo(()=>{
  //   const result = statisticsData.data.map((i: any) => {
  //     i.name = i.state ? i.state : "";
  //     i.text = i.state ? i.state : "";
  //     i.id = i.stateId ? i.stateId : "";
  //     return i;
  //   });
  //   return result;
  // },[statisticsData]);

  const [fetchFilterList, filterState, filterLoading] = useMutate(
    "/startup/filter/v2/defaults",
    INITIAL_FILTER_STATE2
  );

  const [startupType, setStartupType] = useState<StartupType>({
    index: "0",
    text: "All Startups",
  });
  const [fetchDistrict, districtStatistics, districtStatisticsLoading] =
    useQuery(
      `/data/v2/statistics/state/${appliedFilters.states[0]}/2015-01-10/2022-01-01`
    );

  const [stateViewMode, setStateViewMode] = useState<boolean>(false);

  const [fetchPolicy, policyState, policyLoading] = useQuery("");
  const [selectedCountBlock, setSelectedCountBlock] = useState("Startup");

  const [primaryColorTheme, setPrimaryColorTheme] = useState("theme-1");

  const applyRoles = (role: string, name: string) => {
    setSelectedCountBlock(name);
    setAppliedFilters((prevState: any) => ({ ...prevState, roles: [role] }));
  };

  const theme = useContext(ThemeContext);

  // const [getCounts, countState, countLoading] = useQuery(
  //   HomePageApi.countBlockEndPoint
  // );
  const [fetchDateRange, dateRangeState, dateRangeLoading] = useQuery(
    "/static/searchDateRanges"
  );

  const countWrrapper = (data: any[]) => {
    const obj = new CountBlockModel();
    const findIndex = (countType: string) =>
      data.findIndex((item) => item.id === countType);
    obj.Investor = data[findIndex("Investor")]
      ? data[findIndex("Investor")].value
      : 0;
    obj.Startup = data[findIndex("Startup")]
      ? data[findIndex("Startup")].value
      : 0;
    obj.Incubator = data[findIndex("Incubator")]
      ? data[findIndex("Incubator")].value
      : 0;
    obj.Mentor = data[findIndex("Mentor")]
      ? data[findIndex("Mentor")].value
      : 0;
    obj.Accelerator = data[findIndex("Accelerator")]
      ? data[findIndex("Accelerator")].value
      : 0;
    obj.GovernmentBody = data[findIndex("GovernmentBody")]
      ? data[findIndex("GovernmentBody")].value
      : 0;
    return obj;
  };

  const fetchDefaultFilterValues = (value: string) => {
    let split = ["", ""];
    if (value) {
      split = value.split("/");
    }
    const body = {
      registrationFrom: split[0],
      registrationTo: split[1],
    };
    setAppliedFilters((prevState: any) => ({ ...prevState, ...body }));
    fetchFilterList(body);
  };

  // useEffect(() => {
  //   fetchCounts();
  // }, [appliedFilters])
  const dispatch = useDispatch();
  const changeTheme = (themeInfo: string) => {
    setPrimaryColorTheme(themeInfo);
    dispatch(setColorTheme(themeInfo));
    const body = window.document.getElementById("viewport");
    body?.setAttribute("class", themeInfo);
  };

  useEffect(() => {
    changeTheme("theme-1");
  }, []);
  const countResource = {
    getCounts: fetchDefaultFilterValues,
    countLoading: tableLoading,
    setSelectedArea,
    tableState,
    selectedStateByMap,
    setSelectedStateByMap,
    setPrimaryColorTheme: changeTheme,
    colorTheme: primaryColorTheme,
    appliedFilters,
  };

  const mapViewResources = {
    isCircleActive,
    mapMode,
    setIsCircleActive,
    setMapMode,
    setSelectedArea,
    selectedArea,
    getCounts: fetchDefaultFilterValues,
    countState,
    tableState,
    appliedFilters,
    setSelectedStateByMap,
    colorTheme: primaryColorTheme,
    tableLoading,
    fetchDateRange,
    dateRangeState,
    dateRangeLoading,
    setStateViewMode,
    fetchDistrict,
    activeCard,
    fetchTableData,
  };

  const [selectedState, setSelectedState] = useState<any[]>([]);
  const FilterProps = {
    appliedFilters,
    setAppliedFilters,
    selectedArea,
    setSelectedArea,
    colorTheme: primaryColorTheme,
    fetchFilterList: fetchDefaultFilterValues,
    filterState,
    filterLoading,
    selectedState,
    setSelectedState,
    setStateViewMode
  };

  const [startupListActive, setStartupListActive] = useState(true);
  const toggleStartUp = () => setStartupListActive((prevState) => !prevState);

  const viewInsightUrl = `/view-insight?id=${
    selectedState[0] ? selectedState[0].id : ""
  }&state=${selectedState[0] ? selectedState[0].value : ""}`;
  const query = useWebQuery();

  useEffect(() => {
    const stateName = query.get("state");
    const stateId = query.get("id");
    if (stateName && stateName?.length && stateId && stateId?.length) {
      setSelectedArea({
        id: stateId !== null ? stateId : "",
        stateName: stateName ? stateName : "",
      });
      setSelectedStateByMap({
        id: stateId !== null ? stateId : "",
        name: stateName ? stateName : "",
      });
    }
    const queryCountBlock = query.get("count");
    // if(queryCountBlock){
    //   setSelectedCountBlock(queryCountBlock)
    // } else setSelectedCountBlock('Startup')
  }, [query.get("state"), query.get("id")]);

  return (
    <>
      <div
        className={`border-bottom home-component-styles mx-0 px-0 ${primaryColorTheme}`}
        style={{
          marginTop: NAVBAR_HEIGHT,
        }}
      >
        <PageWrapperContainer>
          <PageWrapper>
            {windowWidth < 768 ? (
              <FilterButton
                colorTheme={primaryColorTheme}
                onClick={() => setMobileFilterVisible(true)}
                bottom={"30px"}
                fontSize={"30px"}
              >
                <BiFilter className="mb-2" />
              </FilterButton>
            ) : (
              <></>
            )}
            <MobileFilter
              isVisible={mobileFilterVisible}
              filterProps={FilterProps}
              handleToggle={() => setMobileFilterVisible(false)}
              fetchDateRange={fetchDateRange}
              dateRangeState={dateRangeState}
              dateRangeLoading={dateRangeLoading}
            />
            <div className="row px-0 mx-0">
              <div className="px-0 p-0 col-filter-section">
                <LeftNavComponent
                  {...FilterProps}
                  insight={true}
                  search={true}
                  handleToggle={false}
                ></LeftNavComponent>
              </div>
              <div className="col-content-section p-0">
                <div className="col-12 col-md px-0 mx-0 w-100">
                  {windowWidth < 768 && (
                    <div
                      style={{
                        height: "125px",
                      }}
                    ></div>
                  )}
                  <div
                    className="row px-0 mx-0 w-100"
                    style={
                      windowWidth < 768
                        ? {
                            position: "fixed",
                            top: "70px",
                            background: theme.bgColorStart,
                            zIndex: 1000,
                          }
                        : {}
                    }
                  >
                    <CountsBlockComponent
                      countResource={countResource}
                      selectedArea={selectedArea}
                      applyRoles={applyRoles}
                      setStateViewMap={setStateViewMode}
                      activeCard={activeCard}
                      setActiveCard={setActiveCard}
                    />
                  </div>
                  <div className="d-block d-sm-none mb-3">
                    {/* <SearchBar
                      colorTheme={primaryColorTheme}
                      filterState={filterState}
                      searchBarExpanded={false}
                    /> */}
                    <div className="px-c-2">
                      <MapViewChangeButtonGroup
                        isCircleActive={isCircleActive}
                        colorTheme={primaryColorTheme}
                        mapMode={mapMode}
                        setMapMode={setMapMode}
                        setIsCircleActive={setIsCircleActive}
                      />
                    </div>
                  </div>
                  <div className="col-12 row px-0 mx-0">
                    <div className="col-12 p-c-4 pb-0 pe-0 col-map">
                      {!stateViewMode && (
                        <MapComponent
                          scaleBarVisible={true}
                          startupType={startupType}
                          mapViewResource={mapViewResources}
                        />
                      )}
                      {stateViewMode && (
                        <StateView
                          selectedArea={appliedFilters.states[0]}
                          setStateViewMode={setStateViewMode}
                          colorTheme={primaryColorTheme}
                          startupType={startupType}
                          data={districtStatistics}
                        />
                      )}
                    </div>
                    <div className="col-12 col-view-changer">
                      <ViewChangerComponent
                        mapViewResources={mapViewResources}
                        setStartUpPolicyChart={setStartUpPolicyChart}
                        fetchPolicy={fetchPolicy}
                        setStateViewMode={setStateViewMode}
                        stateViewMode={stateViewMode}
                        fetchDistrict={fetchDistrict}
                        setStartupType={setStartupType}
                      />
                    </div>
                  </div>
                </div>
                <Strip className="row me-0 strip  align-items-center d-flex">
                  <span className="m-0 px-3 strip-text font-Mont">
                    <b className="me-3 strip-bold-text font-Mont">
                      Please Note :
                    </b>
                    {windowWidth > 768 ? "" : <div className="mb-2"></div>}
                    The information is based on self declaration by community
                    members. Startup India dosen't moderate the information
                    collected.
                  </span>
                </Strip>
                <div className="d-block d-sm-none">
                  <ViewInsight
                    colorTheme={primaryColorTheme}
                    viewInsightUrl={viewInsightUrl}
                    selectedState={selectedState}
                  />
                </div>
                <div className="row d-flex justify-content-center px-0 mx-0">
                  <ButtonGroup className="btn-group text-center col-md-3 button-togglers">
                    <Button
                      colorTheme={primaryColorTheme}
                      backgroundColor={`${
                        !startupListActive &&
                        theme.togglerButton.backgroundInactive
                      }`}
                      color={`${
                        !startupListActive && theme.togglerButton.color
                      }`}
                      border={`${!startupListActive && "0px"}`}
                      className={`font-500 font-family-Mont shadow-none border-0 px-3 ${
                        startupListActive && "text-white background-color-theme"
                      }`} style={{ whiteSpace: "nowrap"}}
                      onClick={toggleStartUp}
                    >
                      {activeCard} List
                    </Button>
                    <Button
                      colorTheme={primaryColorTheme}
                      backgroundColor={`${
                        startupListActive &&
                        theme.togglerButton.backgroundInactive
                      }`}
                      color={`${
                        startupListActive && theme.togglerButton.color
                      }`}
                      border={`${startupListActive && "0px"}`}
                      className={`font-500 font-family-Mont shadow-none  px-3 border-0 ${
                        !startupListActive &&
                        "text-white background-color-theme"
                      }`}
                      onClick={toggleStartUp}
                    >
                      Data Table
                    </Button>
                  </ButtonGroup>
                  <div className="mx-0 px-0">
                    {true && (
                      <div
                        style={{
                          display: startupListActive ? "flex" : "none",
                        }}
                        className="mx-0 ms-sm-4 ms-0"
                      >
                        <StartupsListComponent
                          startupType={startupType}
                          appliedFilters={appliedFilters}
                          selectedCountBlock={selectedCountBlock}
                          mapViewResource={mapViewResources}
                        />
                      </div>
                    )}
                    {
                      <>
                        <div
                          style={{
                            display: !startupListActive ? "block" : "none",
                            transition: "all 0.3s",
                          }}
                          className="mx-0 ms-sm-2 ms-0"
                        >
                          {stateViewMode ? (
                            <StateViewDataTable
                              selectedArea={appliedFilters.states[0]}
                              fetch={fetchDistrict}
                              data={districtStatistics.data}
                              startupType={startupType}
                            />
                          ) : (
                            <DataTable
                              fetch={fetchTableData}
                              state={tableState}
                              appliedFilters={appliedFilters}
                              loading={tableLoading}
                            />
                          )}
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </PageWrapper>
        </PageWrapperContainer>
      </div>
    </>
  );
};

export default React.memo(HomePage);
