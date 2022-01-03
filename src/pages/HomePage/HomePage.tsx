import React, { useState, useContext } from "react";
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
import StatePolicy from "./Charts/StatePolicy";
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

const ButtonGroup = styled.div`
  border: ${(props) => props.theme.togglerButton.border};
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
  states: [],
  stages: [],
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
  const [selectedArea, setSelectedArea] = useState<MapVariables.IDType>(
    MapVariables.INDIA
  );
  const [mapMode, setMapMode] = useState<MapVariables.IDType>(
    MapVariables.INDIA
  );

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
  const [fetchTableData, tableState, tableLoading] = useQuery(
    "/data/statistics/country/5f02e38c6f3de87babe20cd2/2021-01-01/2021-12-01"
  );
  const [fetchFilterList, filterState, filterLoading] = useMutate(
    "/startup/filter/v2/defaults",
    INITIAL_FILTER_STATE2
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

  const [getCounts, countState, countLoading] = useQuery(
    HomePageApi.countBlockEndPoint
  );
  const [fetchDateRange, dateRangeState, dateRangeLoading] = useQuery(
    "/static/searchDateRanges"
  );

  const countWrrapper = (data: any[]) => {
    console.error("FInd Index Data", data);
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

  const countResource = {
    getCounts: fetchDefaultFilterValues,
    countState: countWrrapper(filterState.counts),
    countLoading,
    setSelectedArea,
    tableState,
    selectedStateByMap,
    setSelectedStateByMap,
    setPrimaryColorTheme,
    colorTheme: primaryColorTheme,
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
    fetchDateRange, dateRangeState,dateRangeLoading
  };

  const FilterProps = {
    appliedFilters,
    setAppliedFilters,
    selectedArea,
    setSelectedArea,
    colorTheme: primaryColorTheme,
    fetchFilterList: fetchDefaultFilterValues,
    filterState,
    filterLoading,
  };

  const [startupListActive, setStartupListActive] = useState(true);
  const toggleStartUp = () => setStartupListActive((prevState) => !prevState);
  return (
    <>
      <div
        className={`border-bottom home-component-styles mx-0 px-0 ${primaryColorTheme}`}
        style={{ marginTop: NAVBAR_HEIGHT }}
      >
        <PageWrapperContainer>
          <PageWrapper>
            <FilterButton
              colorTheme={primaryColorTheme}
              onClick={() => setMobileFilterVisible(true)}
              bottom={"30px"}
              fontSize={"30px"}
            >
              <BiFilter />
            </FilterButton>
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
                ></LeftNavComponent>
              </div>
              <div className="col-content-section p-0">
                <div className="col-12 col-md px-0 mx-0 w-100">
                  <div className="row px-0 mx-0">
                    <CountsBlockComponent
                      countResource={countResource}
                      selectedArea={selectedArea}
                      applyRoles={applyRoles}
                      setStateViewMap={setStateViewMode}
                    />
                  </div>
                  <div className="d-block d-sm-none">
                  <SearchBar
                    filterState={filterState}
                    searchBarExpanded={false}
                  />
                  </div>
                  <div className="col-12 row px-0 mx-0">
                    <div
                      className="col-12  p-4 pb-0 pe-0 col-map"
                    >
                      {!stateViewMode && (
                        <MapComponent
                          scaleBarVisible={true}
                          mapViewResource={mapViewResources}
                        />
                      )}
                      {stateViewMode && (
                        <StateView selectedArea={appliedFilters.states[0]} />
                      )}
                    </div>
                    <div
                      className="col-12 col-view-changer"
                    >
                      <ViewChangerComponent
                        mapViewResources={mapViewResources}
                        setStartUpPolicyChart={setStartUpPolicyChart}
                        fetchPolicy={fetchPolicy}
                        setStateViewMode={setStateViewMode}
                        stateViewMode={stateViewMode} 
                      />
                    </div>

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
