import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FormControlLabel, Radio } from "@mui/material";

import questionCardSequences from "./QuestionCardSequences";
import Buttons from "./Buttons";
import FinalCard from "./FinalCard";
import Header from "./Header";
import Footer from "./Footer";

import {
  MainCardContainer,
  MainCardContent,
  MainCardTitle,
  RadioGroupContainer,
  ButtonsContainerOuter,
} from "./StyledComponents";

const initialState = {
  selectedSequence: null,
  currentCardIndex: 0,
  userSelection: "",
  answers: {},
  verdicts: {},
  age: "",
  id: "",
  sex: "",
};

function MainCard() {
  const [state, setState] = useState(initialState);
  const [isFinalCardShown, setIsFinalCardShown] = useState(false);
  const [currentVerdicts, setCurrentVerdicts] = useState({});
  const [overallVerdict, setOverallVerdict] = useState({});

  const {
    selectedSequence,
    currentCardIndex,
    userSelection,
    answers,
    verdicts,
    age,
    id,
    sex,
  } = state;

  const handleNext = () => {
    if (selectedSequence !== null) {
      const totalCards = questionCardSequences[selectedSequence]?.cards.length;
      if (currentCardIndex < totalCards) {
        setState((prevState) => ({
          ...prevState,
          currentCardIndex: prevState.currentCardIndex + 1,
        }));
      } else if (currentCardIndex === totalCards) {
        calculateOverallVerdict(verdicts);
        setIsFinalCardShown(true);
      }
    }
  };

  const calculateOverallVerdict = (verdicts) => {
    const eligibleVerdicts = Object.values(verdicts).slice(0, 2); // Extract the first 2 verdicts
    const yesNoVerdicts = Object.values(verdicts).slice(2, 4); // Extract the next 2 verdicts

    // Check if all 4 verdicts are available
    if (eligibleVerdicts.length === 2 && yesNoVerdicts.length === 2) {
      // Check if both the first 2 verdicts are "Eligible" and both the next 2 verdicts are "No"
      if (
        eligibleVerdicts.every((verdict) => verdict === "Eligible") &&
        yesNoVerdicts.every((verdict) => verdict === "No")
      ) {
        setOverallVerdict("Eligible");
      } else {
        setOverallVerdict("Ineligible");
      }
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
    setIsFinalCardShown(false);
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

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    setState((prevState) => ({
      ...prevState,
      [field]: value,
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

  const setVerdict = (cardIndex, verdict) => {
    setState((prevState) => ({
      ...prevState,
      verdicts: {
        ...prevState.verdicts,
        [cardIndex]: verdict,
      },
    }));

    setCurrentVerdicts((prevVerdicts) => ({
      ...prevVerdicts,
      [cardIndex]: verdict,
    }));
  };

  useEffect(() => {
    console.log(verdicts);
  }, [verdicts]);

  useEffect(() => {
    if (
      currentCardIndex > questionCardSequences[selectedSequence]?.cards.length
    ) {
      setIsFinalCardShown(true);
    }
  }, [currentCardIndex, selectedSequence, answers]);

  useEffect(() => {
    setCurrentVerdicts(verdicts);
  }, [verdicts]);

  const totalCards = questionCardSequences[selectedSequence]?.cards.length || 1;
  const progress = ((currentCardIndex - 1) / totalCards) * 100;

  const isFormValid = age && id && sex;

  if (isFinalCardShown) {
    return (
      <>
        <Header userSelection={userSelection} progress={100} />
        <FinalCard
          handleClear={handleClear}
          age={age}
          id={id}
          sex={sex}
          verdicts={currentVerdicts}
          overallVerdict={overallVerdict}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header
        userSelection={userSelection}
        progress={Math.min(progress, 100)}
      />
      <MainCardContainer>
        <MainCardContent>
          {selectedSequence === null ? (
            <>
              <Grid>
              <MainCardTitle variant="h6" component="div">
                Enter Patient Details:
              </MainCardTitle>
                <div style={{ marginBottom: "16px" }}>
                  <TextField
                    label="Age"
                    value={age}
                    onChange={(event) => handleInputChange(event, "age")}
                    style={{ marginBottom: "8px" }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <TextField
                    label="ID"
                    value={id}
                    onChange={(event) => handleInputChange(event, "id")}
                    style={{ marginBottom: "8px" }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <FormControl style={{ width: "170px" }}>
                    <InputLabel>Sex</InputLabel>
                    <Select
                    label="sex"
                      value={sex}
                      onChange={(event) => handleInputChange(event, "sex")}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <MainCardTitle variant="h6" component="div">
                Choose Patient's Disease:
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
                      display:
                        index === currentCardIndex - 1 ? "block" : "none",
                    }}
                  >
                    {React.cloneElement(card, {
                      answers,
                      setAnswers,
                      setVerdict,
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
      <Footer />
    </>
  );
}

export default MainCard;
