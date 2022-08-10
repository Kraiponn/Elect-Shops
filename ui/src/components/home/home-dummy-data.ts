import primaryActivity1 from "@/assets/images/promotion/activity-1.jpg";
import primaryActivity2 from "@/assets/images/promotion/activity-2.jpg";
import primaryActivity3 from "@/assets/images/promotion/activity-3.jpg";
import primaryActivity4 from "@/assets/images/promotion/promotion-8.jpg";
import primaryActivity5 from "@/assets/images/promotion/promotion-9.jpg";

import secondaryActivity1 from "@/assets/images/promotion/promotion-3.jpg";
import secondaryActivity2 from "@/assets/images/promotion/promotion-4.jpg";
import { StaticImageData } from "next/image";
import { ICategory } from "@/features/interfaces";
import { date } from "yup";

export interface IActivity {
  id: number;
  image: StaticImageData;
  description: string;
}

export interface IHotProductNav {
  id: number;
  product_name: string;
}

export interface IHotCategoryNav {
  id: number;
  category_name: string;
  products: IHotProductNav[];
}

const hotNavigationData: IHotCategoryNav[] = [
  {
    id: 1,
    category_name: "Food",
    products: [
      {
        id: 1,
        product_name: "Fast foods",
      },
      {
        id: 2,
        product_name: "Bakery",
      },
      {
        id: 3,
        product_name: "Thai foods",
      },
      {
        id: 4,
        product_name: "Fruit",
      },
      {
        id: 5,
        product_name: "Drink",
      },
    ],
  },
  {
    id: 2,
    category_name: "Electric",
    products: [
      {
        id: 1,
        product_name: "Computer",
      },
      {
        id: 2,
        product_name: "Smart Phone",
      },
      {
        id: 3,
        product_name: "Home Electric",
      },
      {
        id: 4,
        product_name: "Music",
      },
      {
        id: 5,
        product_name: "Toy",
      },
    ],
  },
  {
    id: 3,
    category_name: "Book",
    products: [
      {
        id: 1,
        product_name: "Web Application",
      },
      {
        id: 2,
        product_name: "Mobile",
      },
      {
        id: 3,
        product_name: "Graphic",
      },
      {
        id: 4,
        product_name: "Embedded System",
      },
      {
        id: 5,
        product_name: "Business",
      },
      {
        id: 6,
        product_name: "Magazine",
      },
    ],
  },
  {
    id: 4,
    category_name: "Furniture",
    products: [
      {
        id: 1,
        product_name: "Chair",
      },
      {
        id: 2,
        product_name: "Furniture",
      },
      {
        id: 3,
        product_name: "Table",
      },
      {
        id: 4,
        product_name: "Sofa",
      },
      {
        id: 5,
        product_name: "Kitchen",
      },
    ],
  },
  {
    id: 5,
    category_name: "Musical Instrument",
    products: [
      {
        id: 1,
        product_name: "Piano",
      },
      {
        id: 2,
        product_name: "Guitar",
      },
      {
        id: 3,
        product_name: "Bass",
      },
      {
        id: 4,
        product_name: "Saxophone",
      },
      {
        id: 5,
        product_name: "Drum",
      },
    ],
  },
];

const primaryActivityData: IActivity[] = [
  {
    id: 1,
    image: primaryActivity1,
    description: "activity 1",
  },
  {
    id: 2,
    image: primaryActivity2,
    description: "activity 2",
  },
  {
    id: 3,
    image: primaryActivity3,
    description: "activity 3",
  },
  {
    id: 4,
    image: primaryActivity4,
    description: "activity 4",
  },
  {
    id: 5,
    image: primaryActivity5,
    description: "activity 5",
  },
];

const secondaryActivityData: IActivity[] = [
  {
    id: 1,
    image: secondaryActivity1,
    description: "activity 1",
  },
  {
    id: 2,
    image: secondaryActivity2,
    description: "activity 2",
  },
];

export { primaryActivityData, secondaryActivityData, hotNavigationData };
