import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  margin: 3,
  textAlign: "center",
  backgroundColor: "gray",
  color: "white",
  fontSize: 30,
}));

const Row = (props) => {
  return (
    <Grid container justifyContent="center" spacing={1}>
      {props.chars.map((o, i) => {
        return (
          <Grid item key={i} xs={1}>
            {o.color === 0 ? (
              <Item style={{ backgroundColor: "gray" }}>
                {o.letter.toUpperCase()}
              </Item>
            ) : (
              <div />
            )}

            {o.color === 1 ? (
              <Item style={{ backgroundColor: 'rgba(58,58,60,255)' }}>
                {o.letter.toUpperCase()}
              </Item>
            ) : (
              <div />
            )}

            {o.color === 2 ? (
              <Item style={{ backgroundColor: 'rgba(181,158,59,255)' }}>
                {o.letter.toUpperCase()}
              </Item>
            ) : (
              <div />
            )}

            {o.color === 3 ? (
              <Item style={{ backgroundColor: 'rgba(83,140,79,255)' }}>
                {o.letter.toUpperCase()}
              </Item>
            ) : (
              <div />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default function KeyboardGrid(props) {
  return (
    <Box style={{ width: "50%" }} sx={{ flexGrow: 1 }}>
      <Row chars={props.topRow} />
      <Row chars={props.midRow} />
      <Row chars={props.botRow} />
    </Box>
  );
}
