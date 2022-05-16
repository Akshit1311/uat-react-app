import * as React from "react";
import { ThemeContext, NAVBAR_HEIGHT } from "../../config/context";
import {
  PageWrapper,
  PageWrapperContainer,
} from "../../styles-components/PageWrapper";
import { H5 } from "../../styles-components/Heading";
import { useWebQuery } from "../../hooks/useWebQuery";
import Accordion from "./Accordion";
import { useQuery } from "../../hooks/useQuery";
import CountryMap from "./Map";
import { useHistory } from "react-router-dom";

export default function ControlledAccordions() {
  const query = useWebQuery();
  const theme = React.useContext(ThemeContext);
  const history = useHistory();

  const [fetchInsights, insightState] = useQuery("");
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const localSectors = localStorage.getItem("Sector");
  const selectedSectors: any[] = JSON.parse(
    localSectors ? localSectors.toString() : "0"
  );

  const localIndustries = localStorage.getItem("Industry");
  const selectedIndustries: any[] = JSON.parse(
    localIndustries ? localIndustries.toString() : "0"
  );

  const localStages = localStorage.getItem("Stage");
  const selectedStages: any[] = JSON.parse(
    localStages ? localStages.toString() : "0"
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  React.useEffect(() => {
    fetchInsights(`/insight/state/${query.get("id")}/2021-01-01/2021-12-12`);
  }, [query.get("id")]);

  const backUrl:string = `/?id=${query.get('id')}&state=${query.get('state')}`
  return (
    <div style={{ marginTop: NAVBAR_HEIGHT }} className="h-100">
      <PageWrapperContainer className="h-100">
        <PageWrapper className="p-4 h-100">
          <div className="mb-4">
            <H5 className="text-uppercase font-Mont font-18px mb-0">
              View Insights of {query.get("state")}
            </H5>
            <p className="font-Mont font-600 font-12px mt-1">
              <span style={{ color: theme.viewInsightColor}} onClick={()=> history.push('/')}>{"IndiaMap / "}</span>
              <span style={{ color: theme.viewInsightColor }} onClick={()=> history.push(backUrl)}>{query.get("state")}</span><span className="opacity-50"> / </span>
              <span style={{ color: theme.color }}>View Insight</span>
            </p>
          </div>
          <div className="row">
            <div className="col-12 col-sm-9">
              <Accordion
                expanded={expanded}
                panelName="panel1"
                handleChange={handleChange}
                title="Industry"
                stateName={query.get("state")}
                data={insightState.industry || []}
                selectedData={selectedIndustries || []}
              />

              <Accordion
                expanded={expanded}
                panelName="panel2"
                handleChange={handleChange}
                title="Sector"
                data={insightState.sector || []}
                stateName={query.get("state")}
                selectedData={selectedSectors || []}
              />

              <Accordion
                expanded={expanded}
                panelName="panel3"
                handleChange={handleChange}
                title="Stage"
                data={insightState.stage || []}
                stateName={query.get("state")}
                selectedData={selectedStages || []}
              />

              {/* <Accordion
                expanded={expanded}
                panelName="panel4"
                handleChange={handleChange}
                title="Startup with declared rewards"
                stateName={query.get("state")}
              /> */}
            </div>
            <div className="col-12 col-sm-3 pt-5  top-view-insight d-none d-sm-block">
              <CountryMap stateId={query.get("id")} />
            </div>
          </div>
        </PageWrapper>
      </PageWrapperContainer>
    </div>
  );
}
