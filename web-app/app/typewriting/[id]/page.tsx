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
import { useEffect, useState } from "react";

let listening = false;

export default function TypingPagePage() {
    const [currentWord, setCurrentWord] = useState('test...');
  const [typedChar, setTypedChar] = useState("");

  const goToNextword = () => {

  }

  useEffect(() => {
    if (!listening) {
      document.addEventListener(
        "keydown",
        (event) => {
          const keyName = event.key;
        },
        false
      );

      document.addEventListener(
        "keyup",
        (event) => {
          const keyName = event.key;
          setTypedChar((prev) => {
            const newTypedChar = prev + keyName;
            if(newTypedChar == currentWord) {
                goToNextword();
            }
            if(currentWord.indexOf(newTypedChar) != 0) {
                return '';
            } else {
                return newTypedChar;
            }
            
          });
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
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h1" fontWeight={100} fontFamily={"monospace"}>
            {currentWord.indexOf(typedChar) == 0 && <Box><span style={{color: 'green'}}>{typedChar}</span><span>{currentWord.substring(typedChar.length, currentWord.length)}</span></Box> }
            {currentWord.indexOf(typedChar) != 0 && <Box>{currentWord}</Box>}
          </Typography>
        </CardContent>
      </Card>
      <Typography> {typedChar} </Typography>
    </Box>
  );
}
