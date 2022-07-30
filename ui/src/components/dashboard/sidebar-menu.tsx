import React, { useState } from "react";
import Image from "next/image";

// Global state and types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";

// Material Design
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  Theme,
  Typography,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";

import ProfileImage from "@/assets/images/little-pug-dog.webp";

/*******************************************************************************
 *                           Constant and Types                                *
 ******************************************************************************/
import { DRAWER_WIDTH } from "@/components/dashboard/utils/constants";
import {
  clPrimary,
  clPrimaryDark,
  clSecondary,
  clBlueGray800,
  clBlueGray900,
} from "@/features/const/colors";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  // background: clPrimary,
  // position: "relative",
}));

interface IMenuState {
  account: boolean;
  customers: boolean;
  products: boolean;
  orders: boolean;
  invoices: boolean;
}

interface IProps {
  open: boolean;
  theme: Theme;
  handleDrawerClose: () => void;
}

enum NavMenuType {
  ACCOUNT = "dashboard/ACCOUNT",
  CUSTOMER = "dashboard/CUSTOMER",
  PRODUCT = "dashboard/PRODUCT",
  ORDER = "dashboard/ORDER",
  INVOICE = "dashboard/INVOICE",
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function SidebarMenu({
  open,
  handleDrawerClose,
  theme,
}: IProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [navState, setNavState] = useState<IMenuState>({
    account: true,
    customers: false,
    products: false,
    orders: false,
    invoices: false,
  });

  const handleSelectItemMenu = (item: NavMenuType) => {
    switch (item) {
      case NavMenuType.ACCOUNT:
        setNavState({
          ...navState,
          account: !navState.account,
        });
        break;
      case NavMenuType.CUSTOMER:
        setNavState({
          ...navState,
          customers: !navState.customers,
        });
        break;

      case NavMenuType.PRODUCT:
        setNavState({
          ...navState,
          products: !navState.products,
        });
        break;

      case NavMenuType.ORDER:
        setNavState({
          ...navState,
          orders: !navState.orders,
        });
        break;

      case NavMenuType.INVOICE:
        setNavState({
          ...navState,
          invoices: !navState.invoices,
        });
        break;

      default:
        setNavState({
          ...navState,
          account: !navState.account,
        });
    }
  };

  return (
    <Drawer
      sx={{
        // minHeight: "100vh",
        position: "relative",
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          // background: "rgb(1,1,1)",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <IconButton
        onClick={handleDrawerClose}
        sx={{
          position: "absolute",
          top: "5%",
          right: "0%",
          zIndex: 10000,
        }}
      >
        {theme.direction === "ltr" ? (
          <ArrowCircleLeftIcon
            // fontSize="large"
            sx={{
              color: "rgba(255, 255, 255, 0.585)",
              fontSize: "3rem",
              "&:hover": {
                transform: "scale(1.1)",
                color: "rgb(251, 255, 4)",
              },
            }}
          />
        ) : (
          <ArrowCircleRightIcon />
        )}
      </IconButton>

      {/***************  Profile  ******************/}
      <Box
        sx={{
          width: "100%",
          minHeight: "13rem",
          height: "auto",
          paddingY: "1.5rem",
          background: clBlueGray900,
          color: "rgb(229, 227, 227)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/***********  Profile Image  ************/}
        <Avatar
          sx={{
            position: "relative",
            width: "75px",
            height: "75px",
            background: "rgb(255, 255, 255)",
          }}
        >
          <Image
            src={user?.image_url ? user.image_url : ProfileImage}
            alt={user?.user_name}
            layout="fill"
            objectFit="contain"
          />
        </Avatar>

        <Typography
          variant="subtitle2"
          sx={{ mt: "1rem" }}
        >{`Kraipon Najaroon`}</Typography>
      </Box>
      <Divider />

      {/***************  Account List Item Menu  ******************/}
      <Box
        sx={{
          width: "100%",
          padding: "0.5rem 1rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {/***************  Title Categories  ***************/}
        <Typography
          sx={{
            fontFamily: "PromptBold",
            fontSize: "0.98rem",
            color: "rgba(100, 100, 100, 0.571)",
          }}
        >
          {`GENERAL`}
        </Typography>

        {/***************  Account Item Menu  ***************/}
        <Box sx={{ marginBottom: "0.5rem" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 1,
                "&:hover": {
                  color: "red",
                },
              }}
            >
              <AccountCircleIcon sx={{ fontSize: "1.45rem" }} />
              <Typography
                sx={{
                  ml: "0.5rem",
                  fontFamily: "PromptRegular",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "rgb(100, 100, 100)",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >{`Account`}</Typography>
            </Box>

            {navState.account ? (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.ACCOUNT)}
              >
                <ExpandMore />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.ACCOUNT)}
              >
                <NavigateNextIcon />
              </IconButton>
            )}
          </Box>

          <Collapse in={navState.account} sx={{ pl: "3.5rem" }}>
            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Profile`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Banks & Cards`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Addresses`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Change Password`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Privacy Settings`}</Typography>

            <Typography
              component="h5"
              variant="subtitle2"
              sx={{
                // mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Notify Settings`}</Typography>
          </Collapse>
        </Box>

        {/***************  Purchase Item Menu  ***************/}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 1,
              "&:hover": {
                color: "red",
              },
            }}
          >
            <ShoppingBasketIcon sx={{ fontSize: "1.45rem" }} />
            <Typography
              sx={{
                ml: "0.5rem",
                fontFamily: "PromptRegular",
                fontWeight: 900,
                fontSize: "1.1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": {
                  color: "red",
                },
              }}
            >{`Purchase`}</Typography>
          </Box>
        </Box>

        {/***************  Notifications Item Menu  ***************/}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 1,
              "&:hover": {
                color: "red",
              },
            }}
          >
            <NotificationsIcon sx={{ fontSize: "1.45rem" }} />
            <Typography
              sx={{
                ml: "0.5rem",
                fontFamily: "PromptRegular",
                fontWeight: 900,
                fontSize: "1.1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": {
                  color: "red",
                },
              }}
            >{`Notifications`}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />

      {/***************  Management List Item Menu  ***************/}
      <Box
        sx={{
          width: "100%",
          padding: "0.5rem 1rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {/***************  Title Categories  ***************/}
        <Typography
          sx={{
            fontFamily: "PromptBold",
            fontSize: "0.98rem",
            color: "rgba(100, 100, 100, 0.571)",
          }}
        >
          {`MANAGEMENT`}
        </Typography>

        {/***************  Customers Item Menu  ***************/}
        <Box sx={{ marginBottom: "0.5rem" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 1,
              }}
            >
              <PeopleIcon sx={{ fontSize: "1.45rem" }} />
              <Typography
                sx={{
                  ml: "0.5rem",
                  fontFamily: "PromptRegular",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "rgb(100, 100, 100)",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >{`Customers`}</Typography>
            </Box>

            {navState.customers ? (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.CUSTOMER)}
              >
                <ExpandMore />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.CUSTOMER)}
              >
                <NavigateNextIcon />
              </IconButton>
            )}
          </Box>

          <Collapse in={navState.customers} sx={{ pl: "3.5rem" }}>
            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`List`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Details`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Edit`}</Typography>
          </Collapse>
        </Box>

