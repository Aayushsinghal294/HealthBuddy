import logo from "./logo.png";
import dropdown from "./dropdown.png";
import profpic from "./aayush.jpg";
import h1 from "./h1.png";
import arrow from "./arrow.png";
import docicon from "./docicon.png";
import virus from "./coronavirus.png";
import heartattack from "./heart-disease.png";
import lungs from "./lungs.png";
import rash from "./rash.png";
import flu from "./transmission.png";
import sunstroke from "./ventilation.png";
import h00 from "./h00.png";
import h11 from "./h11.png";
import h22 from "./h22.png";
import h33 from "./h33.png";
import h44 from "./h44.png";
import h55 from "./h55.png";
import h66 from "./h66.png";
import h77 from "./h77.png";
import h88 from "./h88.png";
import h99 from "./h99.png";

export const assets = {
  logo,
  profpic,
  dropdown,
  h1,
  arrow,
  docicon,
};

export const diseasedata = [
  {
    disease: "Viral Disease",
    image: virus,
  },
  {
    disease: "Heart Problem",
    image: heartattack,
  },
  {
    disease: "Respitory Disease",
    image: lungs,
  },
  {
    disease: "Skin Diseases",
    image: rash,
  },
  {
    disease: "Common Cold",
    image: flu,
  },
  {
    disease: "Sun-Stroke",
    image: sunstroke,
  },
];

export const hospitals = [
  {
    _id: "H0",
    name: "NSCB Medical College, Jabalpur",
    image: h00,
    disease: "Sun-Stroke",
    queue: "5",
    travel: "10",
    rating: "4.5",
  },
  {
    _id: "H1",
    name: "Marbel City Hospital, Jabalpur",
    image: h11,
    disease: "Common Cold",
    queue: "7",
    travel: "15",
    rating: "4.2",
  },
  {
    _id: "H2",
    name: "Sarvodhya Hospital, Jabalpur",
    image: h22,
    disease: "Respiratory Disease",
    queue: "8",
    travel: "20",
    rating: "4.0",
  },
  {
    _id: "H3",
    name: "Jaamdar Hospital, Jabalpur",
    image: h33,
    disease: "Skin Diseases",
    queue: "6",
    travel: "15",
    rating: "4.3",
  },
  {
    _id: "H4",
    name: "Infinity Heart Hospital, Jabalpur",
    image: h44,
    disease: "Heart Problem",
    queue: "5",
    travel: "10",
    rating: "4.5",
  },
  {
    _id: "H5",
    name: "Silver Oak Hospital, Jabalpur",
    image: h55,
    disease: "Viral Disease",
    queue: "7",
    travel: "15",
    rating: "4.2",
  },
  {
    _id: "H6",
    name: "Jan jyoti super speciality hospital, Jabalpur",
    image: h66,
    disease: "Respiratory Disease",
    queue: "8",
    travel: "20",
    rating: "4.0",
  },
  {
    _id: "H7",
    name: "Ashish Hospital, Jabalpur",
    image: h77,
    disease: "Skin Diseases",
    queue: "6",
    travel: "10",
    rating: "4.3",
  },
  {
    _id: "H8",
    name: "Best Super Speciality Hospital, Jabalpur",
    image: h88,
    disease: "Heart Problem",
    queue: "5",
    travel: "10",
    rating: "4.5",
  },
  {
    _id: "H9",
    name: "Anant Institute of Medical Science, Jabalpur",
    image: h99,
    disease: "Viral Disease",
    queue: "7",
    travel: "15",
    rating: "4.2",
  },
];
