import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';

const questions = [
  {
    text: 'Card 1a',
    subheading: null,
  },
  {
    text: 'Question 2?',
    subheading: 'Group 1',
  },
  {
    text: 'Question 3?',
    subheading: 'Group 1',
  },
  {
    text: 'Question 4?',
    subheading: 'Group 2',
  },
  {
    text: 'Clinical Deterioration on maximal therapy (including oxygen, NIV, rehabilitation)',
    subheading: 'Group 2',
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

function QuestionCard1a({ answers, setAnswers }) {
  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
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
              {group.questions.map((question) => (
                <QuestionContainer container key={question.index}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" component="div">
                      {question.text}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <RadioGroup
                      row
                      value={answers[question.index]}
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
      </MainCardContent>
      <Box sx={{ flexGrow: 1 }}></Box> {/* Fill the remaining space */}
    </MainCardContainer>
  );
}

export default QuestionCard1a;
