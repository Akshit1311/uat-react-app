import React,{ useState, useEffect } from "react";
import DropDownListComponent from "./DropDownListComponent";
import "../../../scss/HomePageStyles/leftNavComponent.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { Button } from "../../../styles-components/Button";
import { RoundedBadge } from "../../../styles-components/Badge";
import HomePageApi from "../../../config/homepageApis.json";
import { useQuery } from "../../../hooks/useQuery";
import { MapVariablesArray as IndiaStates } from "../Map/variables";
import * as MapVariables from "../Map/variables";
import { Card } from "../../../styles-components/Cards"
import styled from "styled-components";

const INITIAL_SELECTED_STATE = {
  id: "none",
  name: "none",
};

const INITIAL_SELECTED_SECTOR = {
  sector: "none",
  industryCount: 0,
  sectorCount: 0,
  totalCount: 0,
};

const INITIAL_SELECTED_STAGES = {
  stateName: "none",
  ideation: 0,
  validation: 0,
  earlyTraction: 0,
  scaling: 0,
  total: 0,
};

const DropDown = styled.button`
color: ${props=> props.theme.colorCards} !important;
`
const SearchBarWrapper = styled.div`
color: ${props=> props.theme.colorCards} !important;
background: ${props=> props.theme.bgCards} !important;
box-shadow: ${props=> props.theme.shadowCards} !important;
`

const SearchBarInput = styled.input`
color: ${props=> props.theme.colorCards} !important;
background: ${props=> props.theme.bgCards} !important;
`

const SpanIcon = styled.span`
  color: ${props=> props.theme.color};
  margin-top: 1.4px !important;
`

