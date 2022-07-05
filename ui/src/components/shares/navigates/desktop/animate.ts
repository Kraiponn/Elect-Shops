import { keyframes } from "@mui/material";

const dropDownMenuAnimate = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
    transform: scaleX(0.5);
  }
  75% {
    opacity: 0.75;
    transform: scaleX(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export { dropDownMenuAnimate };
