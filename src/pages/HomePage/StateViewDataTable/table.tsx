import React, { useMemo } from "react";
import TableContainer from "./i";

const loop = [
    "Startup"
]

export default function Table(props: any) {
    const columns2 = useMemo(
        () => [
            {
                Header: "States",
                accessor: "name",
            },
            {
                Header: "Startups",
                accessor: "statistics.Startup",
            },
        ],
        []
    );
    return (
        <div className="col-4">
            <TableContainer
                columns={columns2}
                bodyData={[]}
                loop={loop}
                search={props.search}
                mentorsTable={false}
            />
        </div>
    )
}