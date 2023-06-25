import React, { useState } from 'react';
import QuestionCard1a from './QuestionCard1a';
import QuestionCard1b from './QuestionCard1b';
import QuestionCard2a from './QuestionCard2a';
import QuestionCard2b from './QuestionCard2b';
import QuestionCard3a from './QuestionCard3a';
import QuestionCard3b from './QuestionCard3b';
import QuestionCardc1 from './QuestionCardc1';
import QuestionCardc2 from './QuestionCardc2';
import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, Button, Grid, CircularProgress, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainCardContainer = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  height: '100vh', // Set container height to fill the available vertical space
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
  position: 'relative',
  overflow: 'auto',
  maxHeight: 'calc(100% - 70px)', // Adjust the max height based on your layout
  height: '100%', // Utilize the available vertical space

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

const UserSelection = styled(Typography)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  background: theme.palette.background.paper,
  padding: theme.spacing(2),
  zIndex: 1,
}));

const questionCardSequences = [
  {
    label: 'COPD',
    cards: [<QuestionCard1a />, <QuestionCard1b />, <QuestionCardc1 />, <QuestionCardc2 />],
  },
  {
    label: 'ILD',
    cards: [<QuestionCard2a />, <QuestionCard2b />, <QuestionCardc1 />, <QuestionCardc2 />],
  },
  {
    label: 'Bronchiectasis',
    cards: [<QuestionCard3a />, <QuestionCard3b />, <QuestionCardc1 />, <QuestionCardc2 />],
  },
];

function MainCard() {
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userSelection, setUserSelection] = useState('');

  const handleSelection = (event) => {
    const sequence = Number(event.target.value);
    setSelectedSequence(sequence);
    setCurrentCardIndex(1);
    setUserSelection(questionCardSequences[sequence].label);
  };

  const handleNext = () => {
    if (selectedSequence !== null && currentCardIndex < questionCardSequences[selectedSequence].cards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 1) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else if (currentCardIndex === 1) {
      setSelectedSequence(null);
      setCurrentCardIndex(0);
      setUserSelection('');
    }
  };

  const progress = (currentCardIndex / (questionCardSequences[selectedSequence]?.cards.length || 1)) * 100;

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
                <FormControlLabel key={index} value={index.toString()} control={<Radio />} label={sequence.label} />
              ))}
            </RadioGroupContainer>
          </>
        ) : (
          <>
            {questionCardSequences[selectedSequence].cards.map((card, index) => (
              <div key={index} style={{ display: index === currentCardIndex - 1 ? 'block' : 'none' }}>
                {card}
              </div>
            ))}
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
