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
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";
import KeyboardDoubleArrowRightTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowRightTwoTone";

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
      currentGroup.questions.push({ ...question, index: index + 1 });
    } else {
      groups.push({
        subheading: question.subheading,
        questions: [{ ...question, index: index + 1 }],
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

  const styles = {
    prefixCell: {},
    tableCell: {},
    tableContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
  };

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
                        <KeyboardDoubleArrowRightTwoToneIcon
                          sx={{ marginRight: 1 }}
                        />
                      ) : (
                        <KeyboardArrowRightTwoToneIcon
                          sx={{ marginRight: 1 }}
                        />
                      )}
                      {question.text}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
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
                        <Grid item key={option} xs={4} sm={4} md={4}>
                          <FormControlLabel
                            value={option}
                            control={<Radio />}
                            label={option}
                            sx={{
                              marginLeft: "10px",
                              "& .MuiFormControlLabel-label": {
                                marginLeft: "1px",
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </RadioGroup>
                  </Grid>
                </QuestionContainer>
              ))}
            </React.Fragment>
          ))}
          <div style={styles.tableContainer}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "50%",
                border: "1px solid black",
                margin: "0 auto",
                textTransform: "uppercase", // Add text-transform property
              }}
            >
              <colgroup>
                <col style={{ width: "50%" }} />
                <col style={{ width: "1px", borderRight: "1px solid black" }} />
              </colgroup>
              <tbody>
                <tr>
                  <td
                    style={{
                      ...styles.prefixCell,
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    VERDICT: {/* Transform the text to uppercase */}
                  </td>
                  <td
                    style={{
                      ...styles.prefixCell,
                      textAlign: "center",
                      padding: "10px",
                      borderLeft: "1px solid black",
                    }}
                  >
                    {isCardComplete && (
                      <>
                        <span
                          style={{
                            fontWeight: "bold",
                            color:
                              localVerdict.toUpperCase() === "NO" ||
                              localVerdict.toUpperCase() === "ELIGIBLE"
                                ? "green"
                                : "red",
                          }}
                        >
                          {localVerdict}
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </StyledBox>
      </QuestionCardContent>
      <Box sx={{ flexGrow: 1 }}></Box>
    </QuestionCardContainer>
  );
}

export default QuestionCard;
