import { useState } from 'react';
import CountsBlockComponent from './CountsBlockComponent'
import DataTableComponent from './DataTableComponent'
import LeftNavComponent from './LeftNavComponent'
import MapComponent from './Map/MapComponent'
import StartupsListComponent from './StartupsListComponent'
import ViewChangerComponent from './ViewChangerComponent'
import '../../scss/HomePageStyles/homePage.scss';
import { STARTUPLIST } from '../../shared-data/startuplist'
import { DATATABLEDATA } from '../../shared-data/dataTable'

const HomePage = () => {

    const [startupListActive, setStartupListActive] = useState(true);
    const [startupsListData] = useState(STARTUPLIST);
    const [dataTableData] = useState(DATATABLEDATA);

    const toggleStartUp = () => setStartupListActive(prevState => !prevState)
    return (
        <>
            <div className="container-fluid bg-light border-bottom home-component-styles mx-0 px-0">
                <div className="row px-0 mx-0">
                    <div className="col-12 col-md-2 px-0 p-0">
                        <LeftNavComponent></LeftNavComponent>
                    </div>
                    <div className="col-12 col-md px-0 mx-0">
                        <div className="row px-0 mx-0">
                            <CountsBlockComponent />
                        </div>
                        <div className="row px-0 mx-0">
                            <div className="col-12 col-md-7 p-5">
                                <MapComponent />
                            </div>
                            <div className="col-12 col-md-5">
                                <ViewChangerComponent />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-center mx-0 strip align-items-center d-flex" >
                    <span className="m-0 strip-text">
                        <b className="me-3 strip-bold-text">Please Note :</b>
                        The information is based on self declaration by community members. Startup India dosen't moderate the information collected.
                    </span>
                </div>
                <div className="row d-flex justify-content-center px-0 mx-0">
                    <div className="btn-group text-center col-md-3 border button-togglers">
                        <button className={`shadow-none btn btn-radius px-3 ${startupListActive && 'btn-primary text-white'}`}
                            onClick={toggleStartUp}> Startups List</button>
                        <button className={`shadow-none btn btn-radius-data-table px-3 ${!startupListActive && 'btn-primary text-white'}`}
                            onClick={toggleStartUp}> Data Table</button>
                    </div>
                    <div className="row mx-0 px-0">
                        {startupListActive && (<StartupsListComponent data={startupsListData} />)}
                        {!startupListActive && (<DataTableComponent data={dataTableData} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
