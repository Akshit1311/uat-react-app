import "../../scss/HomePageStyles/leftNavComponent.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import DropDownListComponent from "./DropDownListComponent";
import { STATES, stateType } from "../../shared-data/states";
import { RoundedBadge } from "../../styles-components/Badge";
import { useEffect, useState } from 'react'
import { Button } from "../../styles-components/Button";
import { useQuery } from "../../hooks/useQuery";
import HomePageApi from "../../config/homepageApis.json";

const LeftNavComponent = (props: any) => {
  const [selectedState, setSelectedState] = useState<any[]>([]);
  const fetchSectors = useQuery("");
  const { mapMode, setMapMode } = props;
  const [SECTORS, setSector] = useState([])
  const handleSector = (sector: any) => {
    if (selectedState.length === 1 && selectedState[0].sector === sector.sector) {
      return setSelectedState([])
    }
    setSelectedState([sector])
  }
  const handleState = (state: any) => {
    if (selectedState.length === 1 && selectedState[0].state === state.state) {
      setMapMode({
        id: "india",
        name: "India",
      })
      return setSelectedState([])
    }
    setSelectedState([state])
    setMapMode({ id: state._id, name: state.state })
  }

  useEffect(() => {
    if (selectedState.length) {
      console.log('selectedState : ', selectedState)
      fetchSectors[0](HomePageApi.sectorByState + selectedState[0].state)
      setSector(fetchSectors[1])
      console.log("fetchSectors[1] : ", fetchSectors[1])
    }
  }, [selectedState]);

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
                {selectedState.length === 1 && <RoundedBadge className="ms-auto me-3">1</RoundedBadge>}
                {selectedState.length === 1 && <span className="count-text">{STATES.length}</span>}
                {selectedState.length === 0 && <span className="count-text ms-auto">{STATES.length}</span>}
              </button>
              <div className="collapse mt-2" id="collapse1">
                <DropDownListComponent
                  accessor={"state"}
                  data={STATES}
                  selectedState={selectedState}
                  setSelectedState={setSelectedState}
                  setMapMode={setMapMode}
                  handleClick={(clickedState: any) => {
                    console.log("clickedState : ", clickedState)
                    handleState(clickedState)
                  }}
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
                <span className="ms-auto count-text">{fetchSectors[1]}</span>
              </button>
              {SECTORS}
              {selectedState.length === 1 && !fetchSectors[2] && <DropDownListComponent
                accessor={"sector"}
                data={SECTORS}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                setMapMode={setMapMode}
                // (clickedSector: any) => handleSector(clickedSector)
                handleClick={(clickedSector: any) => console.log(clickedSector)}
              />}
              {/* <div className="collapse mt-2" id="collapse2">
                <div className="card card-body">
                  Some placeholder content for the collapse component. This
                  panel is hidden by default but revealed when the user
                  activates the relevant trigger.
                </div>
              </div> */}
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
              VIEW STARTUP ECOSYSTEM INSIGHTS OF INDIA
            </h6>
            <span className="sub-heading px-0 mb-2 font-500">
              You can View Insights of India
            </span>
            <div className="btn-view-project d-flex align-items-center ">
              <Button
                width={"225px"}
              >View Insights</Button>
            </div>
          </div>
          {/* <div className="left-nav-bottom-card row bg-white pt-3 ">
            <h6 className="px-0 card-heading-left-bottom">
              {" "}
              DOWNLOAD
            </h6>
            <span className="sub-heading px-0 mb-2 font-500">
              You can download data & the map of current screen
            </span>
            <div className="btn-view-project d-flex align-items-center ">
              <Button
                width={"225px"}
              >Download</Button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LeftNavComponent;
