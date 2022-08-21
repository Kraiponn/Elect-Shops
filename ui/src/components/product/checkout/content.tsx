// Material components & Icons
import { Box, Grid } from "@mui/material";

// Components
import ContentList from "@/components/product/checkout/content-list";
import Summary from "@/components/product/checkout/summay";

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
export default function Content() {
  return (
    <Box sx={{ width: "85%", mt: "5rem", mx: "auto" }}>
      <Grid container>
        <ContentList />
        <Summary />
      </Grid>
    </Box>
  );
}
