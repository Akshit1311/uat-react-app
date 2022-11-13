import React, { useEffect, useState } from "react";
import Table from "./table";
import _ from "lodash";
import { StartupType } from "../index";

interface StateViewDataTableTypes {
  selectedArea: string | undefined | null;
  data: any[];
  fetch: any;
  startupType: StartupType;
}

export default function StateViewDataTable(props: StateViewDataTableTypes) {
  const [data, setData] = useState<any[]>([]);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const createChunk = (data: any[]) => {
    const chunk = _.chunk(data, Math.floor(data.length / 3));
    if (chunk[3]) chunk[0] = chunk[0].concat(chunk[3]);
    return chunk;
  };

  const splitData = () => {
    if (props.data && props.data.length) {
      setOriginalData(props.data);
      setData(createChunk(props.data));
    } else {
      props.fetch();
    }
  };

  const handleSearch = (value: string) => {
    if (value.length === 0) return setData(createChunk(originalData));
    const result = originalData.filter((obj) => {
      if (obj.district && value)
        return obj.district.toLowerCase().includes(value.toLowerCase());
    });
    if (result.length < 3) setData([result, [], []]);
    else setData(createChunk(result));
  };

  useEffect(() => {
    splitData();
  }, [props.data]);

  return (
    <div className="ms-3">
      <div className="w-100 row">
        <Table
          search={true}
          data={data[0]}
          searchObj={[searchText, handleSearch]}
          startupType={props.startupType}
        />
        <Table
          search={false}
          data={data[1]}
          searchObj={[searchText, handleSearch]}
          startupType={props.startupType}
        />
        <Table
          search={false}
          data={data[2]}
          searchObj={[searchText, handleSearch]}
          startupType={props.startupType}
        />
        {/* <Table />
            <Table /> */}
      </div>
    </div>
  );
}
