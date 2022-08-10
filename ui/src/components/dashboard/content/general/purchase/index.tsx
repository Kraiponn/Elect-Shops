import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Typography, Box, Tabs, Tab } from "@mui/material";

// Components
import TabPanel from "@/components/dashboard/shares/tab-panel";
import AllOrders from "@/components/dashboard/content/general/purchase/all-orders";
import ToPay from "@/components/dashboard/content/general/purchase/to-pay";
import ToShipping from "@/components/dashboard/content/general/purchase/to-ship";
import ToReceive from "@/components/dashboard/content/general/purchase/to-receive";
import OrderCompleted from "@/components/dashboard/content/general/purchase/order-completed";
import OrderCancelled from "@/components/dashboard/content/general/purchase/order-cancelled";
import NotificationSettings from "@/components/dashboard/content/general/notification/list-item";

/*******************************************************************************
 *                           Constant and Types                                *
 ******************************************************************************/
import { clGray50 } from "@/features/const/colors";

interface IProps {
  darkMode: boolean;
}

interface IProfileMenu {
  tabNo: number;
}

const TRANSLATE_KEY = "content.generalMenu.purchase";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Purchase({ darkMode }: IProps) {
  const [tabNo, setTapNo] = useState<IProfileMenu>({
    tabNo: 0,
  });
  const { t } = useTranslation("dashboard");

  const handleChange = (_: React.SyntheticEvent, index: number) => {
    setTapNo({ ...tabNo, tabNo: index });
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: darkMode ? clGray50 : "#010101a6" }}
      >
        {t(`${TRANSLATE_KEY}.title`)}
      </Typography>

      {/* <NotificationSettings darkMode={darkMode} /> */}

      <Box>
        <Tabs
          value={tabNo.tabNo}
          onChange={handleChange}
          aria-label="purchase tab menu"
          sx={{
            marginTop: "1rem",
            ".purchase-tab": {
              fontFamily: "Prompt",
              fontWeight: 500,
              fontSize: "1.1rem",
            },
          }}
        >
          <Tab
            className="purchase-tab"
            label={t(`${TRANSLATE_KEY}.tap.all`)}
            id={`purchase-tab-${0}`}
          />
          <Tab
            className="purchase-tab"
            label={t(`${TRANSLATE_KEY}.tap.toPay`)}
            id={`purchase-tab-${1}`}
          />
          <Tab
            className="purchase-tab"
            label={t(`${TRANSLATE_KEY}.tap.toShip`)}
            id={`purchase-tab-${2}`}
          />
          <Tab
            className="purchase-tab"
            label={t(`${TRANSLATE_KEY}.tap.toReceive`)}
            id={`purchase-tab-${3}`}
          />
          <Tab
            className="purchase-tab"
            label={t(`${TRANSLATE_KEY}.tap.completed`)}
            id={`purchase-tab-${4}`}
          />
          <Tab
            className="purchase-tab"
            label={t(`${TRANSLATE_KEY}.tap.cancelled`)}
            id={`purchase-tab-${5}`}
          />
        </Tabs>

        <TabPanel value={tabNo.tabNo} index={0}>
          <AllOrders darkMode={darkMode} />
        </TabPanel>

        <TabPanel value={tabNo.tabNo} index={1}>
          <ToPay darkMode={darkMode} />
        </TabPanel>

        <TabPanel value={tabNo.tabNo} index={2}>
          <ToShipping darkMode={darkMode} />
        </TabPanel>

        <TabPanel value={tabNo.tabNo} index={3}>
          <ToReceive darkMode={darkMode} />
        </TabPanel>

        <TabPanel value={tabNo.tabNo} index={4}>
          <OrderCompleted darkMode={darkMode} />
        </TabPanel>

        <TabPanel value={tabNo.tabNo} index={5}>
          <OrderCancelled darkMode={darkMode} />
        </TabPanel>
      </Box>
    </Box>
  );
}
