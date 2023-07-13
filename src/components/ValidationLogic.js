
function ValidationLogic({ questionCardIndex, answers }) {
  let isEligible = false;
  if (questionCardIndex <= 2) {
    // First or second card
    isEligible = Object.values(answers).some((answer) => answer === "Yes");
  } else if (questionCardIndex > 2 && questionCardIndex <= 4) {
    // Third or fourth card
    isEligible = !Object.values(answers).some((answer) => answer === "Yes");
  }

  return isEligible ? "Eligible" : "Ineligible";
}

export default ValidationLogic;
