import ValidationLogic from '../ValidationLogic';

// ─────────────────────────────────────────────────────────────────────────────
// Cards 1 & 2 — Eligibility
// Rule: any "Yes" answer → "Eligible"; otherwise → "Ineligible"
// ─────────────────────────────────────────────────────────────────────────────
describe('ValidationLogic — Cards 1 & 2 (eligibility)', () => {
  it('returns "Eligible" when the only answer is Yes', () => {
    expect(ValidationLogic({ questionCardIndex: 1, answers: { 1: 'Yes' } })).toBe('Eligible');
    expect(ValidationLogic({ questionCardIndex: 2, answers: { 1: 'Yes' } })).toBe('Eligible');
  });

  it('returns "Eligible" when at least one of many answers is Yes', () => {
    expect(ValidationLogic({ questionCardIndex: 1, answers: { 1: 'No', 2: 'Yes', 3: 'No' } })).toBe('Eligible');
    expect(ValidationLogic({ questionCardIndex: 2, answers: { 1: 'n.a.', 2: 'No', 3: 'Yes' } })).toBe('Eligible');
  });

  it('returns "Ineligible" when all answers are No', () => {
    expect(ValidationLogic({ questionCardIndex: 1, answers: { 1: 'No', 2: 'No' } })).toBe('Ineligible');
    expect(ValidationLogic({ questionCardIndex: 2, answers: { 1: 'No', 2: 'No', 3: 'No' } })).toBe('Ineligible');
  });

  it('returns "Ineligible" when all answers are n.a.', () => {
    expect(ValidationLogic({ questionCardIndex: 1, answers: { 1: 'n.a.', 2: 'n.a.' } })).toBe('Ineligible');
  });

  it('returns "Ineligible" when answers are a mix of No and n.a. (no Yes)', () => {
    expect(ValidationLogic({ questionCardIndex: 1, answers: { 1: 'No', 2: 'n.a.', 3: 'No' } })).toBe('Ineligible');
  });

  it('returns "Ineligible" for empty answers on card 1', () => {
    expect(ValidationLogic({ questionCardIndex: 1, answers: {} })).toBe('Ineligible');
  });

  it('returns "Ineligible" for empty answers on card 2', () => {
    expect(ValidationLogic({ questionCardIndex: 2, answers: {} })).toBe('Ineligible');
  });

  it('treats "n.a." as non-Yes on both cards', () => {
    expect(ValidationLogic({ questionCardIndex: 1, answers: { 1: 'n.a.' } })).toBe('Ineligible');
    expect(ValidationLogic({ questionCardIndex: 2, answers: { 1: 'n.a.' } })).toBe('Ineligible');
  });

  it('all Yes answers → Eligible', () => {
    expect(ValidationLogic({ questionCardIndex: 1, answers: { 1: 'Yes', 2: 'Yes', 3: 'Yes' } })).toBe('Eligible');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Cards 3 & 4 — Contraindications
// Rule: any "Yes" answer → "Yes" (CI present); otherwise → "No"
// ─────────────────────────────────────────────────────────────────────────────
describe('ValidationLogic — Cards 3 & 4 (contraindications)', () => {
  it('returns "Yes" (CI present) when the only answer is Yes', () => {
    expect(ValidationLogic({ questionCardIndex: 3, answers: { 1: 'Yes' } })).toBe('Yes');
    expect(ValidationLogic({ questionCardIndex: 4, answers: { 1: 'Yes' } })).toBe('Yes');
  });

  it('returns "Yes" when at least one of many answers is Yes', () => {
    expect(ValidationLogic({ questionCardIndex: 3, answers: { 1: 'No', 2: 'Yes', 3: 'No' } })).toBe('Yes');
    expect(ValidationLogic({ questionCardIndex: 4, answers: { 1: 'n.a.', 2: 'No', 3: 'Yes' } })).toBe('Yes');
  });

  it('returns "No" (no CI) when all answers are No', () => {
    expect(ValidationLogic({ questionCardIndex: 3, answers: { 1: 'No', 2: 'No' } })).toBe('No');
    expect(ValidationLogic({ questionCardIndex: 4, answers: { 1: 'No', 2: 'No', 3: 'No' } })).toBe('No');
  });

  it('returns "No" when all answers are n.a.', () => {
    expect(ValidationLogic({ questionCardIndex: 3, answers: { 1: 'n.a.', 2: 'n.a.' } })).toBe('No');
  });

  it('returns "No" for empty answers on card 3', () => {
    expect(ValidationLogic({ questionCardIndex: 3, answers: {} })).toBe('No');
  });

  it('returns "No" for empty answers on card 4', () => {
    expect(ValidationLogic({ questionCardIndex: 4, answers: {} })).toBe('No');
  });

  it('treats "n.a." as non-Yes on both cards', () => {
    expect(ValidationLogic({ questionCardIndex: 3, answers: { 1: 'n.a.' } })).toBe('No');
    expect(ValidationLogic({ questionCardIndex: 4, answers: { 1: 'n.a.' } })).toBe('No');
  });

  it('all Yes answers → "Yes"', () => {
    expect(ValidationLogic({ questionCardIndex: 3, answers: { 1: 'Yes', 2: 'Yes' } })).toBe('Yes');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Color-coding contract (green vs red)
// This ensures the UI color rules documented in CLAUDE.md map correctly.
// green = "Eligible" or "No"  |  red = "Ineligible" or "Yes"
// ─────────────────────────────────────────────────────────────────────────────
describe('ValidationLogic — color-coding contract', () => {
  it('positive (green) outcomes: Eligible for cards 1-2', () => {
    const result = ValidationLogic({ questionCardIndex: 1, answers: { 1: 'Yes' } });
    expect(result).toBe('Eligible'); // maps to green
  });

  it('negative (red) outcome: Ineligible for cards 1-2', () => {
    const result = ValidationLogic({ questionCardIndex: 2, answers: { 1: 'No' } });
    expect(result).toBe('Ineligible'); // maps to red
  });

  it('positive (green) outcome: No for cards 3-4 (no contraindication)', () => {
    const result = ValidationLogic({ questionCardIndex: 3, answers: { 1: 'No' } });
    expect(result).toBe('No'); // maps to green
  });

  it('negative (red) outcome: Yes for cards 3-4 (contraindication present)', () => {
    const result = ValidationLogic({ questionCardIndex: 4, answers: { 1: 'Yes' } });
    expect(result).toBe('Yes'); // maps to red
  });
});
