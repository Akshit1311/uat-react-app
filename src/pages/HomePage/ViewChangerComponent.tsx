import { Input } from "reactstrap";
import { IoMapSharp } from "react-icons/io5";
import { RiDropFill } from "react-icons/ri";
import { MdOutlineLocationCity } from "react-icons/md";
import { GiPeru } from "react-icons/gi";
import "../../scss/HomePageStyles/viewChangerComponent.scss";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import * as MapVariables from "./Map/variables";
import { IDType } from "./Map/variables";
import moment from "moment";
import HomeApis from "../../config/homepageApis.json";

interface ViewChangerComponentsTypes {
  mapViewResources: any;
}

const VIEW_MORE = "View more about ";
const VIEW_STATE_STARTUP_POLICY = "View State Startup Policy";

function ViewChangerComponent({
  mapViewResources,
}: ViewChangerComponentsTypes) {
  const {
    isCircleActive,
    mapMode,
    setIsCircleActive,
    setMapMode,
    setSelectedArea,
    selectedArea,
    getCounts,
  } = mapViewResources;
  const stateText = (
    <div className=" px-3" style={{ paddingTop: "2px" }}>
      <span>State</span>
    </div>
  );
  const districtText = (
    <div className=" px-3" style={{ paddingTop: "2px" }}>
      <span>District</span>
    </div>
  );
  const cityText = (
    <div className=" px-3" style={{ paddingTop: "2px" }}>
      <span>City</span>
    </div>
  );

  const defaultView = () => setMapMode(MapVariables.INDIA);

  const circleView = () => {
    setIsCircleActive((prevState: boolean) => !prevState);
  };

  const districtView = () => setMapMode(MapVariables.DISTRICT);
  const cityView = () => setMapMode(MapVariables.CITY);

  const dateRangeChange = async (changeEvent: any) => {
    const value = changeEvent.target.value;
    if (value === "none") {
      return getCounts();
    }
    const today = new Date();
    const beginDate = await moment(today).format("YYYY-MM-DD");
    const endDate = await moment(today)
      .subtract({ months: value })
      .format("YYYY-MM-DD");

    getCounts(HomeApis.countDateRange + beginDate + "/" + endDate);
  };
  return (
    <div className="view-changer-component-styles">
      <div className="">
        <div className="mx-1 col-12 d-flex justify-content-between">
          <p className="data-range-text m-0 p-0">Date Range</p>
          <Input
            id="dataRangeSelectBox"
            name="select"
            type="select"
            className="Input-Select-Box shadow-none"
            onChange={dateRangeChange}
            style={{ border: "2px solid #0177FA" }}
          >
            <option value="none">All </option>
            <option value="3"> Last 3 Months </option>
            <option value="6"> Last 6 Months </option>
            <option value="9"> Last 9 Months </option>
          </Input>
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
        <div className="mx-1 col-12 mt-4">
          <div className="d-flex justify-content-between">
            <div>
              <Tooltip
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={stateText}
              >
                <button
                  onClick={defaultView}
                  className={`${
                    mapMode.id === MapVariables.INDIA.id
                      ? "bg-primary text-white"
                      : "bg-white text-dark"
                  } shadow-none btn btn-outline btn-icon-handler shadow-small`}
                >
                  <IoMapSharp
                    size={18}
                    style={{ marginTop: "-5px", marginLeft: "-1px" }}
                  />
                </button>
              </Tooltip>
              <Tooltip
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={cityText}
              >
                <button
                  onClick={cityView}
                  className={`${
                    mapMode.id === MapVariables.CITY.id
                      ? "bg-primary text-white"
                      : "bg-white text-dark"
                  } shadow-none btn btn-icon-handler border-primary shadow-small`}
                >
                  <MdOutlineLocationCity
                    style={{ marginTop: "-5px", marginLeft: "1px" }}
                    size={18}
                  />
                </button>
              </Tooltip>
              <Tooltip
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={districtText}
              >
                <button
                  onClick={districtView}
                  className={`${
                    mapMode.id === MapVariables.DISTRICT.id
                      ? "bg-primary text-white"
                      : "bg-white text-dark"
                  }
                    shadow-none btn btn-icon-handler border-primary shadow-small`}
                >
                  <GiPeru
                    style={{ marginTop: "-6px", marginLeft: "-1px" }}
                    size={18}
                  />
                </button>
              </Tooltip>
            </div>
            <div>
              <button
                onClick={circleView}
                className={`${
                  isCircleActive
                    ? "bg-primary text-white"
                    : "bg-white text-dark"
                }  shadow-none btn btn-icon-handler border-primary shadow-small`}
              >
                <RiDropFill
                  size={18}
                  style={{ marginTop: "-5px", marginLeft: "1px" }}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="mx-1 col-12 mt-4 pt-0">
          <div className="select-type-card">
            <h5 className="mb-3">{selectedArea.name.toUpperCase()} STARTUPS</h5>
            <div>
              <label className="select-type-text">Select Type</label>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                className="Input-Select-Box2 shadow-none"
              >
                <option>All Startups </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
              </Input>
            </div>
            <div className="card d-flex flex-row align-items-center px-3 py-3 my-0">
              <h3 className="p-0 m-0">10254</h3>
              <span className="selected-startups">All Startups</span>
            </div>
            {selectedArea.id !== "india" && (
              <>
                <button
                  className="btn btn-radius search-btn w-100 mt-4"
                  style={{
                    fontFamily: "Montserrat",
                    paddingTop: "7px",
                    fontWeight: 600,
                    fontSize: "14px",
                    border: "2px solid #0177FA",
                    marginBottom: "20px",
                    boxShadow: "0px 0px 10px rgba(1, 119, 250, 0.19)",
                  }}
                >
                  {VIEW_STATE_STARTUP_POLICY}
                </button>
                <button
                  onClick={() => setMapMode(selectedArea)}
                  className="btn btn-primary btn-radius search-btn w-100"
                  style={{
                    fontFamily: "Montserrat",
                    paddingTop: "7px",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {VIEW_MORE + selectedArea.name}
                </button>
              </>
            )}
          </div>
        </div>
        {/* <div
          className="mx-1 col-12"
          style={{ background: "red", height: "50px" }}
        ></div> */}
        {/* <div className="row select-type-card">
          <h5>INDIAN STARTUPS</h5>
          <div>
            <label className="select-type-text">Select Type</label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              className="Input-Select-Box2 shadow-none"
            >
              <option>All Startups </option>
              <option> 2 </option>
              <option> 3 </option>
              <option> 4 </option>
              <option> 5 </option>
            </Input>
          </div>
          <div className="">
            <div className="card d-flex flex-row align-items-center">
              <h3>10254</h3>
              <span className="selected-startups">All Startups</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ViewChangerComponent;
