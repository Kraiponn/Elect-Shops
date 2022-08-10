import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  increaseProductToCart,
  fetchProductsWithFilter,
} from "@/features/global-state/reducers/product";
import { IInputFilterProduct, IProduct } from "@/features/interfaces";

// Material Design
import { Box, Grid } from "@mui/material";

// Components
import ProductNotFound from "@/components/search/product-notfound";
import TitleProductCount from "@/components/search/title-product-count";
import FilterButton from "@/components/search/filter-button";
import FilterProduct from "@/components/search/filter-product";
import ProductList from "@/components/search/product-list";

interface IPagination {
  total: number;
  currentPage: number;
  minPrice: number;
  maxPrice: number;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const Content = () => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(true);
  const [paginate, setPaginate] = useState<IPagination>({
    total: 10,
    currentPage: 1,
    minPrice: 1,
    maxPrice: 200000,
  });
  const dispatch = useAppDispatch();
  const { pagination, keyword } = useAppSelector((state) => state.product);
  const router = useRouter();

  const handleToggleProductFavorite = () => {
    setFavorite(!favorite);
  };

  const handleToggleShowFilterResule = () => {
    setFilter(!filter);
  };

  const handleIncreaseProductToCart = (product: IProduct) => {
    dispatch(increaseProductToCart(product));
  };

  const handleNavigateToProductDetail = (product: IProduct) => {
    router.push({
      pathname: "/products/[productId]",
      query: { productId: product.id },
    });
  };

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    page: number
  ) => {
    setPaginate({ ...paginate, currentPage: page });

    const filter: IInputFilterProduct = {
      page,
      limit: 10,
      minPrice: paginate.minPrice,
      maxPrice: paginate.maxPrice,
      searchKey: "",
    };
    dispatch(fetchProductsWithFilter(filter));
  };

  const handleInputMinMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaginate({ ...paginate, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmitFilterProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filter: IInputFilterProduct = {
      page: paginate.currentPage,
      limit: 10,
      minPrice: paginate.minPrice,
      maxPrice: paginate.maxPrice,
      searchKey: "",
    };
    // console.log("Submit..", filter);

    dispatch(fetchProductsWithFilter(filter));
  };

  // Product not found
  if (pagination.products.length <= 0) {
    return <ProductNotFound />;
  }

  return (
    <Box
      sx={{
        width: "95%",
        minHeight: "100vh",
        margin: "2rem",
      }}
    >
      {/************* Result of Product Count *************/}
      <TitleProductCount totalProduct={pagination.total} keyword={keyword} />

      {/************* Filter Button *************/}
      <FilterButton
        totalProduct={pagination.total}
        handleToggleShowFilterResule={handleToggleShowFilterResule}
      />

      <Grid container>
        {!filter ? null : (
          <FilterProduct
            minPrice={paginate.minPrice}
            maxPrice={paginate.maxPrice}
            handleSubmitFilterProduct={handleSubmitFilterProduct}
            handleInputMinMaxPriceChange={handleInputMinMaxPriceChange}
          />
        )}

        <ProductList
          products={pagination.products}
          total={pagination.total}
          favorite={favorite}
          currentPage={paginate.currentPage}
          handlePaginationChange={handlePaginationChange}
          handleIncreaseProductToCart={handleIncreaseProductToCart}
          handleToggleProductFavorite={handleToggleProductFavorite}
          handleNavigateToProductDetail={handleNavigateToProductDetail}
        />
      </Grid>
    </Box>
  );
};

export default Content;
