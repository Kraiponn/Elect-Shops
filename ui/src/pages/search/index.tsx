import React from "react";

// Material design
import { Box, Toolbar } from "@mui/material";

// Services & Global state
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { fetchProducts } from "@/features/global-state/reducers/product";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import MyDialog from "@/components/shares/loader/my-dialog";

/***********************************************
 *               MAIN METHOD
 **********************************************/
const SearchPage = () => {
  //   const router = useRouter();
  //   const matches = useMediaQuery("(min-width:845px)");
  //   const { isLoading, isSuccess, isError } = useAppSelector(
  //     (state) => state.product
  //   );

  const handleToggleLoadingState = () => {
    //
  };

  return (
    <DefautLayout title="search product" description="welcome to shoping">
      {/* <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={handleToggleLoadingState}
      /> */}
      <Toolbar />
    </DefautLayout>
  );
};

export default SearchPage;
