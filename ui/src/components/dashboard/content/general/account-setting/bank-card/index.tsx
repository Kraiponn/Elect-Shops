import React from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// Types and Colors system
import { clDarkMedium, clPrimary, clWhite } from "@/features/const/colors";

// Components

interface IProps {
  darkMode: boolean;
}

const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function BankAndCard({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          my: "2rem",
        }}
      >
        {t(`${TRANSLATE_KEY}.bankAndCard.title`)}
      </Typography>

      <Box
        sx={{
          padding: "2rem",
          background: darkMode ? clDarkMedium : clWhite,
          borderRadius: "0.35rem",
          boxShadow: "0 0 0.25rem #0101011d",
        }}
      >
        {/***********  Add New Credit And Debit Card   ***********/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "2rem",
            borderBottom: darkMode
              ? "0.02rem solid #ece7e716"
              : "0.02rem solid #01010117",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              opacity: "0.75",
            }}
          >
            {t(`${TRANSLATE_KEY}.bankAndCard.addCreditDebitCardTitle`)}
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              // transition: "transform 0.1s linear",
              ":hover": {
                transform: "scale(1.02)",
              },
              ":active": {
                transform: "scale(0.989)",
              },
            }}
          >
            {t(`${TRANSLATE_KEY}.bankAndCard.buttonAddCard`)}
          </Button>
        </Box>

        {/***********  List of Credit And Debit Card   ***********/}
        <Box
          sx={{
            paddingBottom: "2rem",
            marginBottom: "2rem",
            borderBottom: darkMode
              ? "0.02rem solid #ece7e716"
              : "0.02rem solid #01010117",
          }}
        >
          {/***********  Card #1  ***********/}
          <Box sx={{ mt: "2rem", display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontFamily: "Prompt",
                  color: clPrimary,
                  textShadow: darkMode
                    ? "2px 2px 1px #ffffff"
                    : "2px 2px 1px rgb(1,1,1)",
                }}
              >{`VISA`}</Typography>

              <Typography sx={{ mx: "1rem", fontWeight: 400 }}>
                {t(`${TRANSLATE_KEY}.bankAndCard.creditDebitCardNo1`)}
              </Typography>

              <Typography sx={{ mx: "1rem", fontWeight: 400 }}>
                {t(`${TRANSLATE_KEY}.bankAndCard.creditDebitCardNo1Expire`)}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <IconButton
              sx={{
                ":hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <DeleteIcon color="secondary" fontSize="large" />
            </IconButton>
          </Box>

          {/***********  Card #2  ***********/}
          <Box sx={{ mt: "2rem", display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontFamily: "Prompt",
                  color: clPrimary,
                  textShadow: darkMode
                    ? "2px 2px 1px #ffffff"
                    : "2px 2px 1px rgb(1,1,1)",
                }}
              >{`VISA`}</Typography>

              <Typography sx={{ mx: "1rem", fontWeight: 400 }}>
                {t(`${TRANSLATE_KEY}.bankAndCard.creditDebitCardNo2`)}
              </Typography>

              <Typography sx={{ mx: "1rem", fontWeight: 400 }}>
                {t(`${TRANSLATE_KEY}.bankAndCard.creditDebitCardNo2Expire`)}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <IconButton
              sx={{
                ":hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <DeleteIcon color="secondary" fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          padding: "2rem",
          marginY: "2rem",
          background: darkMode ? clDarkMedium : clWhite,
          borderRadius: "0.35rem",
          boxShadow: "0 0 0.25rem #0101011d",
        }}
      >
        {/***********  Add New Bank Accounts  ***********/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "2rem",
            borderBottom: darkMode
              ? "0.02rem solid #ece7e716"
              : "0.02rem solid #01010117",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              opacity: "0.75",
            }}
          >
            {t(`${TRANSLATE_KEY}.bankAndCard.addBankAccountTitle`)}
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              // transition: "transform 0.1s linear",
              ":hover": {
                transform: "scale(1.02)",
              },
              ":active": {
                transform: "scale(0.989)",
              },
            }}
          >
            {t(`${TRANSLATE_KEY}.bankAndCard.buttonAddCard`)}
          </Button>
        </Box>

        {/***********  Card #1  ***********/}
        <Box sx={{ mt: "2rem", display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                fontStyle: "italic",
                fontFamily: "Prompt",
                color: clPrimary,
                textShadow: darkMode
                  ? "2px 2px 1px #ffffff"
                  : "2px 2px 1px rgb(1,1,1)",
              }}
            >{`SHOP BANK`}</Typography>

            <Typography sx={{ mx: "1rem", fontWeight: 400 }}>
              {t(`${TRANSLATE_KEY}.bankAndCard.bankAccountNo`)}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            sx={{
              ":hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <DeleteIcon color="secondary" fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
