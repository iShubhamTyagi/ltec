import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography, RadioGroup, Grid, Box } from "@mui/material";

// Styled components for MainCard component
export const MainCardContainer = styled(Card)(({ theme }) => ({
  margin: "auto",
  marginTop: "5%",
  marginBottom: "5%",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  height: "calc(100vh - 10% - 16px)",
  width: "90%",

  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    width: "70%",
  },

  [theme.breakpoints.up("lg")]: {
    width: "60%",
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
    padding: theme.spacing(3),
    position: "relative",
    overflow: "auto",
    height: "100%",
  }));

  export const MainCardTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(20),
    marginBottom: theme.spacing(2),
  
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
    marginTop: "auto",
    marginBottom: "10%",
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  }));
  
  export const QuestionCardContent = styled(CardContent)({
    flex: "1",
    overflow: "auto",
    padding: 0,
  });
  
  
  export const StyledBox = styled(Box)();
  
  export const StyledTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  }));
  
  export const QuestionContainer = styled(Grid)(({ theme }) => ({
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
  }));