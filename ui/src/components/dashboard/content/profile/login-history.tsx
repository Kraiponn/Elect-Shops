import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";

interface IProps {
  darkMode: boolean;
}

const loginDummy = [
  {
    login_type: "Credentials login",
    login_date: "on 10:40 AM 2022/09/07",
    ip_address: "95.130.17.84",
    crient: "Chrome, Mac OS 10.15.7",
  },
  {
    login_type: "Facebook login",
    login_date: "on 08:40 AM 2022/09/07",
    ip_address: "95.130.17.84",
    crient: "Chrome, Mac OS 10.15.7",
  },
  {
    login_type: "Google login",
    login_date: "on 09:40 PM 2022/08/07",
    ip_address: "95.130.17.84",
    crient: "Chrome, Mac OS 10.15.7",
  },
];

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function LoginHistory({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <>
      <Typography
        sx={{
          fontSize: "1.35rem",
          fontWeight: 500,
          mb: 2,
        }}
      >
        {t("content.account.security.loginHistory")}
      </Typography>

      {/* <TableContainer component={Paper}> */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: darkMode ? "#dddcdc1e" : "#dddcdc36" }}>
          <TableRow>
            <TableCell>LOGIN TYPE</TableCell>
            <TableCell align="right">IP ADDRESS</TableCell>
            <TableCell align="right">CLIENT</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loginDummy.map((login, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="subtitle2">{login.login_type}</Typography>
                <Typography variant="body2">{login.login_date}</Typography>
              </TableCell>
              <TableCell align="right">{login.ip_address}</TableCell>
              <TableCell align="right">{login.crient}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </TableContainer> */}
    </>
  );
}
