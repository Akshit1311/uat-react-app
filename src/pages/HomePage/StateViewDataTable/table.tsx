import React, { useMemo } from "react";
import { StartupTypesKeys } from "../../../config/Constants";
import TableContainer from "./i";

const loop = ["Startup"];
export default function Table(props: any) {


  const columns2 = useMemo(
    () => [
      {
        Header: "District",
        accessor: "district",
      },
      {
        Header:   props.startupType.text || "All Startup",
        accessor: "statistics." + StartupTypesKeys[props.startupType.text],
      },
    ],
    [props.startupType]
  );
  return (
    <div className="col-4 mx-0 px-2">
      <TableContainer
        columns={columns2}
        bodyData={props.data || []}
        loop={loop}
        searchObj={props.searchObj}
        search={props.search}
        mentorsTable={false}
      />
    </div>
  );
}
