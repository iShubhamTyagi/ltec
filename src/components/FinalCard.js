// FinalCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const MainCardContainer = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MainCardContent = styled(CardContent)({
  flex: '1 1 auto',
  overflow: 'auto',
  padding: 0,
});

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

function FinalCard({ answers }) {
  const verdict = Object.values(answers).some(answer => answer === 'Yes') ? 'Eligible' : 'Ineligible';
  const verdictColor = verdict === 'Eligible' ? 'green' : 'red';

  return (
    <MainCardContainer>
      <MainCardContent>
        <StyledBox>
          <Typography variant="h5" component="div" sx={{ marginBottom: 2, textAlign: 'left', color: verdictColor }}>
            Verdict: {verdict}
          </Typography>
        </StyledBox>
      </MainCardContent>
      <Box sx={{ flexGrow: 1 }}></Box>
    </MainCardContainer>
  );
}

export default FinalCard;