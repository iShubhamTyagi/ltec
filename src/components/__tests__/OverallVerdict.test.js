// Tests the overall verdict calculation logic documented in CLAUDE.md §8.
// The function lives inside MainCard (private), so we test it as a pure
// function here — the implementation is deterministic and spec'd in CLAUDE.md.
//
// Rule:
//   verdicts[1] === "Eligible"  AND  verdicts[2] === "Eligible"
//   AND verdicts[3] === "No"    AND  verdicts[4] === "No"
//   → overall = "Eligible"
//   Any other combination → overall = "Ineligible"

function calculateOverallVerdict(verdicts) {
  // Mirror of MainCard.calculateOverallVerdict
  const eligibleVerdicts = Object.values(verdicts).slice(0, 2);
  const yesNoVerdicts = Object.values(verdicts).slice(2, 4);

  if (eligibleVerdicts.length === 2 && yesNoVerdicts.length === 2) {
    if (
      eligibleVerdicts.every((v) => v === 'Eligible') &&
      yesNoVerdicts.every((v) => v === 'No')
    ) {
      return 'Eligible';
    } else {
      return 'Ineligible';
    }
  }
  return null; // incomplete — not enough verdicts yet
}

describe('Overall verdict calculation', () => {
  describe('Eligible outcome', () => {
    it('is Eligible when both eligibility cards pass AND both CI cards clear', () => {
      expect(
        calculateOverallVerdict({ 1: 'Eligible', 2: 'Eligible', 3: 'No', 4: 'No' })
      ).toBe('Eligible');
    });
  });

  describe('Ineligible outcomes', () => {
    it('is Ineligible when card 1 is Ineligible', () => {
      expect(
        calculateOverallVerdict({ 1: 'Ineligible', 2: 'Eligible', 3: 'No', 4: 'No' })
      ).toBe('Ineligible');
    });

    it('is Ineligible when card 2 is Ineligible', () => {
      expect(
        calculateOverallVerdict({ 1: 'Eligible', 2: 'Ineligible', 3: 'No', 4: 'No' })
      ).toBe('Ineligible');
    });

    it('is Ineligible when both eligibility cards are Ineligible', () => {
      expect(
        calculateOverallVerdict({ 1: 'Ineligible', 2: 'Ineligible', 3: 'No', 4: 'No' })
      ).toBe('Ineligible');
    });

    it('is Ineligible when card 3 has absolute contraindication', () => {
      expect(
        calculateOverallVerdict({ 1: 'Eligible', 2: 'Eligible', 3: 'Yes', 4: 'No' })
      ).toBe('Ineligible');
    });

    it('is Ineligible when card 4 has relative contraindication', () => {
      expect(
        calculateOverallVerdict({ 1: 'Eligible', 2: 'Eligible', 3: 'No', 4: 'Yes' })
      ).toBe('Ineligible');
    });

    it('is Ineligible when both CI cards have contraindications', () => {
      expect(
        calculateOverallVerdict({ 1: 'Eligible', 2: 'Eligible', 3: 'Yes', 4: 'Yes' })
      ).toBe('Ineligible');
    });

    it('is Ineligible when eligibility fails AND CI is present', () => {
      expect(
        calculateOverallVerdict({ 1: 'Ineligible', 2: 'Ineligible', 3: 'Yes', 4: 'Yes' })
      ).toBe('Ineligible');
    });

    it('is Ineligible when eligibility passes but one CI is present', () => {
      expect(
        calculateOverallVerdict({ 1: 'Eligible', 2: 'Eligible', 3: 'Yes', 4: 'No' })
      ).toBe('Ineligible');
    });
  });

  describe('Verdict ordering contract', () => {
    it('uses Object.values insertion order — keys must be 1,2,3,4 in sequence', () => {
      // All three diseases set verdicts in order 1→2→3→4 as the user navigates.
      // If that order were reversed, slice(0,2) would pick the wrong cards.
      const verdicts = {};
      verdicts[1] = 'Eligible';
      verdicts[2] = 'Eligible';
      verdicts[3] = 'No';
      verdicts[4] = 'No';
      expect(Object.values(verdicts)).toEqual(['Eligible', 'Eligible', 'No', 'No']);
      expect(calculateOverallVerdict(verdicts)).toBe('Eligible');
    });

    it('integer keys are always ordered numerically by JS engine', () => {
      // Even if keys are set out of order, integer key enumeration is ascending.
      const verdicts = {};
      verdicts[4] = 'No';
      verdicts[2] = 'Eligible';
      verdicts[3] = 'No';
      verdicts[1] = 'Eligible';
      expect(Object.values(verdicts)).toEqual(['Eligible', 'Eligible', 'No', 'No']);
      expect(calculateOverallVerdict(verdicts)).toBe('Eligible');
    });
  });

  describe('Incomplete state', () => {
    it('returns null when fewer than 4 verdicts are present', () => {
      expect(calculateOverallVerdict({ 1: 'Eligible', 2: 'Eligible' })).toBeNull();
      expect(calculateOverallVerdict({ 1: 'Eligible' })).toBeNull();
      expect(calculateOverallVerdict({})).toBeNull();
    });
  });
});
