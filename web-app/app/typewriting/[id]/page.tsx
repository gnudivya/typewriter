"use client";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { mockWords } from "./mock";

let listening = false;

export default function TypingPagePage() {
  const [fullText, setFullText] = useState([""]);
  const fullTextRef = useRef(['']);
  fullTextRef.current = fullText;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;
  const [currentWord, setCurrentWord] = useState("test...");
  const currentWordRef = useRef('');
  currentWordRef.current = currentWord;
  const [typedChars, setTypedChars] = useState("");
  const typedCharsRef = useRef('');
  typedCharsRef.current = typedChars;

  const goToNextword = () => {
    console.log(new Date())
    setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        setCurrentWord(fullTextRef.current[nextIndex]);
        return nextIndex;
    });
  };

  useEffect(() => {
    const wordsArr = mockWords
      .replaceAll("\n", " ")
      .split(" ")
      .filter((item) => item);
    setFullText(wordsArr);
    setCurrentWord(wordsArr[0]);
  }, []);

  useEffect(() => {
    if (!listening) {
      document.addEventListener(
        "keyup",
        (event) => {
          const keyName = event.key;
        },
        false
      );

      document.addEventListener(
        "keydown",
        (event) => {
            if(event.key == 'Enter') {
                goToNextword();
            }
          const regex = /^[\w\W]$/;
          if (!regex.test(event.key)) {
            return;
          }
          const keyName = event.key;
        //   setTypedChars((prev) => {
            const newTypedChar = typedCharsRef.current + keyName;
            if (newTypedChar == currentWordRef.current + " ") {
              goToNextword();
            }
            console.log(newTypedChar, currentWord.indexOf(newTypedChar), currentWord);
            if (currentWordRef.current.indexOf(newTypedChar) != 0) {
            //   return "";
            setTypedChars('');
            } else {
            //   return newTypedChar;
            setTypedChars(newTypedChar)
            }
        //   });
        },
        false
      );
      listening = true;
    }
  }, []);

  return (
    <Box>
      <Typography variant="h5" fontWeight={100}>
        Type the word displayed on screen
      </Typography>
      <Card
        sx={{
          mt: 3,
          width: "fit-content",
          backgroundColor:
            currentWord.indexOf(typedChars) == 0 ? "#159947" : "red",
        }}
      >
        <CardContent>
          <Typography variant="h1" fontWeight={100} fontFamily={"monospace"}>
            {currentWord.indexOf(typedChars) == 0 && (
              <Box>
                <span style={{ color: "#159947" }}>{typedChars}</span>
                <span style={{ color: "white" }}>
                  {currentWord.substring(typedChars.length, currentWord.length)}
                </span>
              </Box>
            )}
            {currentWord.indexOf(typedChars) != 0 && (
              <Box>
                <span style={{ color: "white" }}>{currentWord}</span>
              </Box>
            )}
          </Typography>
        </CardContent>
      </Card>
      -<Typography> {typedChars} </Typography>
      {currentWord.indexOf(typedChars)}=
      <Typography> {fullText[currentIndex]} </Typography>
      <Typography>{fullText.filter((item,i)=>i<20).join(' ')}</Typography>
    </Box>
  );
}
