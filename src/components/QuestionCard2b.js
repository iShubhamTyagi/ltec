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
    text: 'FVC > 10%',
    subheading: 'Pulmonary Fibrosis with past 6 months absolute decline',
  },
  {
    text: 'DLCO > 10%',
    subheading: 'Pulmonary Fibrosis with past 6 months absolute decline',
  },
  {
    text: 'FVC > 5% with radiological worsening',
    subheading: 'Pulmonary Fibrosis with past 6 months absolute decline',
  },
  {
    text: '6 minute walk test SPO2 < 88% / 50 mtrs decline in 6 month',
    subheading: null,
  },
  {
    text: 'Pulmonary hypertension',
    subheading: null,
  },
  {
    text: 'Hospitalisation due to exacerbation/pneumothorax/respiratory decline',
    subheading: null,
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

function QuestionCard2b({ answers, setAnswers }) {
  const handleAnswer = (index, answer) => {
    setAnswers(index, answer);
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
          Is the Patient eligible for listing?
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

export default QuestionCard2b;
