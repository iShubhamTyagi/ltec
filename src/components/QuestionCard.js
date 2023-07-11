import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  QuestionCardContainer,
  QuestionContainer,
  QuestionCardContent,
  StyledBox,
  StyledTypography,
} from "./StyledComponents";

function QuestionCard({
  questions,
  answers,
  setAnswers,
  setVerdict,
  currentCardIndex,
  title,
}) {
  const [localVerdict, setLocalVerdict] = useState("");
  const [isCardComplete, setIsCardComplete] = useState(false);

  const questionGroups = questions.reduce((groups, question, index) => {
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

  const getCardVerdict = () => {
    const hasYesAnswer = questionGroups.some((group) =>
      group.questions.some(
        (question) => answers[`${currentCardIndex}-${question.index}`] === "Yes"
      )
    );

    const cardVerdict = hasYesAnswer ? "Eligible" : "Ineligible";
    setLocalVerdict(cardVerdict);
    setVerdict(currentCardIndex, cardVerdict);
  };

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(questionIndex, answer);
  };

  useEffect(() => {
    setIsCardComplete(
      questionGroups.every((group) =>
        group.questions.every((question) =>
          answers.hasOwnProperty(`${currentCardIndex}-${question.index}`)
        )
      )
    );
  }, [answers, currentCardIndex, questionGroups]);

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getCardVerdict();
  }, [answers, currentCardIndex]);

  return (
    <QuestionCardContainer>
      <QuestionCardContent>
        <StyledBox>
          <Typography
            variant="h5"
            component="div"
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            {title}
          </Typography>
          {questionGroups.map((group, groupIndex) => (
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
                <QuestionContainer key={question.index}>
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
                      value={
                        answers[`${currentCardIndex}-${question.index}`] || ""
                      }
                      onChange={(event) =>
                        handleAnswer(question.index, event.target.value)
                      }
                    >
                      {["Yes", "No", "n.a."].map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </Grid>
                </QuestionContainer>
              ))}
            </Box>
          ))}
          {isCardComplete && (
            <Typography
              variant="body1"
              component="div"
              sx={{ textAlign: "left", marginTop: 2 }}
            >
              Verdict: {localVerdict}
            </Typography>
          )}
        </StyledBox>
      </QuestionCardContent>
      <Box sx={{ flexGrow: 1 }}></Box>
    </QuestionCardContainer>
  );
}

export default QuestionCard;
