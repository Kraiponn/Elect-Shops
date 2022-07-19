// Material design
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { CustomArrowProps } from "react-slick";

export const NextButton = ({ className, onClick }: CustomArrowProps) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon
        sx={{
          color: "inherit",
          fontSize: "1.5rem",
          "& :hover": {
            color: "inherit",
          },
        }}
      />
    </div>
  );
};

export const PreviousButton = ({ className, onClick }: CustomArrowProps) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon
        sx={{
          color: "inherit",
          fontSize: "1.5rem",
          "& :hover": {
            color: "inherit",
          },
        }}
      />
    </div>
  );
};

export const NextCircleButton = ({ className, onClick }: CustomArrowProps) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowCircleRightIcon
        sx={{
          color: "black",
          fontSize: "4rem",
          "& :hover": {
            color: "gray",
          },
        }}
      />
    </div>
  );
};

export const PreviousCircleButton = ({
  className,
  onClick,
}: CustomArrowProps) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowCircleLeftIcon
        sx={{
          color: "black",
          fontSize: "4rem",
          "& :hover": {
            color: "gray",
          },
        }}
      />
    </div>
  );
};
