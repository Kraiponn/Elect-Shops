import React, { useEffect, useState } from "react";

// Material Design
import { Box, Tab, Tabs } from "@mui/material";

// Components
import TabPanel from "@/components/dashboard/shares/tab-panel";
import CategoryList from "@/components/dashboard/content/management/categories/list";
import CreateCategory from "@/components/dashboard/content/management/categories/create";
import EditCategory from "@/components/dashboard/content/management/categories/edit";

interface ITab {
  tabIndex: number;
  cId: number;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Category() {
  const [tabObj, setTabObj] = useState<ITab>({
    tabIndex: 0,
    cId: 0,
  });

  const handleTabChange = (
    _: React.SyntheticEvent<Element, Event>,
    index: number
  ) => {
    setTabObj({ ...tabObj, tabIndex: index });
  };

  const onSelectTabIndex = (tIndex: number, catId: number) => {
    setTabObj({ cId: catId, tabIndex: tIndex });
  };

  //############################################################
  //                   Life cycle method
  //############################################################
  useEffect(() => {}, []);

  return (
    <>
      <Box sx={{ width: "100%", padding: "1rem" }}>
        <Tabs
          value={tabObj.tabIndex}
          onChange={handleTabChange}
          aria-label="category tab menu"
          sx={{
            marginTop: "0.5rem",
            ".category-tab": {
              fontFamily: "Prompt",
              fontWeight: 700,
              fontSize: "1.1rem",
            },
          }}
        >
          <Tab
            className="category-tab"
            label={`List`}
            id={`category-tab-${0}`}
          />
          <Tab
            className="category-tab"
            label={`Create`}
            id={`category-tab-${1}`}
          />
          <Tab
            className="category-tab"
            label={`Update`}
            id={`category-tab-${2}`}
          />
        </Tabs>

        <TabPanel value={tabObj.tabIndex} index={0}>
          <CategoryList onSelectTabIndex={onSelectTabIndex} />
        </TabPanel>

        <TabPanel value={tabObj.tabIndex} index={1}>
          <CreateCategory onSelectTabIndex={onSelectTabIndex} />
        </TabPanel>

        <TabPanel value={tabObj.tabIndex} index={2}>
          <EditCategory
            categoryId={tabObj.cId}
            onSelectTabIndex={onSelectTabIndex}
          />
        </TabPanel>
      </Box>
    </>
  );
}
