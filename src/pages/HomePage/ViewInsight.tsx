import * as React from "react";
import { Link } from "react-router-dom";
import "../../scss/HomePageStyles/leftNavComponent.scss";
import { Button } from "../../styles-components/Button";
import { Card } from "../../styles-components/Cards";

interface ViewInsight {
    viewInsightUrl:string;
    colorTheme: string;
}

export default function ViewInsight(props:any){
    return(
        <Card className="left-nav-bottom-card row pt-3 pb-0">
            <h6 className="px-0 card-heading-left-bottom">
              {" "}
              VIEW STARTUP ECOSYSTEM INSIGHTS OF INDIA
            </h6>
            <span className="sub-heading px-0 mb-2 font-500">
              You can View Insights of India
            </span>
            <div className="btn-view-project mx-0 px-0">
              <Link to={props.viewInsightUrl}>
              <Button colorTheme={props.colorTheme} className="background-color-theme">View Insights</Button>
              </Link>
            </div>
          </Card>
    )
}