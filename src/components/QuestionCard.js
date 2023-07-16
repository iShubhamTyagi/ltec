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
import ValidationLogic from "./ValidationLogic";
import Divider from "@mui/material/Divider";
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';

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
  const [answersOnCurrentCard, setAnswersOnCurrentCard] = useState({});

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
    const cardVerdict = ValidationLogic({
      questionCardIndex: currentCardIndex,
      answers: answersOnCurrentCard,
    });
    setLocalVerdict(cardVerdict);
    setVerdict(currentCardIndex, cardVerdict);
  };

  const handleAnswer = (questionIndex, answer) => {
    setAnswersOnCurrentCard((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
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

  useEffect(() => {
    getCardVerdict();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answersOnCurrentCard, currentCardIndex]);

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
            <React.Fragment key={groupIndex}>
              {groupIndex !== 0 && <Divider sx={{ marginBottom: 2 }} />}
              {group.subheading && (
                <>
                  <StyledTypography
                    variant="subtitle1"
                    component="div"
                    sx={{ textAlign: "left" }}
                  >
                    {group.subheading}
                  </StyledTypography>
                  <Divider sx={{ marginBottom: 2 }} />
                </>
              )}
              {group.questions.map((question, questionIndex) => (
                <QuestionContainer key={question.index}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "left",
                        paddingLeft: group.subheading ? "20px" : "0",
                      }}
                    >
                      {group.subheading ? (
                        <KeyboardDoubleArrowRightTwoToneIcon sx={{ marginRight: 1 }} />
                      ) : (
                        <KeyboardArrowRightTwoToneIcon sx={{ marginRight: 1 }} />
                      )}
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
                        answersOnCurrentCard[question.index] ||
                        answers[`${currentCardIndex}-${question.index}`] ||
                        ""
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
            </React.Fragment>
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
