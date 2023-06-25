import React, { useState } from 'react';
import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, Button, Grid, CircularProgress, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import QuestionCard1a from './QuestionCard1a';
import QuestionCard1b from './QuestionCard1b';
import QuestionCard2a from './QuestionCard2a';
import QuestionCard2b from './QuestionCard2b';
import QuestionCard3a from './QuestionCard3a';
import QuestionCard3b from './QuestionCard3b';
import QuestionCardc1 from './QuestionCardc1';
import QuestionCardc2 from './QuestionCardc2';

const questionCardSequences = [
  [<QuestionCard1a />, <QuestionCard1b />, <QuestionCardc1 />, <QuestionCardc2 />],
  [<QuestionCard2a />, <QuestionCard2b />, <QuestionCardc1 />, <QuestionCardc2 />],
  [<QuestionCard3a />, <QuestionCard3b />, <QuestionCardc1 />, <QuestionCardc2 />],
];

const MainCardContainer = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  position: 'relative',
}));

const ProgressContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const MainCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6),
  },
}));

const MainCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(20),
  marginBottom: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(24),
  },
}));

const RadioGroupContainer = styled(RadioGroup)({
  display: 'flex',
  flexDirection: 'column',
});

const ButtonsContainer = styled(Grid)({
  marginTop: '24px',
});

const ProgressContainerOuter = styled(Grid)({
  marginTop: '12px',
  width: '100%',
});

function MainCard() {
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleSelection = (event) => {
    setSelectedSequence(Number(event.target.value));
    setCurrentCardIndex(1);
  };

  const handleNext = () => {
    if (selectedSequence !== null && currentCardIndex < questionCardSequences[selectedSequence].length) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 1) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else if (currentCardIndex === 1) {
      setSelectedSequence(null);
      setCurrentCardIndex(0);
    }
  };

  const progress = (currentCardIndex / (questionCardSequences[selectedSequence]?.length || 1)) * 100;

  return (
    <MainCardContainer>
      <ProgressContainer>
        <CircularProgress variant="determinate" value={progress} />
      </ProgressContainer>
      <MainCardContent>
        {selectedSequence === null ? (
          <>
            <MainCardTitle variant="h6" component="div">
              Select a question card sequence:
            </MainCardTitle>
            <RadioGroupContainer row onChange={handleSelection}>
              <FormControlLabel value="0" control={<Radio />} label="Sequence 1" />
              <FormControlLabel value="1" control={<Radio />} label="Sequence 2" />
              <FormControlLabel value="2" control={<Radio />} label="Sequence 3" />
            </RadioGroupContainer>
          </>
        ) : (
          <>
            {questionCardSequences[selectedSequence][currentCardIndex - 1]}
            <ButtonsContainer container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Button variant="contained" color="primary" onClick={handlePrevious}>
                  Previous
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button variant="contained" color="primary" onClick={handleNext}>
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
