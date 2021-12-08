import React, { useContext, useEffect } from "react";
import SearchBarComponent from "../../components/SearchDataTable";
import styled from "styled-components";
import { ThemeContext } from "../../config/context";
import DataTable from "../../components/DataTable";
import { useQuery } from "../../hooks/useQuery";

export default function DataTableComponent(props: any) {
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
          cellClass:"header-cell"
        },
      },
      {
        label: "Total \n Startups",
        cellConfig: {
          background: "white",
          borderStyle: "solid",
          borderColor: "#8A8A8A",
          cellClass:"header-cell"
        },
      },
      {
        label: "FFS",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell"
        },
      },
      {
        label: "Patient Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell"
        },
      },
      {
        label: "Seed Fund Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell"
        },
      },
      {
        label: "Showcased Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell"
        },
      },
      {
        label: "DPIIT Recognised Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell"
        },
      },
      {
        label: "Women Owned Startups",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell"
        },
      },
    ],
    bodyConfig: [
      {
        defaultAccessor:"",
        accessor: "text",
        cellConfig: {
          fontWeight: true,
          borderLeft: true,
          borderWidth: "0px",
          cellClass:"header-cell"
        },
      },
      {
        accessor: "totalStartups",
        defaultAccessor: "stateStatistics",
        cellConfig: { borderStyle:'dashed',    cellClass:"header-cell"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "FFS",
        cellConfig: { borderStyle:'dashed',    cellClass:"header-cell"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "patientStartups",
        cellConfig: { borderStyle:'dashed',    cellClass:"header-cell"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "seedFundStartups",
        cellConfig: { borderStyle:'dashed',   cellClass:"header-cell"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "showcasedStartups",
        cellConfig: { borderStyle:'dashed',    cellClass:"header-cell"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "dpiitRecognised",
        cellConfig: { borderStyle:'dashed',    cellClass:"header-cell"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "womenOwned",
        cellConfig: { borderStyle:'dashed',    cellClass:"header-cell"},
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
          cellClass:"header-cell-2"
        },
      },
      {
        label: "Mentors",
        cellConfig: {
          background: "white",
          borderStyle: "solid",
          borderColor: "#8A8A8A",
          cellClass:"header-cell-2"
        },
      },
      {
        label: "Incubator",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell-2"
        },
      },
      {
        label: "Investors",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell-2"
        },
      },
      {
        label: "Accelerator",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell-2"
        },
      },
      {
        label: "Government",
        cellConfig: {
          borderStyle: "dashed",
          borderColor: theme.dataTable.dashedBorder,
          cellClass:"header-cell-2"
        },
      },
    ],
    bodyConfig: [
      {
        defaultAccessor:"",
        accessor: "text",
        cellConfig: {
          fontWeight: true,
          borderLeft: true,
          borderWidth: "0px",
          cellClass:"header-cell-2"
        },
      },
      {
        accessor: "Mentor",
        defaultAccessor: "stateStatistics",
        cellConfig: { borderStyle:'dashed', cellClass:"header-cell-2"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "Incubator",
        cellConfig: { borderStyle:'dashed', cellClass:"header-cell-2"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "Investor",
        cellConfig: { borderStyle:'dashed', cellClass:"header-cell-2"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "Accelerator",
        cellConfig: { borderStyle:'dashed', cellClass:"header-cell-2"},
      },
      {
        defaultAccessor: "stateStatistics",
        accessor: "GovernmentBody",
        cellConfig: { borderStyle:'dashed', cellClass:"header-cell-2"},
      },
    ],
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <DataTable {...table1Configs} bodyData={state.data || []} />
      <DataTable {...table2Configs} bodyData={state.data || []} />
    </>
  );
}
