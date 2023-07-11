import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography, RadioGroup, Grid, Box } from "@mui/material";

// Styled components for MainCard component
export const MainCardContainer = styled(Card)(({ theme }) => ({
    margin: "auto", // Center horizontally
    marginTop: "1%", // Adjust the top margin as desired
    marginBottom: "2%", // Adjust the bottom margin as desired
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
    height: "calc(100vh - 10% - 16px)", // Subtract the height of the buttons container and the margin
    width: "90%", // Adjust the width as desired
  
    [theme.breakpoints.up("sm")]: {
      width: "80%", // Adjust the width for larger screens
    },
  
    [theme.breakpoints.up("md")]: {
      width: "70%", // Adjust the width for even larger screens
    },
  
    [theme.breakpoints.up("lg")]: {
      width: "60%", // Adjust the width for larger desktop screens
    },
  }));
  
  export const ProgressContainer = styled("div")(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  }));
  
  export const MainCardContent = styled(CardContent)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    position: "relative",
    overflow: "auto",
    maxHeight: "calc(100% - 70px)", // Adjust the max height based on your layout
    height: "100%", // Utilize the available vertical space
  
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1),
    },
  }));

  export const MainCardTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(20),
    marginBottom: theme.spacing(1),
  
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(24),
    },
  }));
  
  export const RadioGroupContainer = styled(RadioGroup)({
    display: "flex",
    flexDirection: "column",
  });
  
  export const ButtonsContainer = styled(Grid)({
    marginTop: "auto", // Move the buttons to the bottom
    justifyContent: "center",
  });
  
  export const ProgressContainerOuter = styled(Grid)({
    marginTop: "12px",
    width: "100%",
  });

  export const ButtonsContainerOuter = styled(Grid)({
    position: "sticky",
    bottom: 0,
    background: "#fff",
    zIndex: 1,
    marginTop: "auto", // Move the buttons to the bottom
    marginBottom: "2%",
    justifyContent: "center",
  });


// Styled components for QuestionCard component
  
  export const UserSelection = styled(Typography)(({ theme }) => ({
    position: "sticky",
    top: 0,
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    zIndex: 1,
  }));

  export const QuestionCardContainer = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }));
  
  export const QuestionCardContent = styled(CardContent)({
    flex: '1 1 auto',
    overflow: 'auto',
    padding: 0,
  });
  
  export const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
  }));
  
  export const StyledTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  }));
  
  export const QuestionContainer = styled(Grid)(({ theme }) => ({
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
  }));