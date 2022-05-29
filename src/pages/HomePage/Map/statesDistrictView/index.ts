import Maharashtra from "./Maharashtra.json";
import Karnataka from "./karnataka.json";
import Rajasthan from "./rajasthan.json";
import Goa from "./goa.json";
import Delhi from "./delhi.json";
import Kerla from "./kerala.json";
import Manipur from "./manipur.json";
import TamilNadu from "./Tamilnadu.json"

export interface DistrictBorderType {
    name: string;
    d: string
}

export interface StateWiseMapViewType {
    name: string;
    id: string;
    path: DistrictBorderType[];
    text: string;
  }

export const StatesDistrictView = [
  {
    name: "Maharashtra",
    text: "Maharashtra",
    id: "5f48ce592a9bb065cdf9fb31",
    path: [...Maharashtra],
  },
  {
    id: "5f48ce592a9bb065cdf9fb2d",
    name: "Karnataka",
    text: "Karnataka",
    path: [...Karnataka],
  },
  {
    name: "Rajasthan",
    id: "5f48ce592a9bb065cdf9fb39",
    text: "Rajasthan",
    path: [...Rajasthan],
  },
  {
    name: "Delhi",
    id: "5f48ce592a9bb065cdf9fb26",
    text: "Delhi",
    path: [...Delhi],
  },
  {
    name: "Goa",
    id: "5f48ce592a9bb065cdf9fb27",
    text: "Goa",
    path: [...Goa],
  },
  {
    name: "Kerala",
    text: "Kerala",
    id: "5f48ce592a9bb065cdf9fb2e",
    path: [...Kerla],
  },
  {
    name: "Manipur",
    id: "5f48ce592a9bb065cdf9fb32",
    text: "Manipur",
    path: [...Manipur],
  },
  {
    name: "Tamil Nadu",
    id: "5f48ce592a9bb065cdf9fb3b",
    text: "Tamil Nadu",
    path: [...TamilNadu],
  },
];
