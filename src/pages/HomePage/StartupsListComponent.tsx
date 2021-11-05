import { FaMapMarkerAlt } from 'react-icons/fa';
import SearchBarComponent from '../../components/SearchBarComponent';
import { Badge } from '../../styles-components/Badge';
import '../../scss/HomePageStyles/startupsListComponent.scss';

function StartupsListComponent(props: any) {
    if (props.data.length !== 0) {
        const startupList = props.data.map((d: any) => {
            return (
                <>
                    <div key={d._id} className="col-12 col-md py-2 m-2 d-flex flex-row" style={{ backgroundColor: "#f1f1f1" }}>
                        <div>
                            <img src={d.img_url} className="rounded-circle border" alt="main-logo" width="60px" height="60px" />
                        </div>
                        <div className="p-2 ms-1 row">
                            <h6>{d.company}</h6>
                            <div className="my-2">
                                <Badge className="m-1">Stage: {d.stage}</Badge>
                                <Badge>Sector: {d.sector}</Badge>
                            </div>
                            <div>
                                <Badge className="m-1">Tax Exempted</Badge>
                            </div>
                            <div className="m-1 d-flex flex-row align-items-center mt-0">
                                <FaMapMarkerAlt size={12} />
                                <h6 className="mt-2 ms-1" style={{ fontSize: "small" }}>{d.location}</h6>
                            </div>
                        </div>
                    </div>
                </>
            )
        });

        return (
            <div className="container mb-5 startup-list-container">
                <div className="row">
                    <div className="col-12 offset-md-2 col-md-7">
                        <div className="card m-2 p-3">
                            <div className="px-2">
                                <h5>STARTUPS</h5>
                                <SearchBarComponent />
                            </div>
                            <div className="row px-3 mt-4">
                                {startupList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default StartupsListComponent
