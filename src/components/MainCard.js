import React, { useState } from "react";
import {
  Radio,
  FormControlLabel,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import {
  MainCardContainer,
  ProgressContainer,
  MainCardContent,
  UserSelection,
  MainCardTitle,
  RadioGroupContainer,
  ButtonsContainerOuter,
} from "./StyledComponents";

import questionCardSequences from "./QuestionCardSequences";
import Buttons from "./Buttons";

const initialState = {
  selectedSequence: null,
  currentCardIndex: 0,
  userSelection: "",
  answers: {},
  age: "",
  id: "",
  sex: "",
};

function MainCard() {
  const [state, setState] = useState(initialState);

  const {
    selectedSequence,
    currentCardIndex,
    userSelection,
    answers,
    age,
    id,
    sex,
  } = state;

  const handleNext = () => {
    if (
      selectedSequence !== null &&
      currentCardIndex < questionCardSequences[selectedSequence].cards.length
    ) {
      setState((prevState) => ({
        ...prevState,
        currentCardIndex: prevState.currentCardIndex + 1,
      }));
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 1) {
      setState((prevState) => ({
        ...prevState,
        currentCardIndex: prevState.currentCardIndex - 1,
      }));
    } else if (currentCardIndex === 1) {
      setState(initialState);
    }
  };

  const handleClear = () => {
    setState(initialState);
  };

  const handleSelection = (event) => {
    const sequence = Number(event.target.value);
    setState((prevState) => ({
      ...prevState,
      selectedSequence: sequence,
      currentCardIndex: 1,
      userSelection: questionCardSequences[sequence].label,
    }));
  };

  const handleAgeChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      age: event.target.value,
    }));
  };

  const handleIdChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      id: event.target.value,
    }));
  };

  const handleSexChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      sex: event.target.value,
    }));
  };

  const setAnswers = (index, answer) => {
    setState((prevState) => {
      const updatedAnswers = { ...prevState.answers };
      const key = `${currentCardIndex}-${index}`; // Create a unique key
      updatedAnswers[key] = answer;
      return { ...prevState, answers: updatedAnswers };
    });
  };

  const progress =
    (currentCardIndex /
      (questionCardSequences[selectedSequence]?.cards.length || 1)) *
    100;

  const isFormValid = age && id && sex;

  return (
    <MainCardContainer>
      <ProgressContainer>
        <CircularProgress variant="determinate" value={progress} />
      </ProgressContainer>
      <MainCardContent>
        {userSelection && (
          <UserSelection variant="body1" component="div">
            {userSelection}
          </UserSelection>
        )}
        {selectedSequence === null ? (
          <>
            <Grid>
              <div style={{ marginBottom: "16px" }}>
                <TextField
                  label="Age"
                  value={age}
                  onChange={handleAgeChange}
                  style={{ marginBottom: "8px" }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <TextField
                  label="ID"
                  value={id}
                  onChange={handleIdChange}
                  style={{ marginBottom: "8px" }}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <FormControl style={{ width: "170px" }}>
                  <InputLabel>Sex</InputLabel>
                  <Select value={sex} onChange={handleSexChange}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <MainCardTitle variant="h6" component="div">
              Choose the Patient Disease:
            </MainCardTitle>
            <RadioGroupContainer row onChange={handleSelection}>
              {questionCardSequences.map((sequence, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio disabled={!isFormValid} />}
                  label={sequence.label}
                />
              ))}
            </RadioGroupContainer>
          </>
        ) : (
          <>
            {questionCardSequences[selectedSequence].cards.map(
              (card, index) => (
                <div
                  key={index}
                  style={{
                    display: index === currentCardIndex - 1 ? "block" : "none",
                  }}
                >
                  {React.cloneElement(card, {
                    answers,
                    setAnswers,
                    currentCardIndex,
                  })}
                </div>
              )
            )}
          </>
        )}
      </MainCardContent>
      <ButtonsContainerOuter>
        <Buttons
          handleClear={handleClear}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </ButtonsContainerOuter>
    </MainCardContainer>
  );
}

export default MainCard;
