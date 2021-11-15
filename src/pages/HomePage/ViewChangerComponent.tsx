import { Input } from "reactstrap";
import { IoMapSharp } from "react-icons/io5";
import { RiDropFill } from "react-icons/ri";
import { MdOutlineLocationCity } from "react-icons/md";
import { GiPeru } from "react-icons/gi";
import "../../scss/HomePageStyles/viewChangerComponent.scss";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";

function ViewChangerComponent() {
  const stateText = (
    <div className=" px-3">
      <span>State</span>
    </div>
  );
  const districtText = (
    <div className=" px-3">
      <span>District</span>
    </div>
  );
  const cityText = (
    <div className=" px-3">
      <span>City</span>
    </div>
  );
  return (
    <div className="view-changer-component-styles">
      <div className="">
        {/* <div className="col-12 col-md px-0 mx-0 w-100">
          <span className="data-range-text">Data Range</span>
          <Input
            id="dataRangeSelectBox"
            name="select"
            type="select"
            className="Input-Select-Box shadow-none"
            style={{ border: "2px solid #0177FA" }}
          >
            <option>Select </option>
            <option> 2 </option>
            <option> 3 </option>
            <option> 4 </option>
            <option> 5 </option>
          </Input>
        </div>
        <div></div>
        <div className="row icon-row">
          <div className="col-md-10 col-10">
            <Tooltip placement="top" overlay={stateText}>
              <button className="bg-primary shadow-none btn btn-outline btn-icon-handler text-white">
                <IoMapSharp size={18} />
              </button>
            </Tooltip>
            <Tooltip placement="top" overlay={cityText}>
              <button className="bg-white text-dark shadow-none btn btn-icon-handler border-primary">
                <MdOutlineLocationCity size={18} />
              </button>
            </Tooltip>
            <Tooltip placement="top" overlay={districtText}>
              <button className="bg-white text-dark shadow-none btn btn-icon-handler border-primary">
                <GiPeru size={19} />
              </button>
            </Tooltip>
          </div>
          <div className="col-md-2 col-2">
            <button className="bg-white text-dark shadow-none btn btn-icon-handler border-primary">
              <RiDropFill size={18} />
            </button>
          </div>
        </div> */}
        <div className="mx-1 col-12 d-flex">
          <p className="data-range-text w-50 m-0 p-0">Date Range</p>
          <Input
            id="dataRangeSelectBox"
            name="select"
            type="select"
            className="Input-Select-Box shadow-none"
            style={{ border: "2px solid #0177FA" }}
          >
            <option>Select </option>
            <option> Last 3 Months </option>
            <option> Last 6 Months </option>
            <option> Last 9 Months </option>
          </Input>
          <div />
        </div>
        <div className="mx-1 col-12 mt-4">
          <div className="d-flex justify-content-between">
            <div>
              <Tooltip
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={stateText}
              >
                <button className="bg-primary shadow-none btn btn-outline btn-icon-handler text-white">
                  <IoMapSharp size={18} style={{ marginTop: "-7px",  marginLeft: '-1px' }} />
                </button>
              </Tooltip>
              <Tooltip
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={cityText}
              >
                <button className="bg-white text-dark shadow-none btn btn-icon-handler border-primary">
                  <MdOutlineLocationCity
                    style={{ marginTop: "-7px", marginLeft: '-1px' }}
                    size={18}
                  />
                </button>
              </Tooltip>
              <Tooltip
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                placement="top"
                overlay={districtText}
              >
                <button className="bg-white text-dark shadow-none btn btn-icon-handler border-primary">
                  <GiPeru style={{ marginTop: "-7px",  marginLeft: '-1px' }} size={18} />
                </button>
              </Tooltip>
            </div>
            <div>
              <button className="bg-white text-dark shadow-none btn btn-icon-handler border-primary">
                <RiDropFill size={18} style={{ marginTop: "-7px", marginLeft: '-1px' }} />
              </button>
            </div>
          </div>
        </div>
        <div className="mx-1 col-12 mt-4 pt-0">
          <div className="select-type-card">
            <h5 className="mb-3">INDIAN STARTUPS</h5>
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
