import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  fontSize: 30,
  margin: 5,
  textAlign: "center",
  backgroundColor: "gray",
  color: "white",
  height: 0,
  width: "100%",
  paddingTop: "15%",
  paddingBottom: "85%",
}));

const Row = (props) => {
  let currWord = props.word_obj.word;
  let colors = props.word_obj.color;

  let arr = [...currWord.toUpperCase()];
  for (let i = arr.length; i < 5; i++) {
    arr.push(" ");
  }
  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item xs={1}></Grid>

      {arr.map((c, i) => {
        return (
          <Grid key={i} item xs={2}>
            {colors[i] === 0 ? <Item style={{ backgroundColor: 'gray' }}>{c}</Item>: <div/>}
            {colors[i] === 1 ? <Item style={{ backgroundColor: 'rgba(58,58,60,255)'}}>{c}</Item>: <div/>}
            {colors[i] === 2 ? <Item style={{ backgroundColor: 'rgba(181,158,59,255)' }}>{c}</Item>: <div/>}
            {colors[i] === 3 ? <Item style={{ backgroundColor: 'rgba(83,140,79,255)' }}>{c}</Item>: <div/>}

          </Grid>
        );
      })}

      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default function WordleGrid(props) {
  return (
    <Box style={{ width: "30%" }} sx={{ flexGrow: 1 }}>
      {props.rows.map((o, i) => {
        return <Row key={i} word_obj={o} />;
      })}
    </Box>
  );
}
