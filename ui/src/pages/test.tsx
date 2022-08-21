import { Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import toArray from "dayjs/plugin/toArray";
import relativeTime from "dayjs/plugin/relativeTime";
import buddhistEra from "dayjs/plugin/buddhistEra";

type Props = {};

dayjs.extend(toArray);
dayjs.extend(relativeTime);
dayjs.extend(buddhistEra);

export default function Text({}: Props) {
  const c = dayjs();
  console.log("Format..", c.format());
  console.log("Format..", c.locale("th").format("DD MMMM YYYY"));
  console.log("toArray..", c.toArray());
  console.log(dayjs("2022-08-01").fromNow());

  return (
    <Container>
      <Toolbar />

      <Typography variant="h1">DayJS Tutorial With DateTimePicker</Typography>
      {/* <Typography>{`${c.format()} datetime`}</Typography> */}
    </Container>
  );
}
