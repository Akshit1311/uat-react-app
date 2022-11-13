import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { useWebQuery } from "../../hooks/useWebQuery";
// import { baseRoute } from "../../routes/publicRoutes";
import "../../scss/HomePageStyles/leftNavComponent.scss";
import { Button } from "../../styles-components/Button";
import { Card } from "../../styles-components/Cards";

interface ViewInsight {
  viewInsightUrl: string;
  colorTheme: string;
}

 const baseRoute = process.env.REACT_APP_BASE_URL || "";

export default function ViewInsight(props: any) {
  const query = useWebQuery()
  const history = useHistory();
  const url = props.selectedState && props.selectedState[0] ? props.viewInsightUrl : `${baseRoute}/maps/view-insight?id=${query.get('id')}&state=${query.get('state')}`;
  const navigate= (url:string) => history.push(url);
  
  return (
    <div className="left-side-nav-styles">
      <Card className="left-nav-bottom-card row pt-3 pb-0">
        <h6 className="px-0 card-heading-left-bottom">
          {" "}
          VIEW STARTUP ECOSYSTEM INSIGHTS OF INDIA
        </h6>
        <span className="sub-heading px-0 mb-2 font-500">
          You can View Insights of India
        </span>
        <div className="btn-view-project mx-0 px-0">
          {/* <Link to={url}>
            <Button colorTheme={props.colorTheme} className="background-color-theme">View Insights</Button>
          </Link> */}
            <Button colorTheme={props.colorTheme} onClick={()=> navigate(url)} className="background-color-theme">View Insights</Button>
        </div>
      </Card>
    </div>
  );
}
