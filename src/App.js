import React, { useEffect, useState, useRef } from "react";
import KeyboardGrid from "./components/Keyboard";
import WordleGrid from "./components/WordleGrid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { possible_solutions_set, validInput } from "./sets";
import { randomWord } from "./util";
import EndModal from "./components/EndModal";

const Item = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: "white",
  fontSize: 30,
}));

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

function App() {
  const [topRow, setTopRow] = useState([
    { letter: "q", color: 0 },
    { letter: "w", color: 0 },
    { letter: "e", color: 0 },
    { letter: "r", color: 0 },
    { letter: "t", color: 0 },
    { letter: "y", color: 0 },
    { letter: "u", color: 0 },
    { letter: "i", color: 0 },
    { letter: "o", color: 0 },
    { letter: "p", color: 0 },
  ]);

  const [midRow, setMidRow] = useState([
    { letter: "a", color: 0 },
    { letter: "s", color: 0 },
    { letter: "d", color: 0 },
    { letter: "f", color: 0 },
    { letter: "g", color: 0 },
    { letter: "h", color: 0 },
    { letter: "j", color: 0 },
    { letter: "k", color: 0 },
    { letter: "l", color: 0 },
  ]);

  const [botRow, setBotRow] = useState([
    { letter: "z", color: 0 },
    { letter: "x", color: 0 },
    { letter: "c", color: 0 },
    { letter: "v", color: 0 },
    { letter: "b", color: 0 },
    { letter: "n", color: 0 },
    { letter: "m", color: 0 },
  ]);

  const WORD_LENGTH = 5;
  const HIDDEN_WORD = randomWord();
  const [hiddenWord, setHiddenWord] = useState(HIDDEN_WORD);
  const [rowIdx, setRowIdx] = useState(0);
  const [win, setWin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([
    { word: "", color: [0, 0, 0, 0, 0] },
    { word: "", color: [0, 0, 0, 0, 0] },
    { word: "", color: [0, 0, 0, 0, 0] },
    { word: "", color: [0, 0, 0, 0, 0] },
    { word: "", color: [0, 0, 0, 0, 0] },
    { word: "", color: [0, 0, 0, 0, 0] },
  ]);

  //Input Logic
  const handler = ({ key }) => {
    let newRows = [...rows];
    if (key === "Backspace") {
      if (newRows[rowIdx] !== "") {
        newRows[rowIdx].word = newRows[rowIdx].word.substring(
          0,
          newRows[rowIdx].word.length - 1
        );
        setRows(newRows);
      }
    } else if (key === "Enter") {
      if (
        possible_solutions_set.has(newRows[rowIdx].word) &&
        newRows[rowIdx].word.length === WORD_LENGTH
      ) {
        let word_arr = [...newRows[rowIdx].word];
        const lettersInHiddenWord = new Set([...hiddenWord]);

        word_arr.forEach((c, i) => {
          // if letter is not in word, set color = 1 (black)
          if (!lettersInHiddenWord.has(c)) {
            newRows[rowIdx].color[i] = 1;
            topRow.forEach((o, j) => {
              if (o.letter === c) {
                let newTopRow = [...topRow];
                newTopRow[j].color = 1;
              }
            });
            midRow.forEach((o, j) => {
              if (o.letter === c) {
                let newMidRow = [...midRow];
                newMidRow[j].color = 1;
              }
            });
            botRow.forEach((o, j) => {
              if (o.letter === c) {
                let newBotRow = [...botRow];
                newBotRow[j].color = 1;
              }
            });
          }
          // if letter is in word
          else {
            // if letter shares index with letter in word, set color = 3 (green)
            if (c === hiddenWord.charAt(i)) {
              newRows[rowIdx].color[i] = 3;
              topRow.forEach((o, j) => {
                if (o.letter === c) {
                  let newTopRow = [...topRow];
                  newTopRow[j].color = 3;
                }
              });
              midRow.forEach((o, j) => {
                if (o.letter === c) {
                  let newMidRow = [...midRow];
                  newMidRow[j].color = 3;
                }
              });
              botRow.forEach((o, j) => {
                if (o.letter === c) {
                  let newBotRow = [...botRow];
                  newBotRow[j].color = 3;
                }
              });
            }
            // if letter does not share index, set color = 2 (yellow)
            else {
              newRows[rowIdx].color[i] = 2;
              topRow.forEach((o, j) => {
                if (o.letter === c && o.color !== 3) {
                  let newTopRow = [...topRow];
                  newTopRow[j].color = 2;
                }
              });
              midRow.forEach((o, j) => {
                if (o.letter === c && o.color !== 3) {
                  let newMidRow = [...midRow];
                  newMidRow[j].color = 2;
                }
              });
              botRow.forEach((o, j) => {
                if (o.letter === c && o.color !== 3) {
                  let newBotRow = [...botRow];
                  newBotRow[j].color = 2;
                }
              });
            }

            //check if win
            let isWin = true;
            newRows[rowIdx].color.forEach((color) => {
              if (color != 3) {
                isWin = false;
              }
            })
            if (isWin) {
              setWin(true);
              setModalOpen(true);
            }
          }
        });

        if (rowIdx === 5) {
          setModalOpen(true);
        }
        setRowIdx(rowIdx + 1);
      }
    } else {
      if (validInput.has(key) && rows[rowIdx].word.length < WORD_LENGTH) {
        newRows[rowIdx].word = newRows[rowIdx].word + key;
        setRows(newRows);
      }
    }
  };

  useEventListener("keydown", handler);

  return (
    <Box>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Item>WORDLE BATTLE</Item>
        </Grid>
        <Grid item align="center" xs={12}>
          <WordleGrid rows={rows} />
        </Grid>
        <Grid item align="center" xs={12}>
          <KeyboardGrid topRow={topRow} midRow={midRow} botRow={botRow} />
        </Grid>
      </Grid>
      <EndModal open={modalOpen} win={win} hiddenWord={hiddenWord}/>
    </Box>
  );
}

export default App;
