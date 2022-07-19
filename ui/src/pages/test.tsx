import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

type Props = {};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TestPage = (props: Props) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        className="list"
        sx={{
          width: "50%",
          height: "auto",
          position: "relative",
          //  maxHeight: "250px",
          //  overflowY: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            boxShadow: "0 0 .5rem blue",
            //  padding: "2rem",
            position: "relative",
            zIndex: 1,
            height: "auto",
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          {arr.map((a, index) => (
            <div
              style={{
                width: "100%",
                height: "100px",
                border: "1px solid black",
                marginBottom: "5px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
              }}
              key={index}
            >
              {a}
            </div>
          ))}
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "100px",
            background: "rgb(14, 155, 21)",
            // border: "1px solid black",
            borderRadius: ".3rem",
            boxShadow: "0 0 .5rem blue",
            marginBottom: "5px",
            marginTop: "0.5rem",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
            left: 0,
            bottom: "-45%",
            zIndex: 99,
          }}
          onClick={() =>
            router.push({
              pathname: "/[search]",
              query: { search: "search", keyword: "nginx" },
            })
          }
        >
          hello
        </Box>
      </Box>
    </Box>
  );
};

export default TestPage;
