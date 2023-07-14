function validateFirstTwoCards(answers) {
  const isAnyAnswerYes = Object.values(answers).some(
    (answer) => answer === "Yes"
  );
  return isAnyAnswerYes ? "Eligible" : "Ineligible";
}

function validateLastTwoCards(answers) {
  const isAnyAnswerYes = Object.values(answers).some(
    (answer) => answer === "Yes"
  );
  return isAnyAnswerYes ? "Yes" : "No";
}

function ValidationLogic({ questionCardIndex, answers }) {
  let verdict = "";

  if (questionCardIndex <= 2) {
    // First or second card
    verdict = validateFirstTwoCards(answers);
  } else if (questionCardIndex > 2 && questionCardIndex <= 4) {
    // Third or fourth card
    verdict = validateLastTwoCards(answers);
  }

  return verdict;
}

export default ValidationLogic;
