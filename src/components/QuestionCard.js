import React, { useState, useEffect } from "react";
import ValidationLogic from "./ValidationLogic";

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

  const isPositive =
    localVerdict === "Eligible" || localVerdict === "No";

  const answeredCount = questionGroups.reduce(
    (n, g) =>
      n +
      g.questions.filter((q) =>
        answers.hasOwnProperty(`${currentCardIndex}-${q.index}`)
      ).length,
    0
  );
  const totalCount = questions.length;

  return (
    <div className="card qcard">
      <div className="qcard-head">
        <div className="qcard-eyebrow">Card {currentCardIndex} of 4</div>
        <h2 className="qcard-title">{title}</h2>
      </div>
      <div className="qbody">
        {questionGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`qgroup${group.subheading ? " grouped" : ""}`}
          >
            {group.subheading && (
              <div className="qgroup-sub">
                <div className="bar" />
                <span>{group.subheading}</span>
              </div>
            )}
            <div className="qgroup-card">
              {group.questions.map((question) => {
                const value =
                  answersOnCurrentCard[question.index] ||
                  answers[`${currentCardIndex}-${question.index}`] ||
                  "";
                return (
                  <div
                    key={question.index}
                    className={`qrow${value ? " answered" : ""}`}
                  >
                    <div className="qrow-text">
                      <span className="qnum">{question.index}.</span>
                      <span className="qtext">{question.text}</span>
                    </div>
                    <div className="qrow-ctrl">
                      <div className="seg">
                        {["Yes", "No", "n.a."].map((option) => {
                          const selected = value === option;
                          const modifier = selected
                            ? option === "Yes"
                              ? "on-yes"
                              : option === "No"
                              ? "on-no"
                              : "on-na"
                            : "";
                          return (
                            <label
                              key={option}
                              className={`seg-btn${modifier ? " " + modifier : ""}`}
                            >
                              <input
                                type="radio"
                                name={`q-${currentCardIndex}-${question.index}`}
                                value={option}
                                checked={selected}
                                onChange={() =>
                                  handleAnswer(question.index, option)
                                }
                                style={{
                                  position: "absolute",
                                  opacity: 0,
                                  width: 0,
                                  height: 0,
                                }}
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div
          className={`verdict-bar${
            isCardComplete ? (isPositive ? " pos" : " neg") : " incomplete"
          }`}
        >
          <div className="vb-left">
            <div className="vb-label" data-testid="verdict-display">
              <span className="k">VERDICT</span>
              <span className="v">
                {isCardComplete ? localVerdict : "Answer all questions"}
              </span>
            </div>
            <span className="vb-count">
              {answeredCount} / {totalCount} answered
            </span>
          </div>
          {isCardComplete && (
            <div className={`vb-badge${isPositive ? " pos" : " neg"}`}>
              {isPositive ? "✓" : "✗"}&nbsp;
              {currentCardIndex <= 2
                ? isPositive
                  ? "Eligible"
                  : "Ineligible"
                : isPositive
                ? "No CI"
                : "CI Present"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