        {/***************  Product Item Menu  ***************/}
        <Box sx={{ marginBottom: "0.5rem" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 1,
              }}
            >
              <ShoppingBasketIcon sx={{ fontSize: "1.45rem" }} />
              <Typography
                sx={{
                  ml: "0.5rem",
                  fontFamily: "PromptRegular",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "rgb(100, 100, 100)",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >{`Product`}</Typography>
            </Box>

            {navState.products ? (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.PRODUCT)}
              >
                <ExpandMore />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.PRODUCT)}
              >
                <NavigateNextIcon />
              </IconButton>
            )}
          </Box>

          <Collapse in={navState.products} sx={{ pl: "3.5rem" }}>
            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`List`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Details`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Edit`}</Typography>
          </Collapse>
        </Box>

        {/***************  Order Item Menu  ***************/}
        <Box sx={{ marginBottom: "0.5rem" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 1,
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: "1.45rem" }} />
              <Typography
                sx={{
                  ml: "0.5rem",
                  fontFamily: "PromptRegular",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "rgb(100, 100, 100)",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >{`Orders`}</Typography>
            </Box>

            {navState.orders ? (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.ORDER)}
              >
                <ExpandMore />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.ORDER)}
              >
                <NavigateNextIcon />
              </IconButton>
            )}
          </Box>

          <Collapse in={navState.orders} sx={{ pl: "3.5rem" }}>
            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`List`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Details`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Edit`}</Typography>
          </Collapse>
        </Box>

        {/***************  Invoice Item Menu  ***************/}
        <Box sx={{ marginBottom: "0.5rem" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 1,
              }}
            >
              <DescriptionIcon sx={{ fontSize: "1.45rem" }} />
              <Typography
                sx={{
                  ml: "0.5rem",
                  fontFamily: "PromptRegular",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "rgb(100, 100, 100)",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >{`Invoices`}</Typography>
            </Box>

            {navState.invoices ? (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.INVOICE)}
              >
                <ExpandMore />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.INVOICE)}
              >
                <NavigateNextIcon />
              </IconButton>
            )}
          </Box>

          <Collapse in={navState.invoices} sx={{ pl: "3.5rem" }}>
            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`List`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Details`}</Typography>

            <Typography
              component="h5"
              sx={{
                mb: "0.789rem",
                fontFamily: "PromptMedium",
                fontSize: "1rem",
                color: "rgb(100, 100, 100)",
                "&:hover": { color: clSecondary },
              }}
            >{`Edit`}</Typography>
          </Collapse>
        </Box>
      </Box>
      <Divider />
    </Drawer>
  );
}
