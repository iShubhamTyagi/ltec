import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const questions = [
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

const MainCardContainer = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const MainCardContent = styled(CardContent)({
  flex: "1 1 auto",
  overflow: "auto",
  padding: 0,
});

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: "bold",
}));

const QuestionContainer = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  paddingLeft: theme.spacing(2),
}));

function QuestionCard1b({ answers, setAnswers, currentCardIndex }) {
  const handleAnswer = (questionIndex, answer) => {
    // Calculate a unique index for the question
    const uniqueIndex =
      (currentCardIndex - 1) * questions.length + questionIndex;
    setAnswers(uniqueIndex, answer);
  };

  const groupedQuestions = questions.reduce((groups, question, index) => {
    const prevQuestion = questions[index - 1];
    const currentGroup = groups[groups.length - 1];

    if (prevQuestion && prevQuestion.subheading === question.subheading) {
      currentGroup.questions.push({ ...question, index });
    } else {
      groups.push({
        subheading: question.subheading,
        questions: [{ ...question, index }],
      });
    }

    return groups;
  }, []);

  return (
    <MainCardContainer>
      <MainCardContent>
        <StyledBox>
          <Typography
            variant="h5"
            component="div"
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            Is the Patient eligible for listing?
          </Typography>
          {groupedQuestions.map((group, groupIndex) => (
            <Box key={groupIndex} sx={{ marginBottom: 2 }}>
              {group.subheading && (
                <StyledTypography
                  variant="subtitle1"
                  component="div"
                  sx={{ textAlign: "left" }}
                >
                  {group.subheading}
                </StyledTypography>
              )}
              {group.questions.map((question) => (
                <QuestionContainer container key={question.index}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ textAlign: "left" }}
                    >
                      {question.text}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <RadioGroup
                      row
                      value={answers[`${currentCardIndex}-${question.index}`]} // Use the unique key to get the answer
                      onChange={(event) =>
                        handleAnswer(question.index, event.target.value)
                      }
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
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

export default QuestionCard1b;
