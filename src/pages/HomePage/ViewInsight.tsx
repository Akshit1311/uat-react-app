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

export default function ViewInsight(props: any) {
  const query = useWebQuery();
  const history = useHistory();
  const [state, setState] = React.useState<any>({ id: "", value: "" });

  const navigate = () => {
    const url =
      props.selectedState && props.selectedState[0]
        ? `/maps` + props.viewInsightUrl
        : `/maps/view-insight?id=${
            query.get("id") ? query.get("id") : "India"
          }&state=${query.get("state") ? query.get("state") : "India"}`;
    history.push(url);
  };

  React.useEffect(() => {
    if (props.selectedState && props.selectedState.length > 0) {
      let { selectedState } = props;
      setState(selectedState[0]);
    }
    else {
      setState({ id: "", value: "" });
    }                                                                                                 
  }, [props.selectedState]);
  let ran = Math.random();

  return (
    <div className="left-side-nav-styles">
      <Card className="left-nav-bottom-card row pt-3 pb-0">
        <h6
          className="px-0 card-heading-left-bottom"
          style={{ textTransform: "uppercase" }}
        >
          {`VIEW STARTUP ECOSYSTEM INSIGHTS OF ${
            state && state.value != "" ? state.value : "INDIA"
          }`}
        </h6>
        <span className="sub-heading px-0 mb-2 font-500">
          You can View Insights of{" "}
          {state && state.value != "" ? state.value : "India"}
        </span>
        <div className="btn-view-project mx-0 px-0">
          {/* <Link to={url}>
            <Button colorTheme={props.colorTheme} className="background-color-theme">View Insights</Button>
          </Link> */}
          <Button
            colorTheme={props.colorTheme}
            onClick={() => navigate()}
            className="background-color-theme"
          >
            View Insights
          </Button>
        </div>
      </Card>
    </div>
  );
}
