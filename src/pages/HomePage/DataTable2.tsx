import React, { useContext, useEffect, useMemo } from "react";
import SearchBarComponent from "../../components/SearchDataTable";
import styled from "styled-components";
import { ThemeContext } from "../../config/context";
import DataTable from "../../components/DataTable";
import { useQuery } from "../../hooks/useQuery";
import TableContainer from "../../components/ReactTable/TableContainer";

const startupLoops: any[] = [
  "totalStartups",
  "FFS",
  "patientStartups",
  "seedFundStartups",
  "showcasedStartups",
  "dpiitRecognised",
  "womenOwned",
];

const mentorsLoop: any[] = [
  "Mentor",
  "Incubator",
  "Investor",
  "Accelerator",
  "GovernmentBody",
];

function DataTableComponent(props: any) {
  const theme = useContext(ThemeContext);

  const [fetch, state, loading] = useQuery(
    "https://13.235.79.165:443/data/stateStatistics/2021-01-01/2021-12-01"
  );

  const table1Configs = {
    headerConfig: [
      {
        label: "States",
        cellConfig: {
          borderLeft: true,
          borderWidth: "0px",
          cellClass: "header-cell-state",
        },
      },
      {
        label: "Total \n Startups",
        cellConfig: {
          background: "white",
          borderStyle: "solid",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell",
        },
      },
      {
        label: "FFS",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell",
        },
      },
      {
        label: "Patient Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell",
        },
      },
      {
        label: "Seed Fund Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell",
        },
      },
      {
        label: "Showcased Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell",
        },
      },
      {
        label: "DPIIT Recognised Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell",
        },
      },
      {
        label: "Women Owned Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell",
        },
      },
    ],
    bodyConfig: [
      {
        defaultAccessor: "",
        accessor: "text",
        cellConfig: {
          fontWeight: true,
          borderLeft: true,
          borderWidth: "0px",
          cellClass: "header-cell",
        },
      },
      {
        accessor: "totalStartups",
        defaultAccessor: "stateStatistics",
        cellConfig: {
          borderStyle: "dashed",
          cellClass: "header-cell",
          borderColor: theme.dataTable.dashedBorder,
        },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "FFS",
        cellConfig: {
          borderStyle: "dashed",
          cellClass: "header-cell",
          borderColor: theme.dataTable.dashedBorder,
        },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "patientStartups",
        cellConfig: {
          borderStyle: "dashed",
          cellClass: "header-cell",
          borderColor: theme.dataTable.dashedBorder,
        },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "seedFundStartups",
        cellConfig: {
          borderStyle: "dashed",
          cellClass: "header-cell",
          borderColor: theme.dataTable.dashedBorder,
        },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "showcasedStartups",
        cellConfig: {
          borderStyle: "dashed",
          cellClass: "header-cell",
          borderColor: theme.dataTable.dashedBorder,
        },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "dpiitRecognised",
        cellConfig: {
          borderStyle: "dashed",
          cellClass: "header-cell",
          borderColor: theme.dataTable.dashedBorder,
        },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "womenOwned",
        cellConfig: {
          borderStyle: "dashed",
          cellClass: "header-cell",
          borderColor: theme.dataTable.dashedBorder,
        },
      },
    ],
  };
  const table2Configs = {
    headerConfig: [
      {
        label: "States",
        cellConfig: {
          borderLeft: true,
          borderWidth: "0px",
          cellClass: "header-cell-state",
        },
      },
      {
        label: "Mentors",
        cellConfig: {
          background: "white",
          borderStyle: "solid",
          borderColor: "#8A8A8A",
          cellClass: "header-cell-2",
        },
      },
      {
        label: "Incubator",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell-2",
        },
      },
      {
        label: "Investors",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell-2",
        },
      },
      {
        label: "Accelerator",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell-2",
        },
      },
      {
        label: "Government",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass: "header-cell-2",
        },
      },
    ],
    bodyConfig: [
      {
        defaultAccessor: "",
        accessor: "text",
        cellConfig: {
          fontWeight: true,
          borderLeft: true,
          borderWidth: "0px",
          cellClass: "header-cell-2",
        },
      },
      {
        accessor: "Mentor",
        defaultAccessor: "stateStatistics",
        cellConfig: { borderStyle: "dashed", cellClass: "header-cell-2" },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "Incubator",
        cellConfig: { borderStyle: "dashed", cellClass: "header-cell-2" },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "Investor",
        cellConfig: { borderStyle: "dashed", cellClass: "header-cell-2" },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "Accelerator",
        cellConfig: { borderStyle: "dashed", cellClass: "header-cell-2" },
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "GovernmentBody",
        cellConfig: { borderStyle: "dashed", cellClass: "header-cell-2" },
      },
    ],
  };

  const columns = useMemo(
    () => [
      {
        Header: "States",
        accessor: "name",
      },
      {
        Header: "Total Startups",
        accessor: "stateStatistics.totalStartups",
      },
      {
        Header: "FFS",
        accessor: "stateStatistics.patientStartups",
        // Cell: (cellProps)=> <NormalCell {...cellProps} />
      },
      {
        Header: "Seed Fund Startups",
        accessor: "stateStatistics.seedFundStartups",
        // Cell: (cellProps)=> <NormalCell {...cellProps} />
      },
      {
        Header: "Showcased Startups",
        accessor: "stateStatistics.showcasedStartups",
        // Cell: (cellProps)=> <NormalCell {...cellProps} />
      },
      {
        Header: "DPIIT Recognised",
        accessor: "stateStatistics.dpiitRecognised",
        // Cell: (cellProps)=> <Discount {...cellProps} />
      },
      {
        Header: "Women Owned",
        accessor: "stateStatistics.womenOwned",
        // Cell: (cellProps)=> <NormalCell {...cellProps} />
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
        accessor: "stateStatistics.totalStartups",
      },
      {
        Header: "Incubator",
        accessor: "stateStatistics.patientStartups",
      },
      {
        Header: "Investors",
        accessor: "stateStatistics.seedFundStartups",
      },
      {
        Header: "Accelerator",
        accessor: "stateStatistics.showcasedStartups",
      },
      {
        Header: "Government",
        accessor: "stateStatistics.dpiitRecognised",
      },
    ],
    []
  );

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="ms-3 mt-3">
      <TableContainer
        columns={columns}
        bodyData={state.data || []}
        loop={startupLoops}
        mentorsTable={false}
      />
      <TableContainer
        columns={columns2}
        bodyData={state.data || []}
        loop={mentorsLoop}
        mentorsTable={true}
      />
    </div>
  );
}
export default React.memo(DataTableComponent);
