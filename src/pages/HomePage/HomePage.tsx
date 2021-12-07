import React, { useState, useContext, useEffect } from "react";
import CountsBlockComponent from "./CountsBlockComponent";
import LeftNavComponent from "./LeftNav/LeftNavComponent";
import DataTable from "./TableComponent";
import MapComponent from "./Map/MapComponent";
import StartupsListComponent from "./StartupsListComponent";
import ViewChangerComponent from "./ViewChangerComponent";
import "../../scss/HomePageStyles/homePage.scss";
import { STARTUPLIST } from "../../shared-data/startuplist";
import { DATATABLEDATA } from "../../shared-data/dataTable";
import styled from "styled-components";
import * as MapVariables from "./Map/variables";
import { Button } from "../../styles-components/Button";
import { useQuery } from "../../hooks/useQuery";
import HomePageApi from "../../config/homepageApis.json";
import { NAVBAR_HEIGHT } from "../../config/context";
import { ThemeContext } from "../../config/context";
import Table2 from "./Table2";

import { useMutate } from "../../hooks/useMutate";

const PageWrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: none !important;
  background: linear-gradient(
    180deg,
    ${(props) => props.theme.bgColorStart} 0%,
    ${(props) => props.theme.bgColorEnd} 100%
  ) !important;
  background-size: cover;
  background-repeat: no-repeat !important;
`;
const ButtonGroup = styled.div`
  border: ${(props) => props.theme.togglerButton.border};
`;

const PageWrapper = styled.div({
  maxWidth: "1366px",
  minWidth: "1080px",
});

const Strip = styled.div`
  background-color: ${(props) => props.theme.bgStripe};
  color: ${(props) => props.theme.color};
  box-shadow: ${(props) => props.theme.shadowStripe};
`;

interface HomePageTypes {
  navHeight: string;
}

const INITIAL_FILTER_STATE = {
  industries: [],
  sectors: [],
  states: [],
  stages: [],
  badges: [],
};

const HomePage = (props: HomePageTypes) => {
  const [selectedArea, setSelectedArea] = useState<MapVariables.IDType>(
    MapVariables.INDIA
  );
  const [mapMode, setMapMode] = useState<MapVariables.IDType>(
    MapVariables.INDIA
  );
  const [appliedFilters, setAppliedFilters] = useState<any>(
    INITIAL_FILTER_STATE
  );

  const [isCircleActive, setIsCircleActive] = useState<boolean>(false);

  const theme = useContext(ThemeContext);

  const [getCounts, countState, countLoading] = useQuery(
    HomePageApi.countBlockEndPoint
  );

  // const tagsResources = {
  //   INITIAL_FILTER_STATE,
  //   fetchFilterList,
  //   filterState,
  //   filterLoading,
  //   fetchTags,
  //   tagsState,
  //   tagsLoading,
  // };

  const countResource = {
    getCounts,
    countState,
    countLoading,
  };

  const mapViewResources = {
    isCircleActive,
    mapMode,
    setIsCircleActive,
    setMapMode,
    setSelectedArea,
    selectedArea,
    getCounts,
  };

  const [startupListActive, setStartupListActive] = useState(true);
  const [startupsListData] = useState(STARTUPLIST);
  const [dataTableData] = useState(DATATABLEDATA);

  const toggleStartUp = () => setStartupListActive((prevState) => !prevState);
  return (
    <>
      <div
        className="border-bottom home-component-styles mx-0 px-0"
        style={{ marginTop: NAVBAR_HEIGHT }}
      >
        <PageWrapperContainer>
          <PageWrapper>
            <div className="row px-0 mx-0">
              <div
                className="col-12  px-0 p-0"
                style={{ flex: "0 0 auto", width: "18.666667%" }}
              >
                <LeftNavComponent appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters}
                  selectedArea={selectedArea}
                  setSelectedArea={setSelectedArea}
                ></LeftNavComponent>
              </div>
              <div className="col-12 col-md px-0 mx-0">
                <div className="row px-0 mx-0">
                  <CountsBlockComponent
                    countResource={countResource}
                    selectedArea={selectedArea}
                  />
                </div>
                <div className="col-12 row px-0 mx-0">
                  <div
                    className="col-12  p-4 pe-0"
                    style={{ flex: "0 0 auto", width: "61%" }}
                  >
                    <MapComponent mapViewResource={mapViewResources} />
                  </div>
                  <div
                    className="col-12 "
                    style={{
                      flex: "0 0 auto",
                      width: "39%",
                    }}
                  >
                    <ViewChangerComponent mapViewResources={mapViewResources} />
                  </div>
                </div>
              </div>
            </div>
            <Strip className="row text-center mx-0 strip  align-items-center d-flex">
              <span className="m-0 strip-text">
                <b className="me-3 strip-bold-text">Please Note :</b>
                The information is based on self declaration by community
                members. Startup India dosen't moderate the information
                collected.
              </span>
            </Strip>
            <div className="row d-flex justify-content-center px-0 mx-0">
              <ButtonGroup className="btn-group text-center col-md-3 button-togglers">
                <Button
                  backgroundColor={`${
                    !startupListActive && theme.togglerButton.backgroundInactive
                  }`}
                  color={`${!startupListActive && theme.togglerButton.color}`}
                  border={`${!startupListActive && "0px"}`}
                  className={`font-500 font-family-Mont shadow-none  px-3 ${
                    startupListActive && "btn-primary text-white"
                  }`}
                  onClick={toggleStartUp}
                >
                  Startups List
                </Button>
                <Button
                  backgroundColor={`${
                    startupListActive && theme.togglerButton.backgroundInactive
                  }`}
                  color={`${startupListActive && theme.togglerButton.color}`}
                  border={`${startupListActive && "0px"}`}
                  className={`font-500 font-family-Mont shadow-none  px-3 ${
                    !startupListActive && "btn-primary text-white"
                  }`}
                  onClick={toggleStartUp}
                >
                  Data Table
                </Button>
              </ButtonGroup>
              <div className="row mx-0 px-0">
                {startupListActive && (
                  <StartupsListComponent appliedFilters={appliedFilters}  />
                )}
                {!startupListActive && (
                  <>
                    <DataTable data={dataTableData} />
                    {/* <Table2 data={dataTableData} /> */}
                  </>
                )}
              </div>
            </div>
          </PageWrapper>
        </PageWrapperContainer>
      </div>
    </>
  );
};

export default HomePage;
