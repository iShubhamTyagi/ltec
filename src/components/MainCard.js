import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Grid,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const questionsForCard1a = [
  {
    text: "Frequent exacerbation",
    subheading: "BODE score 5-6 with",
  },
  {
    text: "PA to aorta dia > 1",
    subheading: "BODE score 5-6 with",
  },
  {
    text: "FEV 1 20-25% predicted",
    subheading: "BODE score 5-6 with",
  },
  {
    text: "Increase in BODE score > 1 in 2 years",
    subheading: "BODE score 5-6 with",
  },
  {
    text: "Clinical Deterioration on maximal therapy (including oxygen, NIV, rehabilitation)",
    subheading: null,
  },
  {
    text: "Poor quality of Life unacceptable to patient",
    subheading: null,
  },
];

const questionsForCard1b = [
  {
    text: "BODE Score 7-10",
    subheading: null,
  },
  {
    text: "History of sever exacerbation",
    subheading: null,
  },
  {
    text: "Moderate to severe PAH",
    subheading: null,
  },
  {
    text: "FEV1 < 20% predicted",
    subheading: null,
  },
  {
    text: "Chronic Hypercapnia",
    subheading: null,
  },
];
const questionsForCard2a = [
  {
    text: "Histopathological UIP/ Radiological probable or definite UIP",
    subheading: null,
  },
  {
    text: "FVC<80% predicted / DLCO<40% predicted",
    subheading: null,
  },
  {
    text: "FVC > 10%",
    subheading: "Past 2 years relative decline of:",
  },
  {
    text: "DLCO > 15%",
    subheading: "Past 2 years relative decline of:",
  },
  {
    text: "FVC > 5% with Clinical and radiological worsening",
    subheading: "Past 2 years relative decline of:",
  },
  {
    text: "Oxygen requirement: rest or exhaustion",
    subheading: null,
  },
  {
    text: "Clinical Deterioration on maximal therapy (including oxygen, NIV, rehabilitation)",
    subheading: null,
  },
];

const questionsForCard2b = [
  {
    text: "FVC > 10%",
    subheading: "Pulmonary Fibrosis with past 6 months absolute decline",
  },
  {
    text: "DLCO > 10%",
    subheading: "Pulmonary Fibrosis with past 6 months absolute decline",
  },
  {
    text: "FVC > 5% with radiological worsening",
    subheading: "Pulmonary Fibrosis with past 6 months absolute decline",
  },
  {
    text: "6 minute walk test SPO2 < 88% / 50 mtrs decline in 6 month",
    subheading: null,
  },
  {
    text: "Pulmonary hypertension",
    subheading: null,
  },
  {
    text: "Hospitalisation due to exacerbation/pneumothorax/respiratory decline",
    subheading: null,
  },
];

const questionsForCard3a = [
  {
    text: "FEV1 < 30% predicted",
    subheading: null,
  },
  {
    text: "6 min walk distance < 400 mtr",
    subheading: "FEV1 < 40 % predicted with",
  },
  {
    text: "PACO2 > 50",
    subheading: "FEV1 < 40 % predicted with",
  },
  {
    text: "Hypoxemia at rest or exertion",
    subheading: "FEV1 < 40 % predicted with",
  },
  {
    text: "2 exacerbation per year requiring IV antibiotics",
    subheading: "FEV1 < 40 % predicted with",
  },
  {
    text: "PASP > 50 / RV dysfunction",
    subheading: "FEV1 < 40 % predicted with",
  },
  {
    text: "worsening nutritional status",
    subheading: "FEV1 < 40 % predicted with",
  },
  {
    text: "massive hemoptysis requiring BAE",
    subheading: "FEV1 < 40 % predicted with",
  },
  {
    text: "pneumothorax",
    subheading: "FEV1 < 40 % predicted with",
  },
  {
    text: "FEV1 < 50 % predicted with rapidly declining PFT/symptoms",
    subheading: null,
  },
  {
    text: "Any exacerbation requiring positive pressure ventilation",
    subheading: null,
  },
];

const questionsForCard3b = [
  {
    text: "FEV1 < 25% predicted",
    subheading: null,
  },
  {
    text: "total hospitalization > 28 days in preceding year",
    subheading: null,
  },
  {
    text: "chronic respiratory failure with increase in oxygen/NIV requirement",
    subheading: null,
  },
  {
    text: "any exacerbation requiring mechanical ventilation",
    subheading: null,
  },
  {
    text: "PASP > 50 / RV dysfunction",
    subheading: null,
  },
  {
    text: "worsening nutritional status with BMI < 18",
    subheading: null,
  },
  {
    text: "recurrent massive hemoptysis requiring BAE",
    subheading: null,
  },
  {
    text: "rapid decline in lung function or symptoms",
    subheading: null,
  },
  {
    text: "WHO functional Class 4",
    subheading: null,
  },
];

const questionsForCardc1 = [
  {
    text: "Unwilling Patient",
    subheading: null,
  },
  {
    text: "Active malignancy",
    subheading: null,
  },
  {
    text: "GFR < 40 or acute renal failure",
    subheading: null,
  },
  {
    text: "Chronic liver disease or acute liver failure",
    subheading: null,
  },
  {
    text: "ACS/Stroke/MI in last 30 days",
    subheading: null,
  },
  {
    text: "Disseminated infection (including TB)/Septic shock)",
    subheading: null,
  },
  {
    text: "Active HIV",
    subheading: null,
  },
  {
    text: "Non Ambulatory Patient",
    subheading: null,
  },
  {
    text: "Progressive Cognitive Impairment",
    subheading: null,
  },
  {
    text: "Non adherence to treatment",
    subheading: null,
  },
  {
    text: "Active substance abuse",
    subheading: null,
  },
];

