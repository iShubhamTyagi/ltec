import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, useMediaQuery } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LungsIcon from "./resources/ltec_icon.png";

function Header({ userSelection, progress, updateTimer }) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId;

    if (progress === -100) {
      setTimer(0);
    } else if (progress < 100) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      updateTimer(timer);
    }

    return () => {
      clearInterval(intervalId);
    };
  // eslint-disable-next-line
  }, [progress]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#0067B3" }}>
      <Toolbar>
        <img
          src={LungsIcon}
          alt="Lungs Icon"
          style={{
            width: isMobile ? 28 : 32,
            height: isMobile ? 28 : 32,
            marginRight: isMobile ? 8 : 15,
          }}
        />

        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="div"
          textAlign="left"
          sx={{
            flexGrow: 1,
            whiteSpace: isMobile ? "normal" : "nowrap",
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          {isMobile ? (
            <>
              LTEC
            </>
          ) : (
            "Lung Transplant Eligibility Calculator"
          )}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {userSelection && (
            <>
              <Typography variant="h6" component="div" sx={{ marginRight: 1 }}>
                {userSelection}
              </Typography>
              <Box sx={{ position: "relative", marginRight: 1 }}>
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size={45}
                  sx={{
                    marginRight: 1,
                    color: "#FFD53D",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "45%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" component="div">
                    {`${progress}%`}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ marginLeft: isMobile ? 1 : 2 }}>
                <Typography
                  variant={isMobile ? "body2" : "h6"}
                  component="div"
                  sx={{ color: "#FFF" }}
                >
                  {formatTime(timer)}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
