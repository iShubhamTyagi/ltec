import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const questions = [
  {
    text: "Card 3b",
    subheading: null,
  },
  {
    text: "Question 2?",
    subheading: "Group 1",
  },
  {
    text: "Question 3?",
    subheading: "Group 1",
  },
  {
    text: "Question 4?",
    subheading: "Group 2",
  },
  {
    text: "Clinical Deterioration on maximal therapy (including oxygen, NIV, rehabilitation)",
    subheading: "Group 2",
  },
];

const MainCardContainer = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MainCardContent = styled(CardContent)({
  flex: '1 1 auto',
  overflow: 'auto',
  padding: 0,
});

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 'bold',
}));

const QuestionContainer = styled(Grid)(({ theme }) => ({
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));

function QuestionCard3b() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isMobile, setIsMobile] = useState(false);

  const handleAnswer = (groupIndex, questionIndex, answer) => {
    const updatedAnswers = [...answers];
    const index = groupedQuestions[groupIndex].questions[questionIndex].index;
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 600); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', updateViewport);
    updateViewport();

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const groupedQuestions = questions.reduce((groups, question, index) => {
    const prevQuestion = questions[index - 1];
    const currentGroup = groups[groups.length - 1];

    if (prevQuestion && prevQuestion.subheading === question.subheading) {
      currentGroup.questions.push({ ...question, index });
    } else {
      groups.push({ subheading: question.subheading, questions: [{ ...question, index }] });
    }

    return groups;
  }, []);

  return (
    <MainCardContainer>
      <MainCardContent>
        <StyledBox>
          <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'left' }}>
            General Heading
          </Typography>
          {groupedQuestions.map((group, groupIndex) => (
            <Box key={groupIndex} sx={{ marginBottom: 2 }}>
              {group.subheading && (
                <StyledTypography variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                  {group.subheading}
                </StyledTypography>
              )}
              {group.questions.map((question, questionIndex) => (
                <QuestionContainer container key={questionIndex}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" component="div">
                      {question.text}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <RadioGroup
                      row
                      value={answers[question.index]}
                      onChange={(event) => handleAnswer(groupIndex, questionIndex, event.target.value)}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                </QuestionContainer>
              ))}
            </Box>
          ))}
        </StyledBox>
      </MainCardContent>
      <Box sx={{ flexGrow: 1 }}></Box> {/* Fill the remaining space */}
    </MainCardContainer>
  );
}

export default QuestionCard3b;
