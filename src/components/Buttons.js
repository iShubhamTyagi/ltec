import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { ButtonsContainer } from './StyledComponents';

function Buttons({ handleClear, handlePrevious, handleNext }) {
  return (
    <ButtonsContainer container spacing={2}>
      <Grid item xs={4} sm={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClear}
          className="clear-button" 
          sx={{ width: "80%" }} // Set the width to 100% for responsive and equal sizing
        >
          Clear
        </Button>
      </Grid>
      <Grid item xs={4} sm={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevious}
          className="previous-next-button"
          sx={{ width: "80%" }} // Set the width to 100% for responsive and equal sizing
        >
          Previous
        </Button>
      </Grid>
      <Grid item xs={4} sm={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className="previous-next-button"
          sx={{ width: "80%" }} // Set the width to 100% for responsive and equal sizing
        >
          Next
        </Button>
      </Grid>
    </ButtonsContainer>
  );
}

export default Buttons;
