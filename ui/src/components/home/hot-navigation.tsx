//Styles
import styled from "@/assets/styles/hot-navigation.module.css";

// Services
import { ICategory, IProduct } from "@/features/types";
import {IHotCategoryNav, IHotProductNav} from '@/components/home/home-dummy-data'

interface IProps {
  categories: IHotCategoryNav[];
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const HotNavigation = ({ categories }: IProps) => {
  return (
    <div className={styled["hot-nav__container"]}>
      <ul className={styled["list-menu"]}>
        {categories.map((category) => (
          <li key={category.id} style={{ padding: "0 1.5rem" }}>
            <div>
              <span>{category.category_name}</span>
              <ProductListNav products={category.products} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface IProductNav {
  products: IHotProductNav[];
}

const ProductListNav = ({ products }: IProductNav) => {
  return products !== null && products !== [] ? (
    <ul className={styled["product-list__menu"]}>
      {products?.map((product) => (
        <li key={product.id} style={{ padding: "0 1.5rem" }}>
          {product.product_name}
        </li>
      ))}
    </ul>
  ) : (
    <div></div>
  );
};

export default HotNavigation;
