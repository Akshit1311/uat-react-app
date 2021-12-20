import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useQuery } from "../../../hooks/useQuery";

interface StatePolicyTypes {
  stateId?: string;
}

export default function StatePolicy({ stateId }: StatePolicyTypes) {
  const [fetchPolicy, policyState, policyLoading] = useQuery("");
  useEffect(() => {
    return () => fetchPolicy(`/policy/byStateId/${"5f48ce592a9bb065cdf9fb3f"}`);
  }, [stateId]);
  console.log(policyState);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const stageWiseAwardsWrapper = (data: any): any[] => {
    if (data) {
      const total = data.total;
      const entries = Object.entries(data);
      const inPercent = new Array();
      entries.forEach((item: any, index: number) => {
        if (item[0] == "total" || item[0] == "stateName") return;
        const percentage: any = ((item[1] / total) * 100).toString();
        const fixed = Number.parseFloat(percentage).toFixed(2);
        console.log(fixed);
        console.log(item);
        const obj = {
          title: capitalizeFirstLetter(item[0]),
          value: Number.parseInt(percentage),
          color: "green",
        };
        inPercent.push(obj);
      });
      return inPercent;
    } else return [];
  };

  const stagewiseFundingsWrapper = (data: any): any[] => {
    if (data) {
      const total = data.total;
      const entries = Object.entries(data);
      const inPercent = new Array();
      entries.forEach((item: any, index: number) => {
        if (item[0] == "total" || item[0] == "stateName") return;
        const percentage: any = ((item[1] / total) * 100).toString();
        const fixed = Number.parseFloat(percentage).toFixed(2);
        console.log(fixed);
        console.log(item);
        const obj = {
          title: capitalizeFirstLetter(item[0]),
          value: Number.parseInt(percentage),
          color: "green",
        };
        inPercent.push(obj);
      });
      return inPercent;
    } else return [];
  };
  const stagesWrapper = (data: any): any[] => {
    if (data) {
      const total = data.total;
      const entries = Object.entries(data);
      const inPercent = new Array();
      entries.forEach((item: any, index: number) => {
        if (item[0] == "total" || item[0] == "stateName") return;
        const percentage: any = ((item[1] / total) * 100).toString();
        const fixed = Number.parseFloat(percentage).toFixed(2);
        console.log(fixed);
        console.log(item);
        const obj = {
          title: capitalizeFirstLetter(item[0]),
          value: Number.parseInt(percentage),
          color: "green",
        };
        inPercent.push(obj);
      });
      return inPercent;
    } else return [];
  };

  const sectorsWrapper = (data:any):any[]=>{
    if(data){
      let totalCount = 0;
      data.forEach((item:any)=> totalCount += item.sectorCount )

      const pieChartList = new Array();
      data.forEach((item:any)=>{
        const percentage: any = ((item.sectorCount / totalCount) * 100).toString();
        const obj = {
          title: capitalizeFirstLetter(item.sector),
          value: Number.parseInt(percentage),
          color: "green",
        }
        pieChartList.push(obj)
      })

      return pieChartList
    }
    return []
  }

  return (
    <div className="d-flex flex-wrap">
      <div className="w-49-h-250px mt-2">
        {/* <PieChart
        label={({ dataEntry }) => `${dataEntry.value}%`}
        labelStyle={(index) => ({
          fill: "white",
          fontSize: "5px",
          fontFamily: "sans-serif",
        })}
        radius={42}
        labelPosition={60}
          data={sectorsWrapper( Array.isArray(policyState) ? null : policyState.sectors )}
        /> */}
      </div>
      <div className="w-49-h-250px mt-2">
        <PieChart
          label={({ dataEntry }) => `${dataEntry.value}%`}
          labelStyle={(index) => ({
            fill: "white",
            fontSize: "5px",
            fontFamily: "sans-serif",
          })}
          radius={42}
          labelPosition={60}
          data={stagesWrapper( Array.isArray(policyState) ? null : policyState.stages[0])}
        />
      </div>
      <div className="w-49-h-250px mt-2">
        <PieChart
          label={({ dataEntry }) => `${dataEntry.value}%`}
          labelStyle={(index) => ({
            fill: "white",
            fontSize: "5px",
            fontFamily: "sans-serif",
          })}
          radius={42}
          labelPosition={60}
          data={stagewiseFundingsWrapper(
            Array.isArray(policyState) ? null : policyState.stagewiseFundings[0]
          )}
        />
      </div>
      <div className="w-49-h-250px mt-2">
        <PieChart
          label={({ dataEntry }) => `${dataEntry.value}%`}
          labelStyle={(index) => ({
            fill: "white",
            fontSize: "5px",
            fontFamily: "sans-serif",
          })}
          radius={42}
          labelPosition={60}
          data={stageWiseAwardsWrapper(
            Array.isArray(policyState) ? null : policyState.stagewiseAwards[0]
          )}
        />
      </div>
    </div>
  );
}
