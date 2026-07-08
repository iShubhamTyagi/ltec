import React from "react";

const CARD_LABELS = {
  "1": "For Referral:",
  "2": "For Listing:",
  "3": "Contra Indications (Absolute):",
  "4": "Contra Indications (Relative):",
};

function verdictClass(verdict) {
  if (!verdict) return "";
  const v = verdict.toLowerCase();
  return v === "eligible" || v === "no" ? "pos" : "neg";
}

function FinalCard({ handleClear, age, id, sex, verdicts, overallVerdict }) {
  const isVerdictsAvailable = verdicts && Object.keys(verdicts).length > 0;
  const heroClass = verdictClass(overallVerdict);

  return (
    <main className="page page-final">
      <div className="final card">
        <div className={`final-hero${heroClass ? " " + heroClass : ""}`}>
          <div className="fh-eyebrow">Assessment Complete</div>
          <div className="fh-icon">
            {heroClass === "pos" ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>
          <div
            className="fh-verdict"
            data-testid="overall-verdict"
          >
            {overallVerdict ? overallVerdict.toUpperCase() : ""}
          </div>
          <p className="fh-note">
            {heroClass === "pos"
              ? "Patient meets criteria for lung transplant eligibility."
              : "Patient does not meet all criteria at this time."}
          </p>
        </div>

        <div className="final-meta">
          <div className="fm">
            <div className="k">AGE</div>
            <div className="v">{age}</div>
          </div>
          <div className="fm">
            <div className="k">PATIENT ID</div>
            <div className="v mono">{id}</div>
          </div>
          <div className="fm">
            <div className="k">SEX</div>
            <div className="v">{sex}</div>
          </div>
        </div>

        {isVerdictsAvailable && (
          <div className="final-breakdown">
            <h3>Assessment Breakdown</h3>
            {Object.entries(verdicts).map(([cardIndex, verdict]) => {
              const vc = verdictClass(verdict);
              return (
                <div key={cardIndex} className="brk-row">
                  <span className="lbl">{CARD_LABELS[cardIndex] || cardIndex}</span>
                  <span className={`brk-pill${vc ? " " + vc : ""}`}>
                    {vc === "pos" ? "✓" : "✗"}&nbsp;{verdict ? verdict.toUpperCase() : ""}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="final-actions">
          <button className="btn btn-ghost" onClick={handleClear}>
            Start Again
          </button>
        </div>
      </div>
    </main>
  );
}

export default FinalCard;
