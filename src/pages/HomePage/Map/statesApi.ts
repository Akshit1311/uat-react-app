import React from "react";
import axios from "axios";
import https from "https";
import { MapType } from "./states";
import { States } from "./states";

export async function statesDpiit(values: any): Promise<MapType[]> {
  // const findState = (value: string) => {
  //   return States.findIndex((state) =>
  //     state.accessor.name.toLowerCase().includes(value.toLowerCase())
  //   );
  // };

  // const statesDataWrapper = (data: any) => {
  //   const newArray = new Array();
  //   data.forEach((item: any) => {
  //     const newObject: any = new Object();
  //     const stateIndex = findState(item["stateName"]);

  //     newObject["id"] = item["id"];
  //     newObject["accessor"] = {
  //       id: item["id"],
  //       name: item["stateName"],
  //     };
  //     if (States[stateIndex]) {
  //       newObject["d"] = States[stateIndex].d;
  //       newArray.push(newObject);
  //     }
  //   });
  //   console.log(newArray);
  //   return newArray;
  // };
  return new Promise(async (resolve, rejects) => {
    try {
      const response = await axios({
        url: "https://api.startupindiaonline.com/startup/dpiit/states",
        method: "GET",
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      resolve(response.data);
    } catch (error) {
      console.log("Data Fetching Error Dpiit", error);
      rejects([])
    }
  });
}
