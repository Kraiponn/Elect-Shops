import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Components
import ProductSlider from "@/components/shares/ui/product-list-slider";
import { IProduct } from "@/features/interfaces";

interface IProps {
  products: IProduct[];
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const RecommendProduct = ({ products }: IProps) => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <ProductSlider
      title={
        locale === "th" ? "คุณอาจชอบสินค้าเหล่านี้" : `You might also like`
      }
      moreProductLabel={t("productSlider.more")}
      titleFontSize="1.5rem"
      products={products}
    />
  );
};

export default RecommendProduct;
