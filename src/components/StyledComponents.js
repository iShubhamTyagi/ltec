import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography, RadioGroup, Grid, Box } from "@mui/material";

// Styled components for MainCard component
export const MainCardContainer = styled(Card)(({ theme }) => ({
  margin: "auto", // Center horizontally
  marginTop: "1%", // Adjust the top margin as desired
  marginBottom: "2%", // Adjust the bottom margin as desired
  paddingBottom: "70px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  width: "100%", // Adjust the width to occupy the full width of the container

  [theme.breakpoints.up("sm")]: {
    width: "90%", // Adjust the width for larger screens
  },

  [theme.breakpoints.up("md")]: {
    width: "80%", // Adjust the width for even larger screens
  },

  [theme.breakpoints.up("lg")]: {
    width: "70%", // Adjust the width for larger desktop screens
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

  export const ButtonsContainerOuter = styled(Grid)(({ theme }) => ({
    position: "sticky",
    bottom: 0,
    background: "#fff",
    zIndex: 2,
    marginTop: "auto",
    marginBottom: "2%",
    justifyContent: "center",
  
    "& .previous-next-button": {
      background: "#0067B3",
      color: "#FFF",
      fontWeight: "normal", // Set the default font weight
      textDecoration: "none", // Set the default text decoration
      transition: "font-weight 0.3s, text-decoration 0.3s", // Add transition animation
  
      "&:hover": {
        fontWeight: "bold", // Set font weight to bold on hover
        textDecoration: "underline", // Set text decoration to underline on hover
      },
    },
    "& .clear-button": {
      background: "#40B0DF", // Set the background color for Clear button
      color: "#FFF", // Set the text color for Clear button
      "&:hover": {
        background: "#FFC107", // Set the background color on hover for Clear button
      },
  }}));
  


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