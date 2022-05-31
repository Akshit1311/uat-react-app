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
import AndraPradesh from "./andhrapradesh.json";
import AndmanNichobarIsland from "./andmanAndNichobar.json";
import ArunachalPradesh from "./arunachalPradesh.json";
import Assam from "./assam.json";
import Bihar from "./bihar.json";
import Chattisgarh from "./chattisgarh.json";
import Gujrat from "./gujarat.json";
import Haryana from "./haryana.json";
import JammuKashmir from "./jammuAndKashmir.json";
import Lakshdweep from "./lakshdweep.json";
import MadhyaPradesh from "./madhyaPradesh.json";
import Orisha from "./orisha.json";
import Sikkim from "./sikkim.json";
import Telengana from "./telangana.json";
import UttarPradesh from "./uttarpradesh.json";
import WestBengal from "./westBengal.json";

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

export const StatesDistrictView: StateWiseMapViewType[] = [
  {
    id: "5f48ce592a9bb065cdf9fb40",
    name: "West Bengal",
    text: "West Bengal",
    path: [...WestBengal],
  },
  {
    id: "5f48ce592a9bb065cdf9fb3c",
    name: "Telangana",
    text: "Telangana",
    path: [...Telengana],
  },
  {
    id: "5f48ce592a9bb065cdf9fb3a",
    name: "Sikkim",
    text: "Sikkim",
    path: [...Sikkim],
  },
  {
    id: "5f48ce592a9bb065cdf9fb30",
    name: "Madhya Pradesh",
    text: "Madhya Pradesh",
    path: [...MadhyaPradesh],
  },
  {
    id: "5f48ce592a9bb065cdf9fb2f",
    name: "Lakshadweep",
    text: "Lakshadweep",
    path: [...Lakshdweep],
  },
  {
    id: "5f48ce592a9bb065cdf9fb2b",
    name: "Jammu and Kashmir",
    text: "Jammu and Kashmir",
    path: [...JammuKashmir],
  },
  {
    id: "5f48ce592a9bb065cdf9fb29",
    name: "Haryana",
    text: "Haryana",
    path: [...Haryana],
  },
  {
    id: "5f48ce592a9bb065cdf9fb28",
    name: "Gujarat",
    text: "Gujarat",
    path: [...Gujrat],
  },
  {
    id: "5f48ce592a9bb065cdf9fb25",
    name: "Chhattisgarh",
    text: "Chhattisgarh",
    path: [...Chattisgarh],
  },
  {
    id: "5f48ce592a9bb065cdf9fb23",
    name: "Bihar",
    text: "Bihar",
    path: [...Bihar],
  },
  {
    id: "5f48ce592a9bb065cdf9fb22",
    name: "Assam",
    text: "Assam",
    path: [...Assam],
  },
  {
    id: "5f48ce592a9bb065cdf9fb21",
    name: "Arunachal Pradesh",
    text: "Arunachal Pradesh",
    path: [...ArunachalPradesh],
  },
  {
    id: "5f48ce592a9bb065cdf9fb1f",
    name: "Andaman and Nicobar Islands",
    text: "Andaman and Nicobar Islands",
    path: [...AndmanNichobarIsland],
  },
  {
    id: "5f48ce592a9bb065cdf9fb20",
    name: "Andhra Pradesh",
    text: "Andhra Pradesh",
    path: [...AndraPradesh],
  },
  {
    id: "5f48ce592a9bb065cdf9fb35",
    name: "Nagaland",
    text: "Nagaland",
    path: [...NagaLand],
  },
  // {
  //   id: "5f48ce592a9bb065cdf9fb34",
  //   name: "Mizoram",
  //   text: "Mizoram",
  //   path: [...Mizoram],
  // },
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
    path: [...UttarPradesh],
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
    path: [...Orisha],
    text: "Odisha",
  },
  {
    id: "5f48ce592a9bb065cdf9fb38",
    name: "Punjab",

    text: "Punjab",
    path: [...Punjab],
  },
];
