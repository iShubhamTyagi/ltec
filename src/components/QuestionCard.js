import React from 'react';
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Box,
} from '@mui/material';
import { QuestionCardContainer, QuestionContainer, QuestionCardContent, StyledBox, StyledTypography } from './StyledComponents';



function QuestionCard({ questions, answers, setAnswers, currentCardIndex, title }) {
  
  
  const handleAnswer = (questionIndex, answer) => {
    const uniqueIndex = `${currentCardIndex}-${questionIndex}`;
    setAnswers(uniqueIndex, answer);
  };

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
    <QuestionCardContainer>
      <QuestionCardContent>
        <StyledBox>
          <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'left' }}>
            {title}
          </Typography>
          {groupedQuestions.map((group, groupIndex) => (
            <Box key={groupIndex} sx={{ marginBottom: 2 }}>
              {group.subheading && (
                <StyledTypography variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                  {group.subheading}
                </StyledTypography>
              )}
              {group.questions.map((question) => (
                <QuestionContainer container key={question.index}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" component="div" sx={{ textAlign: 'left' }}>
                      {question.text}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <RadioGroup
                      row
                      value={answers[`${currentCardIndex}-${question.index}`]}
                      onChange={(event) => handleAnswer(question.index, event.target.value)}
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
      </QuestionCardContent>
      <Box sx={{ flexGrow: 1 }}></Box>
    </QuestionCardContainer>
  );
}

export default QuestionCard;