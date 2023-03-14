import React, { useContext, useEffect, useMemo } from "react";
import TableContainer from "../../components/ReactTable/TableContainer";
import { ThemeContext } from "../../config/context";

const startupLoops: any[] = [
  "Startup",
  "PatentStartup",
  "SeedFundStartup",
  "ShowcasedStartups",
  "DpiitCertified",
  "WomenLed",
];

const mentorsLoop: any[] = [
  "Mentor",
  "Incubator",
  "Investor",
  "Accelerator",
  // "GovernmentBody",
];

function DataTableComponent(props: any) {
  const theme = useContext(ThemeContext);

  const { fetch, state, loading, appliedFilters } = props

  const columns = useMemo(
    () => [
      {
        Header: "States",
        accessor: "name",
      },
      {
        Header: "Total Startups",
        accessor: "statistics.Startup",
      },
      {
        Header: "Patent Startup",
        accessor: "statistics.PatentStartup",
      },
      {
        Header: "Seed Fund Startups",
        accessor: "statistics.SeedFundStartup",
      },
      {
        Header: "Showcased Startups",
        accessor: "statistics.ShowcasedStartups",
      },
      {
        Header: "DPIIT Recognised",
        accessor: "statistics.DpiitCertified",
      },
      {
        Header: "Women Owned",
        accessor: "statistics.WomenLed",
      },
    ],
    []
  );
  const columns2 = useMemo(
    () => [
      {
        Header: "States",
        accessor: "name",
      },
      {
        Header: "Mentors",
        accessor: "statistics.Mentor",
      },
      {
        Header: "Incubator",
        accessor: "statistics.Incubator",
      },
      {
        Header: "Investors",
        accessor: "statistics.Investor",
      },
      {
        Header: "Accelerator",
        accessor: "statistics.Accelerator",
      },
      // {
      //   Header: "Government",
      //   accessor: "statistics.GovernmentBody",
      // },
    ],
    []
  );

  useEffect(() => {
    fetch( 
      {
        ...appliedFilters,
        states: undefined,
        badges: undefined,
        counts: undefined,
        registrationFrom: undefined,
        registrationTo: undefined,
      });
  }, [appliedFilters.stages, appliedFilters.industries, appliedFilters.sectors]);
  return (
    <div className="ms-3 mt-3">
      <TableContainer
        columns={columns}
        bodyData={(state.data) || []}
        loop={startupLoops}
        mentorsTable={false}
      />
      <TableContainer
        columns={columns2}
        bodyData={(state.data) || []}
        loop={mentorsLoop}
        mentorsTable={true}
      />
    </div>
  );
}
export default React.memo(DataTableComponent);
