// Material Design
import { Grid, Typography } from "@mui/material";

// Components
import NotifyItem from "@/components/dashboard/content/general/notification/item";

interface IProps {
  darkMode: boolean;
  listItemType: "EMAIL" | "PHONE";
  title: string;
  subtitle1: string;
  description1: string;
  subtitle2?: string;
  description2?: string;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function NotifyListItemType({
  darkMode,
  listItemType,
  title,
  subtitle1,
  description1,
  subtitle2,
  description2,
}: IProps) {
  return (
    <Grid
      container
      sx={{
        pb: listItemType === "EMAIL" ? "1rem" : 0,
        mt: listItemType !== "EMAIL" ? "2rem" : 0,
        mb: listItemType === "EMAIL" ? "1rem" : 0,
        borderBottom:
          listItemType === "EMAIL"
            ? darkMode
              ? "1px solid #f0eded21"
              : "1px solid #01010122"
            : null,
      }}
    >
      <Grid item xs={12} lg={4}>
        <Typography variant="h4">{title}</Typography>
      </Grid>

      <Grid item xs={12} lg={8}>
        <Grid container>
          <NotifyItem
            title={subtitle1}
            description={description1}
            bottomDivider={listItemType === "EMAIL" ? true : false}
            darkMode={darkMode}
          />

          {listItemType === "EMAIL" && (
            <NotifyItem
              title={subtitle2!!}
              description={description2!!}
              bottomDivider={false}
              darkMode={darkMode}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
