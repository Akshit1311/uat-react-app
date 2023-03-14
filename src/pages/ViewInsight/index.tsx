import * as React from "react";
import axios from "axios";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const apiUrl = process.env.REACT_APP_BACKEND_ENDPOINT_PROD || ";";

export default function ControlledAccordions() {
  const query = useWebQuery();

  const theme = React.useContext(ThemeContext);
  const history = useHistory();

  const [func, data] = useQuery(`${apiUrl}/insight/industryInsights`);
  // const [fetchSectors, sectors] = useQuery(
  //   "${apiUrl}/insight/sectorInsights"
  // );
  // const [fetchStages, stages] = useQuery(
  //   "${apiUrl}/insight/stageInsights"
  // );
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [industries, setIndustries] = React.useState([]);
  const [sectors, setSectors] = React.useState([]);
  const [stages, setStages] = React.useState([]);
  const [totalIndustries, setTotalIndustries] = React.useState([]);
  const [totalSectors, setTotalSectors] = React.useState([]);
  const [totalStages, setTotalStages] = React.useState([]);

  const [industriesLoading, setIndustriesLoading] = React.useState(true);
  const [sectorsLoading, setSectorsLoading] = React.useState(true);
  const [stagesLoading, setStagesLoading] = React.useState(true);

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
    window.scroll(0, 0);
    const id = query.get("id");

    if (id && id != "India") {
      axios(`${apiUrl}/insight/industryInsights?stateId=${id}`).then((data) => {
        setIndustries(data.data);
      });
      axios(`${apiUrl}/insight/sectorInsights?stateId=${id}`).then((data) => {
        setSectors(data.data);
      });

      axios(`${apiUrl}/insight/stageInsights?stateId=${id}`).then((data) => {
        setStages(data.data);
      });

      axios(`${apiUrl}/insight/industryInsights`).then((data) => {
        setTotalIndustries(data.data);
      });

      axios(`${apiUrl}/insight/sectorInsights`).then((data) => {
        setTotalSectors(data.data);
      });

      axios(`${apiUrl}/insight/stageInsights`).then((data) => {
        setTotalStages(data.data);
      });
    } else {
      axios(`${apiUrl}/insight/industryInsights`).then((data) => {
        setIndustries(data.data);
      });

      axios(`${apiUrl}/insight/sectorInsights`).then((data) => {
        setSectors(data.data);
      });

      axios(`${apiUrl}/insight/stageInsights`).then((data) => {
        setStages(data.data);
      });

      setIndustriesLoading(false);
      setSectorsLoading(false);
      setStagesLoading(false);
    }

    // if(!id || id == 'India'){
    //   fetchInsights(`/insight/country/dsaskjdsa/2015-01-01/2022-06-24`);
    // } else {
    //   // if(query.get("id") == 'India'){
    //   //   fetchInsights(`/insight/country/dsaskjdsa/2015-01-01/2022-06-24`);
    //   // } else {
    //     fetchInsights(`/insight/state/${query.get("id")}/2021-01-01/2021-12-12`);

    //   // }

    // }
  }, [query.get("id")]);

  const dataMargeUp = (arr1: any, arr2: any) => {
    const mergeArr: any = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i]["industry"] == arr2[j]["industry"]) {
          let arr = { ...arr1[i] };
          arr["indiaTotal"] = arr2[j].count;
          mergeArr.push(arr);
          break;
        }
      }
    }
    return mergeArr;
  };

  React.useEffect(() => {
    if (industries.length > 0 && totalIndustries.length > 0) {
      let data = dataMargeUp(industries, totalIndustries);
      setIndustries(data);
      setIndustriesLoading(false);
    }
    if (sectors.length > 0 && totalSectors.length > 0) {
      let data = dataMargeUp(sectors, totalSectors);
      setSectors(data);
      setSectorsLoading(false);
    }
    if (stages.length > 0 && totalStages.length > 0) {
      let data = dataMargeUp(stages, totalStages);
      setStages(data);
      setStagesLoading(false);
    }
  }, [totalIndustries, totalSectors, totalStages]);

  const backUrl: string = `/maps/${
    query.get("id") === "India"
      ? ""
      : "?id=" + query.get("id") + "&state=" + query.get("state")
  }`;

  return (
    <div style={{ marginTop: NAVBAR_HEIGHT }} className="h-100">
      <PageWrapperContainer className="h-100">
        <PageWrapper className="p-4 h-100">
          <div className="mb-4">
            <a
              className="font-Mont font-600 font-12px mt-1"
              style={{ color: theme.color }}
              href={backUrl}
            >
              <ArrowBackIcon style={{ fontSize: "15px", marginRight: "5px" }} />
              Back
            </a>
            <H5 className="text-uppercase font-Mont font-18px mb-0">
              View Insights of {query.get("state") || "India"}
            </H5>
            <p className="font-Mont font-600 font-12px mt-1">
              <span
                style={{ color: theme.viewInsightColor }}
                className="cursor-pointer"
                onClick={() => history.push(`/maps`)}
              >
                {"IndiaMap / "}
              </span>
              <span
                style={{ color: theme.viewInsightColor }}
                className="cursor-pointer"
                onClick={() => history.push(backUrl)}
              >
                {query.get("state")?.length === 0
                  ? "India"
                  : query.get("state")}
              </span>
              <span
                style={{ color: theme.viewInsightColor }}
                // className="opacity-50"
              >
                {" "}
                /{" "}
              </span>
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
                stateName={
                  query.get("state") === "India" ? "" : query.get("state")
                }
                data={industries || []}
                selectedData={selectedIndustries || []}
                type="industry"
                loading={industriesLoading}
              />

              <Accordion
                expanded={expanded}
                panelName="panel2"
                handleChange={handleChange}
                title="Sector"
                data={sectors || []}
                stateName={
                  query.get("state") === "India" ? "" : query.get("state")
                }
                selectedData={selectedSectors || []}
                type="sector"
                loading={sectorsLoading}
              />

              <Accordion
                expanded={expanded}
                panelName="panel3"
                handleChange={handleChange}
                title="Stage"
                data={stages || []}
                stateName={
                  query.get("state") === "India" ? "" : query.get("state")
                }
                selectedData={selectedStages || []}
                type="stage"
                loading={stagesLoading}
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
