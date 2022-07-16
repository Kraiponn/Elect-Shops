// Material design
import { Box, Typography } from "@mui/material";
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";

interface IProps {
  title: string;
  value: number;
  fontWeight: number;
  fontSize?: string;
  marginTop: string;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const TextHorizontal = ({
  title,
  value,
  fontWeight,
  fontSize,
  marginTop,
}: IProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: marginTop,
      }}
    >
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontFamily: "PromptMedium",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: fontSize ? fontSize : "1.2rem",
          fontFamily: "PromptMedium",
          fontWeight: fontWeight,
        }}
      >
        {`${ThaiCurrencyFormatWithBuildIn(value)}`}
      </Typography>
    </Box>
  );
};

export default TextHorizontal;
