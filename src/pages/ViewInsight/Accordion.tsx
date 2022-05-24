import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled as MaterialStyled } from "@mui/material/styles";
import * as React from "react";
import { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InsightTable from "./InsightTable";
import SearchBarComponent from "../../components/SearchBarComponent";
import { ThemeContext } from "../../config/context";
import _ from "lodash";

const AccordionLocal = MaterialStyled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  background: theme.palette.mode === "dark" ? "rgba(37, 40, 58, 1)" : "white",
  boxShadow: "0px 0px 10px rgba(193, 193, 193, 0.25)",

  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = MaterialStyled((props: AccordionSummaryProps) => {
  const theme = useContext(ThemeContext);
  return (
    <MuiAccordionSummary
      expandIcon={
        <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: theme.color }} />
      }
      {...props}
    />
  );
})(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(37, 40, 58, 1)" : "white",
  border: "0px",
  paddingLeft: 0,
  paddingRight: 0,
}));

const AccordionDetails = MaterialStyled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  background: theme.palette.mode === "dark" ? "rgba(37, 40, 58, 1)" : "white",
}));

export interface InsightRowType {
  id: string;
  text: string;
  count: number;
  percentage: number;
  indiaTotal: number;
  indiaPercentage: number;
}

export interface AccordionTypes {
  expanded: string | boolean;
  handleChange: any;
  panelName: string;
  title: string;
  stateName: string | null;
  data: InsightRowType[];
  selectedData: string[];
}

export default function Accordion({
  expanded,
  handleChange,
  panelName,
  title,
  stateName,
  data,
  selectedData,
}: AccordionTypes) {
  const [queryString, setQueryString] = React.useState<string>("");
  const theme = useContext(ThemeContext);
  const isExpanded = expanded === panelName;
  const [type1State, setType1State] = React.useState<any[]>([]);
  const [type2State, setType2State] = React.useState<any[]>([]);

  const findId = (item: any) => selectedData.find((i: any) => item.id === i.id);

  const getMargin = (expand: boolean): string => {
    if (expand && panelName === "panel1") return "mb-4";
    if (expand) return "my-4";
    else return "my-0";
  };

  const handleSearch = () => {
    if (queryString.length === 0) return divideData();

    const result = divideData().filter((insight: InsightRowType) =>
      insight.text.toLowerCase().includes(queryString.toLowerCase())
    );
    setType2State(result);
  };

  const onSearch = (event: any) => setQueryString(event.target.value);

  const findIndex = (item: any, array: any[]) =>
    array.findIndex((i) => i.id === item.id);

  const onUnselectedItemClick = (insight: InsightRowType) => {
    const clone = _.cloneDeep(type1State);

    const clone2 = _.cloneDeep(type2State);

    clone.push({ ...insight });
    setType1State(clone);

    clone2.splice(findIndex(insight, type2State), 1);
    setType2State(clone2);
    localStorage.setItem(title.toString(), JSON.stringify(clone));
  };

  const onSelectedItemClick = (insight: InsightRowType) => {
    const clone = _.cloneDeep(type1State);

    const clone2 = _.cloneDeep(type2State);

    clone.splice(findIndex(insight, type1State), 1);
    setType1State(clone);

    const newList = [{ ...insight }, ...clone2];
    setType2State(newList);
    localStorage.setItem(title.toString(), JSON.stringify(clone));
  };

  const divideData = () => {
    const [type1Data, type2Data]: any[] = _.partition(data, findId);
    setType1State(type1Data);
    setType2State(type2Data);
    return type2Data;
  };

  React.useEffect(() => {
    divideData();
  }, [data, selectedData]);
  return (
    <>
      <AccordionLocal
        expanded={isExpanded}
        onChange={handleChange(panelName)}
        className={
          "px-2 " +
          getMargin(isExpanded) +
          (type1State.length === 0 ? " mb-3" : " 0")
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{ paddingBottom: "-10px", background: theme.accordionHeader }}
        >
          <div>
            <p className="font-Mont font-600 font-14px mb-0 px-2">{title}</p>
          </div>
        </AccordionSummary>

        <AccordionDetails className="view-insight-main mt-0">
          {type1State.length > 0 && (
            <>
              <InsightTable
                data={type1State}
                stateName={stateName}
                title={title}
                starFill={true}
                handleClickStar={onSelectedItemClick}
              />
              <div className="mb-3" />
            </>
          )}
          <div className="mb-3 mx-2">
            <SearchBarComponent
              background={theme.searchBg}
              handleApply={handleSearch}
              value={queryString}
              onChange={onSearch}
            />
          </div>
          <InsightTable
            data={type2State}
            stateName={stateName}
            title={title}
            handleClickStar={onUnselectedItemClick}
          />
          <div className="mb-2" />
        </AccordionDetails>
      </AccordionLocal>

      {type1State.length > 0 && !isExpanded && (
        <div className="mb-3 mt-0 position-relative">
          <div style={{ 
            position: 'absolute',
            top: '-10px',
            background: 'white',
            height: '10px', zIndex: 100, width: '100%'
           }}></div>
          <AccordionLocal
            expanded={true}
            className={"px-2 pb-2 pt-0 mb-0 " + getMargin(isExpanded)}
          >
            <AccordionDetails>
              <div className="view-insight-main mt-0">
                <>
                  <InsightTable
                    data={type1State}
                    stateName={stateName}
                    title={title}
                    starFill={true}
                    handleClickStar={onSelectedItemClick}
                  />
                  {/* <div className="mb-3" /> */}
                </>
              </div>
            </AccordionDetails>
          </AccordionLocal>
        </div>
      )}
    </>
  );
}
