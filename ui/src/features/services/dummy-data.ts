import { IProduct } from "@/features/types";
import { StaticImageData } from "next/image";
import banner1 from "@/assets/images/banners/banner-1.jpg";
import banner2 from "@/assets/images/banners/banner-2.jpg";
import banner3 from "@/assets/images/banners/banner-3.jpg";
import banner4 from "@/assets/images/banners/banner-4.png";
import banner5 from "@/assets/images/banners/banner-5.jpg";
import banner6 from "@/assets/images/banners/banner-6.jpeg";
import banner7 from "@/assets/images/banners/banner-7.jpg";
import banner8 from "@/assets/images/banners/banner-8.jpg";
import banner9 from "@/assets/images/banners/banner-9.png";
import banner10 from "@/assets/images/banners/banner-10.jpg";

import product_1 from "@/assets/images/ex-products/multicar1.jpeg";
import product_2 from "@/assets/images/ex-products/multicar2.jpeg";
import product_3 from "@/assets/images/ex-products/multicar3.jpeg";
import product_4 from "@/assets/images/ex-products/multicar4.jpeg";
import product_5 from "@/assets/images/ex-products/multicar5.jpeg";
import product_6 from "@/assets/images/ex-products/multicar6.jpeg";
import product_7 from "@/assets/images/ex-products/multicar7.jpeg";
import product_8 from "@/assets/images/ex-products/multicar8.jpeg";
import product_9 from "@/assets/images/ex-products/multicar9.jpeg";
import product_10 from "@/assets/images/ex-products/multicar10.jpeg";
import product_11 from "@/assets/images/ex-products/multicar11.jpeg";

export const cmlProducts: Partial<IProduct>[] = [
  {
    product_name: "E-book",
    description: "You can read the book for every where",
    unit_price: 1200,
    image_url:
      "https://images.unsplash.com/photo-1623276527153-fa38c1616b05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
  },
  {
    product_name: "IT Solutions",
    description: "You can read the book for every where",
    unit_price: 155000,
    image_url:
      "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    product_name: "Embedded System",
    description: "You can read the book for every where",
    unit_price: 95000,
    image_url:
      "https://images.unsplash.com/photo-1634452015397-ad0686a2ae2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80",
  },
  {
    product_name: "Graphic Design",
    description: "You can read the book for every where",
    unit_price: 76500,
    image_url:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
  },
  {
    product_name: "Food Shop",
    description: "You can read the book for every where",
    unit_price: 570,
    image_url:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
  },
  {
    product_name: "Smart Farm",
    description: "You can read the book for every where",
    unit_price: 56000,
    image_url:
      "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    product_name: "Garage",
    description: "You can read the book for every where",
    unit_price: 35000,
    image_url:
      "https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];

export interface IDummyData {
  id: number;
  product_name: string;
  description?: string;
  image: string | StaticImageData;
}

export const dummyBanner: IDummyData[] = [
  {
    id: 1,
    product_name: "dummy 1",
    image: banner1,
  },
  {
    id: 2,
    product_name: "dummy 2",
    image: banner2,
  },
  {
    id: 3,
    product_name: "dummy 3",
    image: banner3,
  },
  {
    id: 4,
    product_name: "dummy 4",
    image: banner4,
  },
  {
    id: 5,
    product_name: "dummy 5",
    image: banner5,
  },
  {
    id: 6,
    product_name: "dummy 6",
    image: banner6,
  },
  {
    id: 7,
    product_name: "dummy 7",
    image: banner7,
  },
  {
    id: 8,
    product_name: "dummy 8",
    image: banner8,
  },
  {
    id: 9,
    product_name: "dummy 9",
    image: banner9,
  },
  {
    id: 10,
    product_name: "dummy 10",
    image: banner10,
  },
];

export const dummyProducts: IDummyData[] = [
  {
    id: 1,
    product_name: "dummy 1",
    image: product_1,
  },
  {
    id: 2,
    product_name: "dummy 2",
    image: product_2,
  },
  {
    id: 3,
    product_name: "dummy 3",
    image: product_3,
  },
  {
    id: 4,
    product_name: "dummy 4",
    image: product_4,
  },
  {
    id: 5,
    product_name: "dummy 5",
    image: product_5,
  },
  {
    id: 6,
    product_name: "dummy 6",
    image: product_6,
  },
  {
    id: 7,
    product_name: "dummy 7",
    image: product_7,
  },
  {
    id: 8,
    product_name: "dummy 8",
    image: product_8,
  },
  {
    id: 9,
    product_name: "dummy 9",
    image: product_9,
  },
  {
    id: 10,
    product_name: "dummy 10",
    image: product_10,
  },
  {
    id: 11,
    product_name: "dummy 11",
    image: product_11,
  },
];
