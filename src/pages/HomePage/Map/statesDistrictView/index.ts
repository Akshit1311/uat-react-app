import Maharashtra from "./Maharashtra.json";
import Karnataka from "./karnataka.json";
import Rajasthan from "./rajasthan.json";
import Goa from "./goa.json";
import Delhi from "./delhi.json";
import Kerla from "./kerala.json";
import Manipur from "./manipur.json";
import TamilNadu from "./Tamilnadu.json";
import Chandigarh from "./Chandigarh.json";
import DadarAndNagarHaweli from "./DadarAndNagarHaweli.json";
import HimachalPradesh from "./HimachalPradesh.json";
import Jharkhand from "./jharkhand.json";
import Ladakh from "./Ladakh.json";
import Meghalaya from "./Meghalay.json";
import Mizoram from "./Mizoram.json";
import NagaLand from "./Nagaland.json";
import PuduCheery from "./puducherry.json";
import Punjab from "./punjab.json";
import Tripura from "./tripura.json";
import Uttarakhand from "./uttarakhand.json";
export interface DistrictBorderType {
  name: string;
  d: string;
}

export interface StateWiseMapViewType {
  name?: string;
  id?: string;
  path?: DistrictBorderType[];
  text?: string;
}

export const StatesDistrictView = [
  {
    id: "5f48ce592a9bb065cdf9fb35",
    name: "Nagaland",

    text: "Nagaland",
    path: [...NagaLand],
  },
  {
    id: "5f48ce592a9bb065cdf9fb34",
    name: "Mizoram",

    text: "Mizoram",
    path: [...Mizoram],
  },
  {
    id: "5f48ce592a9bb065cdf9fb33",
    name: "Meghalaya",

    text: "Meghalaya",
    path: [...Meghalaya],
  },
  {
    id: "5f48ce592a9bb065cdf9fb3d",
    name: "Tripura",
    text: "Tripura",
    path: [...Tripura],
  },
  {
    id: "5f48ce592a9bb065cdf9fb37",
    name: "Puducherry",
    text: "Puducherry",
    path: [...PuduCheery],
  },

  {
    id: "5f48ce592a9bb065cdf9fb2c",
    name: "Jharkhand",

    text: "Jharkhand",
    path: [...Jharkhand],
  },
  {
    id: "5f48ce592a9bb065cdf9fb24",
    name: "Chandigarh",

    text: "Chandigarh",
    path: [...Chandigarh],
  },
  {
    id: "5f48ce592a9bb065cdf9fb2a",
    name: "Himachal Pradesh",

    text: "Himachal Pradesh",
    path: [...HimachalPradesh],
  },

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
  {
    name: "Uttarakhand",
    id: "5f48ce592a9bb065cdf9fb3e",
    text: "Uttarakhand",
    path: [...Uttarakhand],
  },
  {
    name: "West Bengal",
    id: "5f48ce592a9bb065cdf9fb3b",
    text: "West Bengal",
    path: [],
  },
  {
    name: "Uttar Pradesh",
    id: "5f48ce592a9bb065cdf9fb3f",
    text: "Uttar Pradesh",
    path: [],
  },
  {
    name: "Ladakh",
    id: "5f48ce592a9bb065cdf9fb41",
    text: "Ladakh",
    path: [...Ladakh],
  },
  {
    id: "5f48ce592a9bb065cdf9fb42",
    name: "Dadra and Nagar Haveli and Daman and Diu",
    path: [...DadarAndNagarHaweli],
    text: "Dadra and Nagar Haveli and Daman and Diu",
  },
  {
    id: "5f48ce592a9bb065cdf9fb36",
    name: "Odisha",
    path: [],
    text: "Odisha",
  },
  {
    id: "5f48ce592a9bb065cdf9fb38",
    name: "Punjab",

    text: "Punjab",
    path: [...Punjab],
  },
];
