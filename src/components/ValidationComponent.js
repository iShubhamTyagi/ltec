import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

function ValidationComponent({ answers, questions }) {
  const [verdict, setVerdict] = useState("");

  useEffect(() => {
    if (questions && questions.length > 0) {
      const allAnswered = Object.keys(answers).length === questions.length;
      if (allAnswered) {
        const isEligible = questions.some(
          (question) => answers[question.index] === "Yes"
        );
        const result = isEligible ? "Eligible" : "Ineligible";
        setVerdict(result);
      } else {
        setVerdict("");
      }
    }
  }, [answers, questions]);

  if (!verdict || !questions || questions.length === 0) {
    return null; // Don't display the verdict until all questions are answered
  }

  return (
    <Typography
      variant="h6"
      component="div"
      color={verdict === "Eligible" ? "green" : "red"}
    >
      Verdict: {verdict}
    </Typography>
  );
}

export default ValidationComponent;
