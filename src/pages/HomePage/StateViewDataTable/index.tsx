import React, { useState } from "react";
import Table from "./table";

interface StateViewDataTableTypes{
    selectedArea: string | undefined | null;
}

export default function StateViewDataTable(props: StateViewDataTableTypes){
    const [displayLimit, setDisplayLimit] = useState(0);
    return(
        <div className="w-100 row">
            <Table search={true} />
            <Table search={false} />
            <Table search={false} />
            {/* <Table />
            <Table /> */}
        </div>
    )
}