import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

declare global {
  interface Window {
    repeatTimerId?: any;
  }
}

const ListeningAudio: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const audioElement = useRef(null);
  const [framesCount, setFramesCount] = useState<number>(3);
  const [currentWindow, setCurrentWindow] = useState<number>(0);
  const [audioEvents, setAutoEvents] = useState<
    {
      dDurationMs: number;
      tStartMs: number;
      segs: {
        utf8: string;
      }[];
    }[]
  >([]);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [retry, setRetry] = useState(0);
  const [pauseTimeoutId, setPauseTimeoutId] = useState(null);
  const [shuffeledArray, setShuffeledArray] = useState<string[]>([]);
  const [userFeededArray, setUserFeededArray] = useState<string[]>([]);
  useEffect(() => {
    const fun = async () => {
      let res = await fetch("/podcast/" + id + ".json").then((res) =>
        res.json()
      );
      console.log(res);
      setAutoEvents(res.events);
    };
    if (id) {
      fun();
    }
  }, [id]);

  useEffect(() => {
    const pauseOnEnd = () => {
      console.log((audioElement.current as any).currentTime, ">", end / 1000);
      if ((audioElement.current as any).currentTime > end / 1000) {
        (audioElement.current as any).pause();
        setTimeout(() => {
          setRetry((prev) => prev + 1);
        }, 1000);
      }
    };
    const playOnStart = (s: number) => {
      (audioElement.current as any).currentTime = s;
      (audioElement.current as any).play();
      (audioElement.current as any).addEventListener("timeupdate", pauseOnEnd);
    };
    playOnStart(start / 1000);

    return () => {
      (audioElement.current as any).pause();
      (audioElement.current as any).removeEventListener(
        "timeupdate",
        pauseOnEnd
      );
    };
  }, [start, end, retry]);

  useEffect(() => {
    setShuffeledArray(
      shuffleArray(
        Array(framesCount)
          .fill(0)
          .flatMap((_i, i) =>
            audioEvents[currentWindow - framesCount + i + 1]?.segs.map((seg) =>
              seg.utf8.replaceAll("\n", " ").split(" ")
            )
          )
          .flat()
      )
    );
  }, [start, end]);

  useEffect(() => {
    if (shuffeledArray.length == 0 && audioEvents.length > 0) {
      goNext();
      // Todo, save to backend
      setUserFeededArray([]);
    }
  }, [shuffeledArray]);

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const goPrev = () => {
    setUserFeededArray([]);
    if (currentWindow < 1) {
      return;
    }
    setCurrentWindow((prev) => prev - framesCount);
    setStart(
      audioEvents[currentWindow - framesCount - framesCount + 1]?.tStartMs
    );
    setEnd(
      audioEvents[currentWindow - framesCount]?.tStartMs +
        audioEvents[currentWindow - framesCount]?.dDurationMs
    );
    setRetry((prev) => prev + 1);
  };

  const goNext = () => {
    setUserFeededArray([]);
    if (Math.floor(audioEvents.length) < currentWindow) {
      return;
    }
    setCurrentWindow((prev) => prev + framesCount);

    setStart(audioEvents[currentWindow + 1].tStartMs);
    setEnd(
      audioEvents[currentWindow + framesCount].tStartMs +
        audioEvents[currentWindow + framesCount].dDurationMs
    );
    setRetry((prev) => prev + 1);
  };

  return (
    <Box
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      overflow={"auto"}
    >
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Frame Count</InputLabel>
              <Select
                value={framesCount}
                label="Frame Count"
                onChange={(event) =>
                  setFramesCount(Number(event?.target.value))
                }
              >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={4}>Four</MenuItem>
                <MenuItem value={5}>Five</MenuItem>
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box flexGrow={1}>
        <audio
          hidden
          ref={audioElement}
          controls
          src={"/podcast/" + id + ".mp3"}
        ></audio>
        {/* {JSON.stringify(audioEvents.length)} */}
        {/* {Array(framesCount)
          .fill(0)
          .map((_i, i) => {
            return (
              <>
                <Typography>
                  {audioEvents[currentWindow - framesCount + i + 1]?.segs.map(
                    (seg) => seg.utf8
                  )}
                </Typography>
                <Divider />
              </>
            );
          })} */}

        {JSON.stringify(userFeededArray.join(" "))}
        <Divider />
        {shuffeledArray.map((item, index) => (
          <Chip
            key={index}
            sx={{ m: 1 }}
            label={item}
            onClick={() => {
              let temp = [...shuffeledArray];
              const removed = temp.splice(index, 1);
              setUserFeededArray((prev: string[]) => {
                prev.push(removed[0]);
                return prev;
              });
              setShuffeledArray(temp);
            }}
          />
        ))}
      </Box>
      <Box>
        <Paper sx={{ p: 2 }}>
          <Box display={"flex"}>
            <IconButton
              onClick={() => {
                goPrev();
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box flexGrow={1} justifyContent={"center"} display={"flex"}>
              <Typography variant="h5">
                {currentWindow / framesCount} /{" "}
                {Math.floor(audioEvents.length / framesCount)}
              </Typography>
            </Box>
            <IconButton
              onClick={() => {
                goNext();
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ListeningAudio;