const questionsForCardc2 = [
  {
    text: "Age > 70",
    subheading: null,
  },
  {
    text: "LVEF < 40%",
    subheading: null,
  },
  {
    text: "Significant CVD",
    subheading: null,
  },
  {
    text: "Severe oesophageal dismotility",
    subheading: null,
  },
  {
    text: "Bleeding diathesis",
    subheading: null,
  },
  {
    text: "BMI > 35 or <16",
    subheading: null,
  },
  {
    text: "Psychiatric Condition",
    subheading: null,
  },
  {
    text: "Infection with M abscessus, B cenocepacia, L prolificans",
    subheading: null,
  },
  {
    text: "Hepatitis B or C",
    subheading: null,
  },
  {
    text: "Chest wall or spinal deformity",
    subheading: null,
  },
  {
    text: "Patient on ECMO",
    subheading: null,
  },
];

const MainCardContainer = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  height: "100vh", // Set container height to fill the available vertical space
}));

const ProgressContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const MainCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  position: "relative",
  overflow: "auto",
  maxHeight: "calc(100% - 70px)", // Adjust the max height based on your layout
  height: "100%", // Utilize the available vertical space

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(6),
  },
}));

const MainCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(20),
  marginBottom: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    fontSize: theme.typography.pxToRem(24),
  },
}));

const RadioGroupContainer = styled(RadioGroup)({
  display: "flex",
  flexDirection: "column",
});

const ButtonsContainer = styled(Grid)({
  marginTop: "auto", // Move the buttons to the bottom
  justifyContent: "center",
});

const ProgressContainerOuter = styled(Grid)({
  marginTop: "12px",
  width: "100%",
});

const UserSelection = styled(Typography)(({ theme }) => ({
  position: "sticky",
  top: 0,
  background: theme.palette.background.paper,
  padding: theme.spacing(2),
  zIndex: 1,
}));

const questionCardSequences = [
  {
    label: "COPD",
    cards: [
      <QuestionCard
        questions={questionsForCard1a}
        title="Is the Patient eligible for referral?"
      />,
      <QuestionCard
        questions={questionsForCard1b}
        title="Is the Patient eligible for listing?"
      />,
      <QuestionCard
        questions={questionsForCardc1}
        title="Contra Indication (Absolute)"
      />,
      <QuestionCard
        questions={questionsForCardc2}
        title="Contra Indication (Relative)"
      />
    ],
  },
  {
    label: "ILD",
    cards: [
      <QuestionCard
        questions={questionsForCard2a}
        title="Is the Patient eligible for referral?"
      />,
      <QuestionCard
        questions={questionsForCard2b}
        title="Is the Patient eligible for listing?"
      />,
      <QuestionCard
        questions={questionsForCardc1}
        title="Contra Indication (Absolute)"
      />,
      <QuestionCard
        questions={questionsForCardc2}
        title="Contra Indication (Relative)"
      />
    ],
  },
  {
    label: "Bronchiectasis",
    cards: [
      <QuestionCard
        questions={questionsForCard3a}
        title="Is the Patient eligible for referral?"
      />,
      <QuestionCard
        questions={questionsForCard3b}
        title="Is the Patient eligible for listing?"
      />,
      <QuestionCard
        questions={questionsForCardc1}
        title="Contra Indication (Absolute)"
      />,
      <QuestionCard
        questions={questionsForCardc2}
        title="Contra Indication (Relative)"
      />
    ],
  },
];

const initialState = {
  selectedSequence: null,
  currentCardIndex: 0,
  userSelection: "",
  answers: {},
};

function MainCard() {
  const [state, setState] = useState(initialState);

  const { selectedSequence, currentCardIndex, userSelection, answers } = state;

  const handleSelection = (event) => {
    const sequence = Number(event.target.value);
    setState((prevState) => ({
      ...prevState,
      selectedSequence: sequence,
      currentCardIndex: 1,
      userSelection: questionCardSequences[sequence].label,
    }));
  };

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

  const progress =
    (currentCardIndex /
      (questionCardSequences[selectedSequence]?.cards.length || 1)) *
    100;

  const handleClear = () => {
    setState(initialState);
  };

  const setAnswers = (index, answer) => {
    setState((prevState) => {
      const updatedAnswers = { ...prevState.answers };
      const key = `${currentCardIndex}-${index}`; // Create a unique key
      updatedAnswers[key] = answer;
      return { ...prevState, answers: updatedAnswers };
    });
  };

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
            <MainCardTitle variant="h6" component="div">
              Choose the Patient Disease:
            </MainCardTitle>
            <RadioGroupContainer row onChange={handleSelection}>
              {questionCardSequences.map((sequence, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio />}
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
                    currentCardIndex: index + 1,
                  })}
                </div>
              )
            )}
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
          </>
        )}
      </MainCardContent>
      <ProgressContainerOuter>
        <LinearProgress variant="determinate" value={progress} />
      </ProgressContainerOuter>
    </MainCardContainer>
  );
}

export default MainCard;