const LeftNavComponent = (props: any) => {
  const { setSelectedArea, selectedArea } = props;

  const [selectedState, setSelectedState] = useState<any>(
    INITIAL_SELECTED_STATE
  );
  const [selectedSector, setSelectedSector] = useState<any>(
    INITIAL_SELECTED_SECTOR
  );
  const [selectedStages, setSelectedStages] = useState<any>(
    INITIAL_SELECTED_STAGES
  );
  const [appliedSector, setAppliedSector] = useState<any>({});
  const [appliedStages, setAppliedStages] = useState<any>({name: ""});

  const [fetchSectors, sectorState, sectorLoading] = useQuery("");
  const [fetchStages, stagesState, stagesLoading] = useQuery("");

  const [fetchStates, statesStates, statesLoading] = useQuery("https://13.235.79.165/startup/dpiit/states")

  const handleStateClick = (state: any) => {
    if (selectedState.id === state.id) {
      setSelectedArea({ id: "india", name: "India" });
      return setSelectedState(INITIAL_SELECTED_STATE);
    }
    setSelectedState(state);
  };

  const generateUrl = (a: string, b: string) => {
    return a + "/" + b.toLowerCase();
  };

  const onApplyState = () => {

    setSelectedArea(selectedState);
    fetchSectors(generateUrl(HomePageApi.sectorByState, selectedState.name));
    fetchStages(generateUrl(HomePageApi.stagesByState, selectedState.name));
  };

  const onApplySector = () => {
    setAppliedSector(selectedSector);
  };

  const onDismissClick = () => {};

  const handleSectorClick = (sectorObj: any) => {
    if (selectedSector.sector === sectorObj.sector) {
      return setSelectedSector(INITIAL_SELECTED_SECTOR);
    }
    setSelectedSector(sectorObj);
  };

  const handleStagesClick = (stage:any) =>{
    setSelectedStages(stage)
  }

  const onApplyStages = () =>{
    setAppliedStages(selectedStages)
  }

  const stateApplied = Boolean(selectedState.id === selectedArea.id);
  const sectorApplied = Boolean(selectedState.id === selectedArea.id);

  useEffect(()=>{
    fetchStates()
  },[])

  return (
    <>
      <div className="left-side-nav-styles">
        <div className="px-2">
          <div className="row search-bar-row">
            <SearchBarWrapper className="rounded h-100 d-flex mx-0 px-0 search-bar">
              <SpanIcon
                className="btn shadow-none border-0 m-0 pe-1 ps-4 "
                id="search-addon"
              >
                <BiSearchAlt2 size={17.06} />
              </SpanIcon>
              <SearchBarInput
                type="search"
                className="form-control ps-2 search-bar-left"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
            </SearchBarWrapper>
          </div>
          <Card className="row mb-3 ps-2 pe-0 py-0 bg-white accordion accordion-flush dropdown-card" id="flush1">
            <div className="border-bottom-filter pt-2">
              <DropDown
                className="btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse1"
                aria-expanded="false"
                aria-controls="collapse1"
              >
                <FiChevronDown className="me-2" size={15} />
                States
                {stateApplied && (
                  <RoundedBadge className="ms-auto me-3">1</RoundedBadge>
                )}
                {stateApplied && (
                  <span className="count-text">{IndiaStates.length}</span>
                )}
                {!stateApplied && (
                  <span className="count-text ms-auto">
                    {IndiaStates.length}
                  </span>
                )}
              </DropDown>
              <div className="collapse mt-2" id="collapse1" data-bs-parent="flush1">
                <DropDownListComponent
                  accessor={"name"}
                  data={IndiaStates}
                  loading={false}
                  handleClick={handleStateClick}
                  selectedItem={selectedState.name}
                  handleApplyClick={onApplyState}
                  dropDownId={"#collapse1"}
                  handleClearClick={() =>{
                    setSelectedState(INITIAL_SELECTED_STATE)
                    setSelectedArea(MapVariables.INDIA)
                  }
                  }
                />
              </div>
            </div>
            <div className="border-bottom-filter pt-1">
              <DropDown
                className="btn shadow-none collapsed d-flex w-100 mx-0 px-0 align-items-center mt-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
              >
                <FiChevronDown className="me-2" size={15} />
                Sector
                {selectedSector.sector === appliedSector.sector && (
                  <RoundedBadge className="ms-auto me-3">1</RoundedBadge>
                )}
                {selectedSector.sector === appliedSector.sector && (
                  <span className="count-text">{sectorState.length}</span>
                )}
                {!(selectedSector.sector === appliedSector.sector) && (
                  <span className="count-text ms-auto">
                    {sectorState.length}
                  </span>
                )}
              </DropDown>
              <div className="collapse mt-2" id="collapse2" data-bs-parent="flush1">
                <DropDownListComponent
                  accessor={"sector"}
                  data={sectorState}
                  loading={sectorLoading}
                  selectedItem={selectedSector.sector}
                  handleClick={handleSectorClick}
                  handleApplyClick={onApplySector}
                  dropDownId={"#collapse2"}
                  handleClearClick={() =>
                    setSelectedState(INITIAL_SELECTED_STATE)
                  }
                />
              </div>
            </div>
            <div className="border-bottom-filter pt-1">
              <DropDown
                className="btn shadow-none collapsed d-flex w-100 mx-0 px-0 align-items-center mt-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse3"
                aria-expanded="false"
                aria-controls="collapse3"
              >
                <FiChevronDown className="me-2" size={15} />
                Industry
                {/* {selectedStages.stateName === appliedSector.sector && (
                  <RoundedBadge className="ms-auto me-3">1</RoundedBadge>
                )}
                {selectedStages.stateName === appliedSector.sector && (
                  <span className="count-text">{sectorState.length}</span>
                )} */}
                {/* {!(selectedStages.stateName === appliedSector.sector) && ( */}
                  <span className="count-text ms-auto">
                    {0}
                  </span>
                {/* // )} */}
              </DropDown>
              <div className="collapse mt-2" id="collapse3" data-bs-parent="flush1">
                <DropDownListComponent
                  accessor={"sector"}
                  data={[]}
                  loading={sectorLoading}
                  selectedItem={selectedSector.sector}
                  handleClick={handleSectorClick}
                  handleApplyClick={onApplyStages}
                  dropDownId={"#collapse3"}
                  handleClearClick={() =>
                    setSelectedStages({name: ""})
                  }
                />
              </div>
            </div>
         
            <div className="border-bottom-filter pt-1">
              <DropDown
                className="btn shadow-none d-flex collapsed w-100 mx-0 px-0 align-items-center mt-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse4"
                aria-expanded="false"
                aria-controls="collapse4"
              >
                 <FiChevronDown className="me-2" size={15} />
                Stages
                {selectedStages.name === appliedStages.name && (
                  <RoundedBadge className="ms-auto me-3">1</RoundedBadge>
                )}
                {selectedStages.name === appliedStages.name && (
                  <span className="count-text">{4}</span>
                )}
                {!(selectedStages.name === appliedStages.name) && (
                  <span className="count-text ms-auto">
                    {4}
                  </span>
                )}
              </DropDown>
              <div className="collapse mt-2" id="collapse4">
                <DropDownListComponent
                  accessor={"name"}
                  data={[{ name: "Ideation", }, { name: "Scaling" }, { name: "Early Traction" } , { name: "Validation" }]}
                  loading={false}
                  selectedItem={selectedStages.name}
                  handleClick={handleStagesClick}
                  handleApplyClick={onApplySector}
                  dropDownId={"#collapse4"}
                  handleClearClick={() =>
                    setSelectedState(INITIAL_SELECTED_STATE)
                  }
                />
              </div>
            </div>
            <div className="border-bottom-filter-last-element pt-1 pb-2">
              <DropDown
                className="btn shadow-none d-flex w-100 collapsed mx-0 px-0 align-items-center"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse5"
                aria-expanded="false"
                aria-controls="collapse5"
              >
                <FiChevronDown className="me-2" size={15} />
                Winner Badges
                <span className="ms-auto count-text">2</span>
              </DropDown>
              <div className="collapse mt-2" id="collapse5">
                <div className="card card-body">
                  Some placeholder content for the collapse component. This
                  panel is hidden by default but revealed when the user
                  activates the relevant trigger.
                </div>
              </div>
            </div>
          </Card>
          <Card className="left-nav-bottom-card row pt-3 ">
            <h6 className="px-0 card-heading-left-bottom">
              {" "}
              VIEW STARTUP ECOSYSTEM INSIGHTS OF INDIA
            </h6>
            <span className="sub-heading px-0 mb-2 font-500">
              You can View Insights of India
            </span>
            <div className="btn-view-project mx-0 px-0">
              <Button>View Insights</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LeftNavComponent;
