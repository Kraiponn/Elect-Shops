import { Box, IconButton, keyframes } from "@mui/material";

/*******************************************************
 *                    ANIMATIONS                       *
 ******************************************************/
const animateOpenMobileMenu = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.55;
    transform: translateX(10%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    left: 0;
  }
`;

const animateClosedMobileMenu = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
    transform: translateX(10%);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
    left: -100%;
  }
`;

const animateClosedMobileButtonMenu = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.55;
    transform: scale(1.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

/*******************************************************
 *                      STYLES                         *
 ******************************************************/
const backDropStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: 1500,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.89)",
};

const openContentMobileMenuStyle = {
  position: "absolute",
  top: "0",
  left: "-100%",
  zIndex: 1501,
  width: "45%",
  height: "100vh",
  background: "rgba(255, 255, 255, 1)",
  color: "black",
  boxShadow: "0 0.1rem 0.2rem inherit",
  // p: 1,

  opacity: 0,
  animation: `${animateOpenMobileMenu} .45s forwards ease-out`,
};

const closeContentMobileMenuStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1501,
  width: "45%",
  height: "100vh",
  background: "rgba(255, 255, 255, 1)",
  color: "black",
  boxShadow: "0 0.1rem 0.2rem black",
  // p: 1,

  opacity: 1,
  animation: `${animateClosedMobileMenu} 0.55s forwards ease-out`,
};

const closeMobileButtonMenuStyle = {
  position: "absolute",
  top: "2%",
  left: "105%",
  opacity: 0,
  transform: "scale(0)",
  animation: `${animateClosedMobileButtonMenu} 0.3s 0.55s linear forwards`,
  background: "rgba(255, 255, 255, 1)",

  "&:hover": {
    background: "rgba(255, 255, 255, 0.5)",
  },
};

export {
  animateOpenMobileMenu,
  animateClosedMobileButtonMenu,
  backDropStyle,
  openContentMobileMenuStyle,
  closeContentMobileMenuStyle,
  closeMobileButtonMenuStyle,
};
