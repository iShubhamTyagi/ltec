import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
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
    <Card>
      <CardContent>
        {selectedSequence === null ? (
          <>
            <Typography variant="h6" component="div">
              Select a question card sequence:
            </Typography>
            <RadioGroup row onChange={handleSelection}>
              <FormControlLabel value="0" control={<Radio />} label="Sequence 1" />
              <FormControlLabel value="1" control={<Radio />} label="Sequence 2" />
              <FormControlLabel value="2" control={<Radio />} label="Sequence 3" />
            </RadioGroup>
          </>
        ) : (
          <>
            {questionCardSequences[selectedSequence][currentCardIndex - 1]}
            <Button variant="contained" color="primary" onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </>
        )}
        <LinearProgress variant="determinate" value={progress} />
      </CardContent>
    </Card>
  );
}

export default MainCard;
