import { FaMapMarkerAlt } from "react-icons/fa";
import SearchBarComponent from "../../components/SearchBarComponent";
import { Badge } from "../../styles-components/Badge";
import "../../scss/HomePageStyles/startupsListComponent.scss";

function EmptyStartUp() {
  return (
    <div className="container text-center p-5">
      <h1>Startup List is Empty</h1>
    </div>
  );
}

function StartUpCard({ _id, img_url, sector, company, location, stage }: any) {
  return (
    <>
      <div
        key={_id}
        className="col-12 col-md d-flex flex-row start-up-card"
      >
        <div>
          <img src={img_url} className="rounded-circle border" alt="main-logo" width="60px" height="60px" />
        </div>
        <div className="p-2 ms-1 row d-flex justify-content-left">
          <h6 className="ms-1 company-title">{company}</h6>
          <div className="stage-sector-div">
            <Badge className="m-1">Stage: {stage}</Badge>
            <Badge>Sector: {sector}</Badge>
          </div>
          <div>
            <Badge className="m-1">Tax Exempted</Badge>
          </div>
          <div className="m-1 d-flex flex-row align-items-center mt-0">
            <FaMapMarkerAlt size={12} />
            <h6 className="mt-2 ms-1 start-up-location">
              {location}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

function StartupsListComponent(props: any) {
  if (!props.data.length) return <EmptyStartUp />;

  const startupList = props.data.map((startUp: any) => (
    <StartUpCard {...startUp} />
  ));

  return (
    <div className="container mb-5 startup-list-styles">
      <div className="row">
        <div className="col-12 offset-md-2 col-md-7">
          <div className="card startup-list-card-container">
            <h6 className="startup-heading">STARTUPS</h6>
            <div className="search-bar-component">
              <SearchBarComponent />
            </div>
            <div className="row px-3">{startupList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartupsListComponent;
