import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

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
import { ParsedUrlQuery } from "querystring";

interface IPagination {
  total: number;
  currentPage: number;
  minPrice: number;
  maxPrice: number;
  categoryId: number;
}

interface IQueryParams extends ParsedUrlQuery {
  keyword: string;
}

const initFilterData: IPagination = {
  total: 10,
  currentPage: 1,
  minPrice: 1,
  maxPrice: 200000,
  categoryId: 0,
};

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const Content = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(true);
  const [paginate, setPaginate] = useState<IPagination>(initFilterData);
  const { pagination } = useAppSelector((state) => state.product);
  const { t } = useTranslation("search");
  const { keyword: sKey } = router.query as IQueryParams;

  const fetchProducts = (limit: number, page?: number, categoryId?: number) => {
    const filter: IInputFilterProduct = {
      page: page ? page : paginate.currentPage,
      limit,
      searchKey: sKey ? sKey : "",
      categoryId: categoryId && categoryId !== 0 ? (categoryId as number) : 0,
      minPrice: paginate.minPrice,
      maxPrice: paginate.maxPrice,
    };

    dispatch(fetchProductsWithFilter(filter));
  };

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
    fetchProducts(10, page, paginate.categoryId);
  };

  const handleInputMinMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaginate({ ...paginate, [e.target.name]: Number(e.target.value) });
  };

  const handleOnChangeProductCategory = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    // console.log(event.target.value as string);
    fetchProducts(10, 1, parseInt(event.target.value));

    setPaginate({
      ...paginate,
      categoryId: parseInt(event.target.value),
      currentPage: 1,
    });
  };

  const handleSubmitFilterProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProducts(10, 1, paginate.categoryId);
  };

  //####################################################
  //                METHOD LIFE CYCLE
  //####################################################
  useEffect(() => {
    setPaginate(initFilterData);
    fetchProducts(10, 1, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sKey]);

  // Product not found
  if (pagination.products.length <= 0) {
    return (
      <ProductNotFound
        title={t("emptyProduct.title")}
        subtitle={t("emptyProduct.subtitle")}
      />
    );
  }

  return (
    <>
      <Box
        sx={{
          width: "95%",
          minHeight: "100vh",
          margin: "2rem",
        }}
      >
        {/************* Result of Product Count *************/}
        <TitleProductCount totalProduct={pagination.total} keyword={sKey} />

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
              categoryId={paginate.categoryId}
              handleSubmitFilterProduct={handleSubmitFilterProduct}
              handleInputMinMaxPriceChange={handleInputMinMaxPriceChange}
              handleOnChangeProductCategory={handleOnChangeProductCategory}
            />
          )}

          <ProductList
            products={pagination.products}
            total={pagination.total}
            favorite={favorite}
            currentPage={paginate.currentPage}
            visibleFilter={filter}
            handlePaginationChange={handlePaginationChange}
            handleIncreaseProductToCart={handleIncreaseProductToCart}
            handleToggleProductFavorite={handleToggleProductFavorite}
            handleNavigateToProductDetail={handleNavigateToProductDetail}
          />
        </Grid>
      </Box>
    </>
  );
};

export default Content;
