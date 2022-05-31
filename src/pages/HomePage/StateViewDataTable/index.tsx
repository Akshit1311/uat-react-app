import React, { useEffect, useState } from "react";
import Table from "./table";
import _ from "lodash";

interface StateViewDataTableTypes {
  selectedArea: string | undefined | null;
  data: any[];
  fetch: any;
  startupType: string;
}

export default function StateViewDataTable(props: StateViewDataTableTypes) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (props.data && props.data.length) {
      setData(_.chunk(props.data, Math.floor(props.data.length / 3)));
    } else {
      props.fetch();
    }
  }, [props.data]);
  return (
    <div className="ms-3">
      <div className="w-100 row">
        <Table search={true} data={data[0]} startupType={props.startupType} />
        <Table search={false} data={data[1]} startupType={props.startupType} />
        <Table search={false} data={data[2]} startupType={props.startupType} />
        {/* <Table />
            <Table /> */}
      </div>
    </div>
  );
}
