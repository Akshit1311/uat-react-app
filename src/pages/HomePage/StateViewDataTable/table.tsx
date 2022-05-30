import React, { useMemo } from "react";
import TableContainer from "./i";

const loop = ["Startup"];

export   const StartupTypesKeys:any = {
    "All Startups": "Startup",
    "DPIIT recognised startups": "DpiitCertified",
    "Showcased Startups": "ShowcasedStartups",
    "Seed funded Startups": "SeedFundStartup",
    "Fund of Funds Scheme Startups": "FFS",
    "Seed fund scheme": "Startup",
    "Patented Startups": "PatentStartup",
    "Women owned recognized startups": "WomenLed",
    "Current leading Sector": "Startup",
    "Startup with declared rewards": "Startup",
  };

export default function Table(props: any) {


  const columns2 = useMemo(
    () => [
      {
        Header: "District",
        accessor: "district",
      },
      {
        Header: String(props.startupType.text),
        accessor: "statistics." + String(StartupTypesKeys[props.startupType.text]),
      },
    ],
    []
  );
  console.log("Statustucisjdkasda", props.startupType);
  return (
    <div className="col-4">
      <TableContainer
        columns={columns2}
        bodyData={props.data || []}
        loop={loop}
        search={props.search}
        mentorsTable={false}
      />
    </div>
  );
}
