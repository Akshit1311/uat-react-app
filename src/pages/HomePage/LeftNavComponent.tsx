import { useState } from "react";
import DropDownListComponent from "./DropDownListComponent";
import "../../scss/HomePageStyles/leftNavComponent.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { Button } from "../../styles-components/Button";
import { RoundedBadge } from "../../styles-components/Badge";
import HomePageApi from "../../config/homepageApis.json";
import { useQuery } from "../../hooks/useQuery";
import { MapVariablesArray as IndiaStates } from "./Map/variables";

const INITIAL_SELECTED_STATE = {
  id: "none",
  name: "none",
};

const INITIAL_SELECTED_SECTOR = {
  sector: "",
  industryCount: 0,
  sectorCount: 0,
  totalCount: 0,
};

const LeftNavComponent = (props: any) => {
  const { mapMode, setMapMode } = props;

  const [selectedState, setSelectedState] = useState<any>(INITIAL_SELECTED_STATE);
  const [selectedSector, setSelectedSector] = useState<any>(INITIAL_SELECTED_SECTOR);

  const [fetchSectors, sectorState, sectorLoading] = useQuery("");

  const handleStateClick = (state: any) => {
    if (selectedState.id === state.id) {
      setMapMode({ id: 'india', name: "India" })
      return setSelectedState(INITIAL_SELECTED_STATE);
    }
    setSelectedState(state);
    setMapMode({ id: state.id, name: state.name })
    fetchSectors(HomePageApi.sectorByState + "/" + state.name.toLowerCase());
  };

  const handleSectorClick = (sectorObj: any) => {
    if (selectedSector.sector === sectorObj.sector) {
      return setSelectedSector(INITIAL_SELECTED_SECTOR);
    }
    setSelectedSector(sectorObj);
  };

  return (
    <>
      <div className="left-side-nav-styles">
        <div className="px-2">
          <div className="row search-bar-row">
            <div className="rounded h-100 d-flex mx-0 px-0 search-bar">
              <span
                className="btn shadow-none border-0 m-0 pe-1 ps-4 "
                id="search-addon"
              >
                <BiSearchAlt2 size={17.06} />
              </span>
              <input
                type="search"
                className="form-control ps-2 search-bar-left"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
            </div>
          </div>
          <div className="row mb-3 ps-2 pe-0 py-0 bg-white dropdown-card">
            <div className="border-bottom-filter pt-2">
              <button
                className="btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse1"
                aria-expanded="false"
                aria-controls="collapse1"
              >
                <FiChevronDown className="me-2" size={15} />
                States
                {selectedState.id !== 'none' && <RoundedBadge className="ms-auto me-3">1</RoundedBadge>}
                {selectedState.id !== 'none' && <span className="count-text">{IndiaStates.length}</span>}
                {selectedState.id === 'none' && <span className="count-text ms-auto">{IndiaStates.length}</span>}
              </button>
              <div className="collapse mt-2" id="collapse1">
                <DropDownListComponent
                  accessor={"name"}
                  data={IndiaStates}
                  handleClick={handleStateClick}
                  selectedItem={selectedState.name}
                />
              </div>
            </div>
            <div className="border-bottom-filter pt-1">
              <button
                className="btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
              >
                <FiChevronDown className="me-2" size={15} />
                Sector
                {selectedState.id !== 'none' && selectedSector.sector !== '' && <RoundedBadge className="ms-auto me-3">1</RoundedBadge>}
                {selectedState.id !== 'none' && selectedSector.sector !== '' && <span className="count-text">{sectorState.length}</span>}
                {selectedState.id !== 'none' && selectedSector.sector === '' && <span className="count-text ms-auto">{sectorState.length}</span>}
              </button>
              <div className="collapse mt-2" id="collapse2">
                {selectedState.id !== 'none' && selectedSector.sector !== '' &&
                  < DropDownListComponent
                    accessor={"sector"}
                    data={sectorState}
                    selectedItem={selectedSector.sector}
                    handleClick={handleSectorClick}
                  />}
              </div>
            </div>
            <div className="border-bottom-filter pt-1">
              <button
                className="btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse3"
                aria-expanded="false"
                aria-controls="collapse3"
              >
                <FiChevronDown className="me-2" size={15} />
                Industry
                <span className="ms-auto count-text">200</span>
              </button>
              <div className="collapse mt-2" id="collapse3">
                <div className="card card-body">
                  Some placeholder content for the collapse component. This
                  panel is hidden by default but revealed when the user
                  activates the relevant trigger.
                </div>
              </div>
            </div>
            <div className="border-bottom-filter pt-1">
              <button
                className="btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse4"
                aria-expanded="false"
                aria-controls="collapse4"
              >
                <FiChevronDown className="me-2" size={15} />
                Stage
                <span className="ms-auto count-text">150</span>
              </button>
              <div className="collapse mt-2" id="collapse4">
                <div className="card card-body">
                  Some placeholder content for the collapse component. This
                  panel is hidden by default but revealed when the user
                  activates the relevant trigger.
                </div>
              </div>
            </div>
            <div className="border-bottom-filter-last-element pt-1 pb-2">
              <button
                className="btn shadow-none d-flex w-100 mx-0 px-0 align-items-center"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse4"
                aria-expanded="false"
                aria-controls="collapse4"
              >
                <FiChevronDown className="me-2" size={15} />
                Winner Badges
                <span className="ms-auto count-text">2</span>
              </button>
              <div className="collapse mt-2" id="collapse4">
                <div className="card card-body">
                  Some placeholder content for the collapse component. This
                  panel is hidden by default but revealed when the user
                  activates the relevant trigger.
                </div>
              </div>
            </div>
          </div>
          <div className="left-nav-bottom-card row bg-white pt-3 ">
            <h6 className="px-0 card-heading-left-bottom">
              {" "}
              VIEW STARTUP ECOSYSTEM INSIGHTS OF {mapMode.name.toUpperCase()}
            </h6>
            <span className="sub-heading px-0 mb-2 font-500">
              You can View Insights of India
            </span>
            <div className="btn-view-project d-flex align-items-center ">
              <Button width={"225px"}>View Insights</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftNavComponent;
