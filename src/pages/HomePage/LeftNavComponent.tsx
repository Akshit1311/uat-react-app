import "../../scss/HomePageStyles/leftNavComponent.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";

const LeftNavComponent = () => {
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
                className="form-control ps-2"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
            </div>
          </div>
          <div className="row mb-3 px-2 py-0 bg-white dropdown-card">
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
                <span className="ms-auto count-text">27</span>
              </button>
              <div className="collapse mt-2" id="collapse1">
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
                data-bs-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
              >
                <FiChevronDown className="me-2" size={15} />
                Sector
                <span className="ms-auto count-text">50</span>
              </button>
              <div className="collapse mt-2" id="collapse2">
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
            <span className="sub-heading px-0 my-2 font-600">
              You can View Insights of India
            </span>
            <button className="btn shadow-none btn-primary mt-2 btn-view-project">
              View Insights
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftNavComponent;
 