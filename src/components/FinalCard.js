import React from "react";
import Typography from "@mui/material/Typography";
import { MainCardContainer, MainCardContent } from "./StyledComponents";

function FinalCard({ handleClear, age, id, sex, verdicts }) {
  const isVerdictsAvailable = verdicts && Object.keys(verdicts).length > 0;
  
  return (
    <MainCardContainer>
      <MainCardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Thank you!
        </Typography>
        <Typography variant="body1" component="div" paragraph>
          Age: {age}
        </Typography>
        <Typography variant="body1" component="div" paragraph>
          ID: {id}
        </Typography>
        <Typography variant="body1" component="div" paragraph>
          Sex: {sex}
        </Typography>
        {isVerdictsAvailable && (
          <Typography variant="body1" component="div" paragraph>
            Verdicts:
            <ul>
              {Object.entries(verdicts).map(([cardIndex, verdict]) => (
                <li key={cardIndex}>
                  Card {Number(cardIndex) + 1}: {verdict}
                </li>
              ))}
            </ul>
          </Typography>
        )}
      </MainCardContent>
    </MainCardContainer>
  );
}

export default FinalCard;