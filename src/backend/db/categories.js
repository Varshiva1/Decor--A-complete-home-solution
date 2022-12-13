import { v4 as uuid } from "uuid";
/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Glass Decor",
    image:"https://res.cloudinary.com/dgomw715r/image/upload/v1655137154/ProjectImages/living-room_spfgxn.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Lights Decor",
    image:"https://res.cloudinary.com/dgomw715r/image/upload/v1655137154/ProjectImages/dining-room_ttczqa.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Wall Decor",
    image:"https://res.cloudinary.com/dgomw715r/image/upload/v1655217833/ProjectImages/511k0RljK9L_b9uycx.jpg",
   
  },
];
