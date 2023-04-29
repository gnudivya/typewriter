import { AllowedKeys } from "@/utils/utils";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";

const Typewriting: NextPage = () => {
  const audioElement = useRef(null);
  //===========audio controls==========
  const [frameSize, setFrameSize] = useState<number>(5);
  const frameSizeRef = useRef(frameSize);
  const [currentFrameCount, setCurrentFrameCount] = useState<number>(0);
  const currentFrameCountRef = useRef(currentFrameCount);
  const [autoPauseDelay, setAutoPauseDelay] = useState<number>(2);
  const autoPauseDelayRef = useRef(autoPauseDelay);
  const [autoPauseSeconds, setAutoPauseSeconds] = useState(0);
  const autoPauseSecondsRef = useRef(autoPauseSeconds);
  //===================================
  const [typedText, setTypedText] = useState<any>({});
  const typedTextRef = useRef(typedText);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (AllowedKeys.includes(event.key)) {
      console.log(event);
      if (event.key == "Enter") {
        setAutoPauseSeconds(0);
        if (currentFrameCountRef.current == 0) {
          // start for first time
          (audioElement.current as any).play();
        }
        setCurrentFrameCount((prev) => {
          (audioElement.current as any).currentTime = prev * frameSize;
          let temp = prev + 1;
          return temp;
        });
      } else if (event.key == "ArrowLeft") {
        // Todo: left arraw should not go previous to 0th second of audio file.
        setCurrentFrameCount((prev) => {
          let temp = prev - 1;
          currentFrameCountRef.current = temp;
          (audioElement.current as any).currentTime = temp * frameSize;
          return temp;
        });
      } else if (event.key == "ArrowRight") {
        // Todo: right arrow should not go after the window of whole audio
        setCurrentFrameCount((prev) => {
          let temp = prev + 1;
          currentFrameCountRef.current = temp;
          (audioElement.current as any).currentTime = temp * frameSize;
          return temp;
        });
      } else {
        console.log("idukulla poguthu");
        // setTypedText((prev) => {
        //   if (!prev[currentFrameCount]) {
        //     prev[currentFrameCount] = "";
        //   }
        //   prev[currentFrameCount] = prev[currentFrameCount] + event.key;
        //   console.log(prev);
        //   return prev;
        // });
        typedTextRef.current[currentFrameCountRef.current] =
          (typedTextRef.current[currentFrameCountRef.current] || "") +
          event.key;
        setTypedText({ ...typedTextRef.current });
      }
    }
  };

  console.log("currentFrameCount::::", currentFrameCount);
  console.log("t ::::: ", typedText);

  const checkTheCurrentTime = () => {
    // console.log("======================");
    // console.log("currentTime: ", (audioElement.current as any).currentTime);
    // console.log("currentFrameCount: ", currentFrameCountRef.current);
    // console.log("frameSizeRef.current: ", frameSizeRef.current);
    if (audioElement && audioElement.current) {
      if (
        currentFrameCountRef.current > 0 &&
        Math.floor((audioElement.current as any).currentTime) ==
          Math.floor(currentFrameCountRef.current * frameSizeRef.current)
      ) {
        (audioElement.current as any).pause();
      }
    }

    if (
      (audioElement.current as any).paused &&
      currentFrameCountRef.current > 0
    ) {
      setAutoPauseSeconds((prev) => prev + 1);
    }
    // console.log(
    //   "autoPauseSecondsRef == autoPauseDelayRef",
    //   autoPauseSecondsRef,
    //   autoPauseDelayRef,
    //   autoPauseSecondsRef > autoPauseDelayRef
    // );
    if (autoPauseSecondsRef.current > autoPauseDelayRef.current) {
      (audioElement.current as any).currentTime =
        currentFrameCountRef.current * frameSizeRef.current -
        frameSizeRef.current;
      setAutoPauseSeconds(0);
      (audioElement.current as any).play();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    setInterval(checkTheCurrentTime, 1000);
  }, []);

  useEffect(() => {
    currentFrameCountRef.current = currentFrameCount;
  }, [currentFrameCount]);

  useEffect(() => {
    autoPauseSecondsRef.current = autoPauseSeconds;
  }, [autoPauseSeconds]);

  useEffect(() => {
    frameSizeRef.current = frameSize;
  }, [frameSize]);

  useEffect(() => {
    autoPauseDelayRef.current = autoPauseDelay;
  }, [autoPauseDelay]);

  useEffect(() => {
    typedTextRef.current = typedText;
  }, [typedText]);

  return (
    <>
      <Box sx={{ p: 2 }} height={"100%"}>
        <Grid container height={"100%"}>
          <Grid item xs={8} sx={{ px: 1 }}>
            <Typography variant="h4">
              Typewriting & Spoken English Practice
            </Typography>
            <Divider></Divider>
            <pre
              style={{
                whiteSpace: "break-spaces",
                overflow: "auto",
                wordBreak: "break-all",
              }}
            >
              {JSON.stringify(typedText[currentFrameCount])}
            </pre>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ borderLeft: "1px solid grey", px: 1 }}
            height={"100%"}
            overflow={"auto"}
          >
            {" "}
            <audio
              ref={audioElement}
              controls
              src="/podcast/shoptalkshow-562.mp3"
            ></audio>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Typewriting;
