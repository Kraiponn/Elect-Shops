import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// Material design
import { Box, Grid, IconButton, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";

import {
  googlePlay,
  appleStore,
  qrCode,
} from "@/components/shares/footer/dummy-logo";

/***********************************************************************************
 *                         MAIN FUNCTION - CLIENT SIDE                             *
 **********************************************************************************/
const Footer: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <Box className="footer--container">
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontSize: "1.1rem", mt: 3 }}>
            {t("footer.service.title")}
          </Typography>
          <ul className="footer__service">
            <li>
              <Link href="#" passHref>
                <a>{t("footer.service.helpCentre")}</a>
              </Link>
            </li>
            <li>
              <Link href="#" passHref>
                <a>{t("footer.service.howToBuy")}</a>
              </Link>
            </li>
            <li>
              <Link href="#" passHref>
                <a>{t("footer.service.howToSell")}</a>
              </Link>
            </li>
            <li>
              <Link href="#" passHref>
                <a>{t("footer.service.paymentMethod")}</a>
              </Link>
            </li>
            <li>
              <Link href="#" passHref>
                <a>{t("footer.service.shippingDelivery")}</a>
              </Link>
            </li>
            <li>
              <Link href="#" passHref>
                <a>{t("footer.service.return&Refund")}</a>
              </Link>
            </li>
            <li>
              <Link href="#" passHref>
                <a>{t("footer.service.contactUs")}</a>
              </Link>
            </li>
          </ul>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontSize: "1.1rem", mt: 2 }}>
            {t("footer.about.title")}
          </Typography>
          <ul className="footer__service">
            <li>
              <Link href="#" passHref>
                <a>{t("footer.about.policy")}</a>
              </Link>
            </li>
            <li>
              <Link href="#" passHref>
                <a>{t("footer.about.blog")}</a>
              </Link>
            </li>
            <li>
              <Link href="#" passHref>
                <a>{t("footer.about.sellerCentre")}</a>
              </Link>
            </li>
          </ul>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontSize: "1.1rem", mt: 2 }}>
            {t("footer.followUs.title")}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginTop: "0.45rem",
            }}
          >
            <IconButton
              color="inherit"
              sx={{
                "&:hover": { color: "rgba(255, 255, 255, 0.534)" },
              }}
            >
              <GoogleIcon color="inherit" />
              <Typography sx={{ marginLeft: "0.5rem", fontSize: "1rem" }}>
                {t("footer.followUs.google")}
              </Typography>
            </IconButton>

            <IconButton
              color="inherit"
              sx={{ "&:hover": { color: "rgba(255, 255, 255, 0.534)" } }}
            >
              <FacebookIcon color="inherit" />
              <Typography sx={{ marginLeft: "0.5rem", fontSize: "1rem" }}>
                {t("footer.followUs.facebook")}
              </Typography>
            </IconButton>

            <IconButton
              color="inherit"
              sx={{ "&:hover": { color: "rgba(255, 255, 255, 0.534)" } }}
            >
              <InstagramIcon color="inherit" />
              <Typography sx={{ marginLeft: "0.5rem", fontSize: "1rem" }}>
                {t("footer.followUs.instagram")}
              </Typography>
            </IconButton>

            <IconButton
              color="inherit"
              sx={{ "&:hover": { color: "rgba(255, 255, 255, 0.534)" } }}
            >
              <YouTubeIcon color="inherit" />
              <Typography sx={{ marginLeft: "0.5rem", fontSize: "1rem" }}>
                {t("footer.followUs.youtube")}
              </Typography>
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontSize: "1.1rem", mt: 2 }}>
            {t("footer.downloadApp.title")}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ position: "relative", width: "5rem", height: "5rem" }}>
                <Image
                  src={qrCode}
                  alt="our app "
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "2rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 0,
                  color: "white",
                  "&:hover": {
                    color: "rgba(255, 255, 255, 0.534)",
                    cursor: "pointer",
                  },
                }}
              >
                <Box
                  sx={{ position: "relative", width: "20px", height: "20px" }}
                >
                  <Image
                    src={appleStore}
                    alt="apple store"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
                <Typography
                  sx={{
                    marginLeft: "0.5rem",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  {t("footer.downloadApp.appleStore")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 0,
                  // marginLeft: "1rem",
                  marginTop: "1rem",
                  color: "white",
                  "&:hover": {
                    color: "rgba(255, 255, 255, 0.534)",
                    cursor: "pointer",
                  },
                }}
              >
                <Box
                  sx={{ position: "relative", width: "20px", height: "20px" }}
                >
                  <Image
                    src={googlePlay}
                    alt="google store"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
                <Typography
                  sx={{
                    marginLeft: "0.5rem",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  {t("footer.downloadApp.googlePlay")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          marginTop: "2rem",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 400,
            fontFamily: "Roboto",
            fontSize: "1rem",
          }}
        >
          © 2022 Shob shop. All Rights Reserved.
        </Typography>

        <IconButton color="inherit">
          <LanguageIcon sx={{ fontSize: "2.5rem" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
