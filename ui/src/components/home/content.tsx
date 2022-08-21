import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Material design
import { Box } from "@mui/material";

// Types
import { IProduct } from "@/features/interfaces";
import ProductListSlider from "@/components/shares/ui/product-list-slider";
import PromotionsContent from "@/components/home/promotion-content";

interface IProps {
  electrics: IProduct[];
  books: IProduct[];
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Content({ electrics, books }: IProps) {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <Box>
      <ProductListSlider
        title={t("productSlider.title", {
          topic: locale === "th" ? "สินค้าเข้าใหม่" : "New arrival",
        })}
        products={electrics}
        moreProductLabel={t("productSlider.more")}
      />
      <ProductListSlider
        title={t("productSlider.title", {
          topic: locale === "th" ? "สินค้ายอดนิยม" : "Popular",
        })}
        products={books}
        moreProductLabel={t("productSlider.more")}
      />

      <PromotionsContent />
    </Box>
  );
}
