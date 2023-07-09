import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  QuestionCardContainer,
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

  const getCardVerdict = () => {
    const hasYesAnswer = questions.some((question) =>
      answers[`${currentCardIndex}-${question.index}`] === "Yes"
    );

    const cardVerdict = hasYesAnswer ? "Eligible" : "Ineligible";
    setLocalVerdict(cardVerdict);
    setVerdict(currentCardIndex, cardVerdict);
  };

  const handleAnswer = (questionIndex, answer) => {
    const updatedAnswers = {
      ...answers,
      [`${currentCardIndex}-${questionIndex}`]: answer,
    };

    setAnswers(questionIndex, answer);
  };

  useEffect(() => {
    setIsCardComplete(
      questions.every((question) =>
        answers.hasOwnProperty(`${currentCardIndex}-${question.index}`)
      )
    );
  }, [answers, currentCardIndex, questions]);

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
          {questions.map((question) => (
            <Box key={question.index} sx={{ marginBottom: 2 }}>
              <Grid container>
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
                    value={answers[`${currentCardIndex}-${question.index}`] || ""}
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
              </Grid>
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
    </QuestionCardContainer>
  );
}

export default QuestionCard;
