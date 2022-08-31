import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// Material components & Icons
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";

// Global state and System colors
import { useAppSelector } from "@/features/hooks/use-global-state";
import { clDarkHard, clWhite } from "@/features/const/colors";

// Components
import {
  CardMaster,
  CardVisa,
  CardPaypal,
} from "@/components/product/checkout/util";
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";

interface IProps {}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
export default function ContentList({}: IProps) {
  const { t } = useTranslation("checkout");
  const { darkMode } = useAppSelector((state) => state.gui);
  const { orders } = useAppSelector((state) => state.product);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [paymentType, setPaymentType] = React.useState("female");

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType((event.target as HTMLInputElement).value);
  };

  const handleExpandChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Grid item xs={12} lg={7}>
      {/***************     TOPIC PAYMENT METHOD     ****************/}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "2rem",
        }}
      >
        <Typography variant="h1">{t("paymentMethod.title")}</Typography>
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle2" sx={{ mr: "0.5rem" }}>
            {t("secureConnection")}
          </Typography>
          <LockIcon />
        </Box>
      </Box>

      {/***************     PAYMENT METHOD LIST     ****************/}
      <RadioGroup
        name="controlled-radio-buttons-group"
        value={paymentType}
        onChange={handlePaymentChange}
      >
        <Accordion
          expanded={expanded === "visa"}
          onChange={handleExpandChange("visa")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="visa-content"
            id="visa-header"
          >
            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Radio value="visa" />
              <Box
                sx={{
                  position: "relative",
                  width: "45px",
                  height: "25px",
                  background: clWhite,
                  boxShadow: darkMode
                    ? `0 0 1px ${clWhite}`
                    : `0 0 1px ${clDarkHard}`,
                  mr: "1rem",
                }}
              >
                <Image
                  src={CardVisa}
                  alt="visa card"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
              <Typography variant="h5">
                {t("paymentMethod.visa", { visaNo: "**** 6789" })}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead>
                <TableRow sx={{ "& .visa-tb": { fontWeight: 700 } }}>
                  <TableCell className="visa-tb">
                    {t("paymentMethod.cardName")}
                  </TableCell>
                  <TableCell className="visa-tb">
                    {t("paymentMethod.cardNo")}
                  </TableCell>
                  <TableCell className="visa-tb">
                    {t("paymentMethod.cardExpire")}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <TableCell>{`KRAIPON NAJAROON`}</TableCell>
                  <TableCell>{`**** 6789`}</TableCell>
                  <TableCell>{`09/25`}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "master"}
          onChange={handleExpandChange("master")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="masterbh-content"
            id="masterbh-header"
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Radio value="master" />

              <Box
                sx={{
                  position: "relative",
                  width: "45px",
                  height: "25px",
                  background: clWhite,
                  boxShadow: darkMode
                    ? `0 0 1px ${clWhite}`
                    : `0 0 1px ${clDarkHard}`,
                  mr: "0.5rem",
                }}
              >
                <Image
                  src={CardMaster}
                  alt="master card"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: "45px",
                  height: "25px",
                  background: clWhite,
                  boxShadow: darkMode
                    ? `0 0 1px ${clWhite}`
                    : `0 0 1px ${clDarkHard}`,
                  mr: "1rem",
                }}
              >
                <Image
                  src={CardVisa}
                  alt="visa card"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
              <Typography variant="h5">
                {t("paymentMethod.creditDebit")}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ width: "80%", margin: "auto" }}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder={t("paymentMethod.cardName")}
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder={t("paymentMethod.cardNo")}
              sx={{ my: "1rem" }}
            />

            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder={t("paymentMethod.cvc")}
              />

              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder={t("paymentMethod.cardExpire")}
                sx={{ ml: "1rem" }}
              />
            </Box>

            <FormControlLabel
              value="secure save"
              defaultChecked={true}
              control={<Checkbox />}
              label={t("paymentMethod.saveSecure")}
              sx={{ my: "1rem" }}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "paypal"}
          onChange={handleExpandChange("paypal")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="paypalbh-content"
            id="paypalbh-header"
          >
            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Radio value="paypal" />

              <Box
                sx={{
                  position: "relative",
                  width: "45px",
                  height: "25px",
                  background: clWhite,
                  boxShadow: darkMode
                    ? `0 0 1px ${clWhite}`
                    : `0 0 1px ${clDarkHard}`,
                  mr: "1rem",
                }}
              >
                <Image
                  src={CardPaypal}
                  alt="paypal card"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
              <Typography variant="h5">{t("paymentMethod.paypal")}</Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="subtitle2">
              {t("paymentMethod.paypallDesc")}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </RadioGroup>

      {/***************     ORDER LIST     ****************/}
      <Box sx={{ width: "100%", my: "5rem" }}>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: "2rem" }}>
          {t("order")}
        </Typography>

        {orders &&
          orders.map((order, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                mb: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "9rem",
                  height: "3.5rem",
                }}
              >
                <Image
                  src={order.product.image_url}
                  alt={order.product.product_name}
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 900 }}>
                {order.product.product_name}
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="secondary"
                  sx={{ fontWeight: 900 }}
                >
                  {ThaiCurrencyFormatWithBuildIn(order.product.unit_price)}
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 900 }}>
                  x{order.quantity}
                </Typography>
              </Box>
            </Box>
          ))}
      </Box>
    </Grid>
  );
}
