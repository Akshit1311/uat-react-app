import { useState } from "react";
import CountsBlockComponent from "./CountsBlockComponent";
import LeftNavComponent from "./LeftNavComponent";
import DataTable from "./TableComponent"
import MapComponent from "./Map/MapComponent";
import StartupsListComponent from "./StartupsListComponent";
import ViewChangerComponent from "./ViewChangerComponent";
import "../../scss/HomePageStyles/homePage.scss";
import { STARTUPLIST } from "../../shared-data/startuplist";
import { DATATABLEDATA } from "../../shared-data/dataTable";
import styled from "styled-components";
import * as MapVariables from "./Map/variables";
import { Button } from "../../styles-components/Button";

const PageWrapperContainer = styled.div({
  display: "flex",
  justifyContent: "center",
});

const PageWrapper = styled.div({
  maxWidth: "1366px",
  minWidth: "1080px",
});

const HomePage = () => {
  const [selectedArea, setSelectedArea] = useState<MapVariables.IDType>(MapVariables.INDIA)
  const [mapMode, setMapMode] = useState<MapVariables.IDType>(MapVariables.INDIA)

  const [startupListActive, setStartupListActive] = useState(true);
  const [startupsListData] = useState(STARTUPLIST);
  const [dataTableData] = useState(DATATABLEDATA);

  const toggleStartUp = () => setStartupListActive((prevState) => !prevState);
  return (
    <>
      <div className="bg-wrapper border-bottom home-component-styles mx-0 px-0">
        <PageWrapperContainer>
          <PageWrapper>
            <div className="row px-0 mx-0">
              <div
                className="col-12  px-0 p-0"
                style={{ flex: "0 0 auto", width: "18.666667%" }}
              >
                <LeftNavComponent setMapMode={setMapMode} mapMode={mapMode} ></LeftNavComponent>
              </div>
              <div className="col-12 col-md px-0 mx-0">
                <div className="row px-0 mx-0">
                  <CountsBlockComponent selectedArea={selectedArea} />
                </div>
                <div className="col-12 row px-0 mx-0">
                  <div
                    className="col-12  p-5"
                    style={{ flex: "0 0 auto", width: "61%" }}
                  >
                    <MapComponent setSelectedArea={setSelectedArea} mapMode={mapMode} selectedArea={selectedArea} />
                  </div>
                  <div className="col-12 " style={{
                    flex: "0 0 auto", width: "39%"
                  }}>
                    <ViewChangerComponent selectedArea={selectedArea} mapMode={mapMode} setMapMode={setMapMode} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-center mx-0 strip align-items-center d-flex">
              <span className="m-0 strip-text">
                <b className="me-3 strip-bold-text">Please Note :</b>
                The information is based on self declaration by community
                members. Startup India dosen't moderate the information
                collected.
              </span>
            </div>
            <div className="row d-flex justify-content-center px-0 mx-0">
              <div className="btn-group text-center col-md-3 border button-togglers">
                <Button
                  backgroundColor={`${!startupListActive && "white"}`}
                  color={`${!startupListActive && "black"}`}
                  border={`${!startupListActive && "0px"}`}
                  // fontWeight={"500px"}
                  className={`font-500 font-family-Mont shadow-none  px-3 ${startupListActive && "btn-primary text-white"
                    }`}
                  onClick={toggleStartUp}
                >
                  Startups List
                </Button>
                <Button
                  backgroundColor={`${startupListActive && "white"}`}
                  color={`${startupListActive && "black"}`}
                  border={`${startupListActive && "0px"}`}
                  // fontWeight={"500px"}
                  className={`font-500 font-family-Mont shadow-none  px-3 ${!startupListActive && "btn-primary text-white"
                    }`}
                  onClick={toggleStartUp}
                >
                  Data Table
                </Button>
              </div>
              <div className="row mx-0 px-0">
                {startupListActive && (
                  <StartupsListComponent data={startupsListData} />
                )}
                {!startupListActive && (
                  <DataTable data={dataTableData} />
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
