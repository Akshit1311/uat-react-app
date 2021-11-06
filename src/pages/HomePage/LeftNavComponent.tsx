import '../../scss/HomePageStyles/leftNavComponent.scss';
import { GoSearch } from 'react-icons/go';
import { RiArrowDropDownLine } from 'react-icons/ri';

const LeftNavComponent = () => {
    return (
        <>
            <div className="container-fluid px-2" >
                <div className="row mt-2">
                    <div className="rounded h-100 d-flex mx-0 px-0 search-bar">
                        <span className="input-group-text border-0 m-0 " id="search-addon">
                            <GoSearch />
                        </span>
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" />
                    </div>
                </div>
                <div className="row my-3 px-2 py-0 bg-white">
                    <div className="border-bottom-filter">
                        <button className="btn d-flex w-100 mx-0 px-0 align-items-center" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                            <RiArrowDropDownLine className="me-2" size={32} />States
                            <span className="ms-auto">27</span>
                        </button>
                        <div className="collapse mt-2" id="collapse1">
                            <div className="card card-body">
                                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom-filter ">
                        <button className="btn d-flex w-100 mx-0 px-0 align-items-center" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                            <RiArrowDropDownLine className="me-2" size={32} />
                            Sector
                            <span className="ms-auto">50</span>
                        </button>
                        <div className="collapse mt-2" id="collapse2">
                            <div className="card card-body">
                                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom-filter">
                        <button className="btn d-flex w-100 mx-0 px-0 align-items-center" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                            <RiArrowDropDownLine className="me-2" size={32} />
                            Industry
                            <span className="ms-auto">200</span>
                        </button>
                        <div className="collapse mt-2" id="collapse3">
                            <div className="card card-body">
                                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom-filter">
                        <button className="btn d-flex w-100 mx-0 px-0 align-items-center" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                            <RiArrowDropDownLine className="me-2" size={32} />
                            Stage
                            <span className="ms-auto">150</span>
                        </button>
                        <div className="collapse mt-2" id="collapse4">
                            <div className="card card-body">
                                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom-filter">
                        <button className="btn d-flex w-100 mx-0 px-0 align-items-center" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                            <RiArrowDropDownLine className="me-2" size={32} />
                            Winner Badges
                            <span className="ms-auto">2</span>
                        </button>
                        <div className="collapse mt-2" id="collapse5">
                            <div className="card card-body">
                                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="left-nav-bottom-card row bg-white mt-4 pt-3 mx-0 pb-3 px-3">
                <h6 className="px-1 card-heading-left-bottom"> VIEW STARTUP ECOSYSTEM INSIGHTS OF INDIA</h6>
                <span className="text-center sub-heading px-0 mt-2">You can View Insights of India</span>
                <button className="btn btn-primary mt-2 view-insight-btn">View Insights</button>
            </div>
        </>
    )
}

export default LeftNavComponent
