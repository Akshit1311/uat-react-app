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

const ButtonGroup = styled.div`
  border: ${(props) => props.theme.togglerButton.border};
`;

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
  roles: ["Startup"],
};



const HomePage = (props: HomePageTypes) => {
  const [selectedArea, setSelectedArea] = useState<MapVariables.IDType>(
    MapVariables.INDIA
  );
  const [mapMode, setMapMode] = useState<MapVariables.IDType>(
    MapVariables.INDIA
  );
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
  console.log("Selected State",selectedStateByMap)
  const [fetchPolicy, policyState, policyLoading] = useQuery("");
  const [selectedCountBlock, setSelectedCountBlock] = useState("Startup");

  const applyRoles = (role: string, name: string) => {
    setSelectedCountBlock(name);
    setAppliedFilters((prevState: any) => ({ ...prevState, roles: [role] }));
  };

  const theme = useContext(ThemeContext);

  const [getCounts, countState, countLoading] = useQuery(
    HomePageApi.countBlockEndPoint
  );

  const countResource = {
    getCounts,
    countState,
    countLoading,
    setSelectedArea,
    tableState,
    selectedStateByMap, setSelectedStateByMap
  };

  const mapViewResources = {
    isCircleActive,
    mapMode,
    setIsCircleActive,
    setMapMode,
    setSelectedArea,
    selectedArea,
    getCounts,
    countState,
    setSelectedStateByMap,
  };

  const [startupListActive, setStartupListActive] = useState(true);
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
                style={{
                  flex: "0 0 18%",
                  width: "18.666667%",
                  minWidth: "18.675%",
                }}
              >
                <LeftNavComponent
                  appliedFilters={appliedFilters}
                  setAppliedFilters={setAppliedFilters}
                  selectedArea={selectedArea}
                  setSelectedArea={setSelectedArea}
                ></LeftNavComponent>
              </div>
              <div style={{ flex: "62%" }} className="p-0">
                <div className="col-12 col-md px-0 mx-0 w-100">
                  <div className="row px-0 mx-0">
                    <CountsBlockComponent
                      countResource={countResource}
                      selectedArea={selectedArea}
                      applyRoles={applyRoles}
                    />
                  </div>
                  <div className="col-12 row px-0 mx-0">
                    <div
                      className="col-12  p-4 pe-0"
                      style={{ flex: "0 0 auto", width: "61%" }}
                    >
                      {startUpPolicyChart && (
                        <StatePolicy
                          stateId={
                            appliedFilters.states[0]
                              ? appliedFilters.states[0]
                              : ""
                          }
                        />
                      )}
                      {!startUpPolicyChart && (
                        <MapComponent mapViewResource={mapViewResources} />
                      )}
                    </div>
                    <div
                      className="col-12 "
                      style={{
                        flex: "0 0 auto",
                        width: "39%",
                      }}
                    >
                      <ViewChangerComponent
                        mapViewResources={mapViewResources}
                        setStartUpPolicyChart={setStartUpPolicyChart}
                        fetchPolicy={fetchPolicy}
                      />
                    </div>
                  </div>
                </div>
                <Strip className="row mx-0 strip  align-items-center d-flex">
                  <span className="m-0 strip-text">
                    <b
                      className="me-3 strip-bold-text"
                      style={{ marginLeft: "1.5%" }}
                    >
                      Please Note :
                    </b>
                    The information is based on self declaration by community
                    members. Startup India dosen't moderate the information
                    collected.
                  </span>
                </Strip>
                <div className="row d-flex justify-content-center px-0 mx-0">
                  <ButtonGroup className="btn-group text-center col-md-3 button-togglers">
                    <Button
                      backgroundColor={`${
                        !startupListActive &&
                        theme.togglerButton.backgroundInactive
                      }`}
                      color={`${
                        !startupListActive && theme.togglerButton.color
                      }`}
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
                        startupListActive &&
                        theme.togglerButton.backgroundInactive
                      }`}
                      color={`${
                        startupListActive && theme.togglerButton.color
                      }`}
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
                      <div
                        style={{
                          display: startupListActive ? "block" : "none",
                        }}
                      >
                        <StartupsListComponent
                          appliedFilters={appliedFilters}
                          selectedCountBlock={selectedCountBlock}
                        />
                      </div>
                    )}
                    {
                      <>
                        <div
                          style={{
                            display: !startupListActive ? "block" : "none",
                          }}
                        >
                          <DataTable fetch={fetchTableData} state={tableState} loading={tableLoading} />
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
