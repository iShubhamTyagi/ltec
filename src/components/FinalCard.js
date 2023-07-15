import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MainCardContainer, MainCardContent } from "./StyledComponents";

function VerdictRow({ prefix, verdict }) {
  let textColor = "black";
  if (
    verdict &&
    (verdict.toLowerCase() === "eligible" || verdict.toLowerCase() === "no")
  ) {
    textColor = "green";
  } else if (
    verdict &&
    (verdict.toLowerCase() === "ineligible" || verdict.toLowerCase() === "yes")
  ) {
    textColor = "red";
  }

  return (
    <tr>
      <td style={styles.prefixCell}>{prefix}</td>
      <td style={{ ...styles.tableCell, color: textColor }}>
        {verdict ? verdict.toUpperCase() : ""}
      </td>
    </tr>
  );
}

function FinalCard({ handleClear, age, id, sex, verdicts, overallVerdict }) {
  const isVerdictsAvailable = verdicts && Object.keys(verdicts).length > 0;

  return (
    <MainCardContainer>
      <MainCardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Thank you!
        </Typography>
        <div style={styles.tableContainer}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <colgroup>
              <col style={{ width: "30%" }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td style={{ ...styles.prefixCell, textAlign: "left" }}>
                  Age:
                </td>
                <td style={{ ...styles.tableCell, textAlign: "left" }}>
                  {age}
                </td>
              </tr>
              <tr>
                <td style={{ ...styles.prefixCell, textAlign: "left" }}>
                  ID:
                </td>
                <td style={{ ...styles.tableCell, textAlign: "left" }}>
                  {id}
                </td>
              </tr>
              <tr>
                <td style={{ ...styles.prefixCell, textAlign: "left" }}>
                  Sex:
                </td>
                <td style={{ ...styles.tableCell, textAlign: "left" }}>
                  {sex}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    ...styles.prefixCell,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  colSpan={2}
                >
                  <div>
                    Verdict :{" "}
                    <span
                      style={{
                        marginLeft: "2px",
                        color: overallVerdict === "Eligible" ? "green" : "red",
                      }}
                    >
                      {overallVerdict ? overallVerdict.toUpperCase() : ""}
                    </span>
                  </div>
                </td>
              </tr>
              {isVerdictsAvailable &&
                Object.entries(verdicts).map(([cardIndex, verdict]) => (
                  <VerdictRow
                    key={cardIndex}
                    prefix={
                      cardIndex === "1"
                        ? "For Referral:"
                        : cardIndex === "2"
                        ? "For Listing:"
                        : cardIndex === "3"
                        ? "Contra Indications (Absolute):"
                        : cardIndex === "4"
                        ? "Contra Indications (Relative):"
                        : ""
                    }
                    verdict={verdict}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button variant="outlined" color="primary" onClick={handleClear}>
            Start Again
          </Button>
        </div>
      </MainCardContent>
    </MainCardContainer>
  );
}

export default FinalCard;

const styles = {
  prefixCell: {
    border: "1px solid black",
    padding: "8px",
    whiteSpace: "nowrap",
    textAlign: "left",
  },
  tableCell: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  },
  tableContainer: {
    maxWidth: "80%",
    margin: "0 auto",
  },
};
