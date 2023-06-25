import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, Grid, Box } from '@mui/material';

const questions = [
  "Card 1a",
  "Question 2?",
  "Question 3?",
  "Question 4?",
  "Clinical Deterioration on maximal therapy (including oxygen, NIV, rehabilitation)",
];

function QuestionCard1a() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isMobile, setIsMobile] = useState(false);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 600); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', updateViewport);
    updateViewport();

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 1 auto', overflow: 'auto', padding: 0 }}>
        <Box sx={{ padding: 2 }}>
          {questions.map((question, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      width: '100%',
                      paddingRight: isMobile ? 'inherit' : '32px', // Add extra right padding for mobile view
                    }}
                  >
                    {question}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <RadioGroup
                    row
                    value={answers[index]}
                    onChange={(event) => handleAnswer(index, event.target.value)}
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}></Box> {/* Fill the remaining space */}
    </Card>
  );
}

export default QuestionCard1a;
