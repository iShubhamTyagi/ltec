import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

const questions = [
  "Card C1",
  "Question 2?",
  "Question 3?",
  "Question 4?",
  "Question 5?",
];

function QuestionCardc1() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  return (
    <Card>
      <CardContent>
        {questions.map((question, index) => (
          <Grid container alignItems="center" spacing={2} key={index}>
            <Grid item xs={8}>
              <Typography variant="h6" component="div">
                {question}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <RadioGroup row value={answers[index]} onChange={(event) => handleAnswer(index, event.target.value)}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
}

export default QuestionCardc1;
