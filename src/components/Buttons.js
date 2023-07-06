import React from "react";
import { Button, Grid } from "@mui/material";
import { ButtonsContainer } from './StyledComponents';

function Buttons({ handleClear, handlePrevious, handleNext }) {
    return (
        <ButtonsContainer container spacing={2}>
            <Grid item xs={4} sm={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClear}
                >
                    Clear
                </Button>
            </Grid>
            <Grid item xs={4} sm={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePrevious}
                >
                    Previous
                </Button>
            </Grid>
            <Grid item xs={4} sm={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Grid>
        </ButtonsContainer>
    );
}

export default Buttons;
