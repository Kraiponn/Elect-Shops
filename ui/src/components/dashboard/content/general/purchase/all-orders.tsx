import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box } from "@mui/material";

// Color system
import { clDarkMedium } from "@/features/const/colors";

// Components
import EmptyOrders from "@/components/dashboard/content/general/purchase/empty-orders";

interface IProps {
  darkMode: boolean;
}

const TRANSLATE_KEY = "content.generalMenu.purchase";
const isOrders = false;

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function AllOrders({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <>
      {!isOrders ? (
        <EmptyOrders darkMode={darkMode} />
      ) : (
        <Box
          sx={{
            width: "100%",
            padding: "2.5rem",
            marginTop: "2rem",
            boxShadow: "0 0 5px rgba(1, 1, 1, 0.114)",
            borderRadius: "0.5rem",
            background: darkMode ? clDarkMedium : "rgb(255, 255, 255)",
          }}
        ></Box>
      )}
    </>
  );
}
