import { FaMapMarkerAlt } from "react-icons/fa";
import React from "react";
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
      <div  className="mb-0 d-flex flex-row start-up-card" style={{ marginTop: "1.3rem" }}>
        <div>
          <img
            src={img_url}
            className="rounded-circle border"
            alt="main-logo"
            width="60px"
            height="60px"
          />
        </div>
        <div className="p-2 py-0  ms-0 row d-flex justify-content-left">
          <h6 className=" my-0 py-0 company-title">{company}</h6>
          <div className="">
            <div className="stage-sector-div d-flex  flex-wrap">
              <Badge className="me-2-5 mt-2-5">Stage: {stage}</Badge>
              <Badge className="mt-2-5">Sector: {sector}</Badge>
            </div>
            <div>
              <Badge className="mt-2">Tax Exempted</Badge>
            </div>
          </div>
          <div className="m-1 d-flex flex-row align-items-center mt-2-5">
            <FaMapMarkerAlt size={13} style={{ marginTop: "-1.5px" }} />
            <h6 className="ms-1 my-0 py-0  start-up-location">{location}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

function StartupsListComponent(props: any) {
  const [screenWidth, setScreenWidth] = React.useState<number>(0)


  const startupList = props.data.map((startUp: any) => (
    <StartUpCard {...startUp} />
  ));
  const extraSpacing:number = screenWidth-1150
  const windowResize =(event:any)=>{
    const windowWidth:number = window.innerWidth
    setScreenWidth(windowWidth)
  }
  React.useEffect(()=>{
    if(screenWidth === 0) setScreenWidth(window.innerWidth)
    window.addEventListener('resize', windowResize, false)
  },[screenWidth]) 
    if (!props.data.length) return <EmptyStartUp />;
  return (
    <div className="mb-5 startup-list-styles d-flex">
      <div style={{ minWidth:"0", maxWidth:"17%", width:extraSpacing +'px' }} />
      <div style={{ maxWidth: "55%", minWidth:"764px" }} className="startup-list-card-container p-4">
        <h6 className="startup-heading p-0 m-0">STARTUPS</h6>
        <div style={{ marginTop: "1rem", marginBottom: '0.2rem' }}>
          <SearchBarComponent />
        </div>
        {console.log(screenWidth)}
        <div className="d-flex flex-wrap justify-content-between">{startupList}</div>
      </div>
    </div>
  );
}

export default StartupsListComponent;
