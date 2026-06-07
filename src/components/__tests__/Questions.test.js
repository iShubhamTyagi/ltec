import {
  questionsForCard1a,
  questionsForCard1b,
  questionsForCard2a,
  questionsForCard2b,
  questionsForCard3a,
  questionsForCard3b,
  questionsForCardc1,
  questionsForCardc2,
} from '../Questions';

const ALL_ARRAYS = [
  ['questionsForCard1a (COPD referral)',           questionsForCard1a],
  ['questionsForCard1b (COPD listing)',            questionsForCard1b],
  ['questionsForCard2a (ILD referral)',            questionsForCard2a],
  ['questionsForCard2b (ILD listing)',             questionsForCard2b],
  ['questionsForCard3a (Bronchiectasis referral)', questionsForCard3a],
  ['questionsForCard3b (Bronchiectasis listing)',  questionsForCard3b],
  ['questionsForCardc1 (Absolute CI)',             questionsForCardc1],
  ['questionsForCardc2 (Relative CI)',             questionsForCardc2],
];

// ── Structure ─────────────────────────────────────────────────────────────
describe('Question data structure', () => {
  it.each(ALL_ARRAYS)('%s — is a non-empty array', (_name, arr) => {
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBeGreaterThan(0);
  });

  it.each(ALL_ARRAYS)('%s — every question has a non-empty text string', (_name, arr) => {
    arr.forEach((q, i) => {
      expect(typeof q.text).toBe('string');
      expect(q.text.length).toBeGreaterThan(0);
    });
  });

  it.each(ALL_ARRAYS)('%s — every question has a subheading property (string or null)', (_name, arr) => {
    arr.forEach((q) => {
      expect('subheading' in q).toBe(true);
      const ok = q.subheading === null || typeof q.subheading === 'string';
      expect(ok).toBe(true);
    });
  });
});

// ── Question counts (used as answer-key indices — must not change) ─────────
describe('Question counts', () => {
  it('COPD referral has 6 questions',           () => expect(questionsForCard1a).toHaveLength(6));
  it('COPD listing has 5 questions',            () => expect(questionsForCard1b).toHaveLength(5));
  it('ILD referral has 7 questions',            () => expect(questionsForCard2a).toHaveLength(7));
  it('ILD listing has 6 questions',             () => expect(questionsForCard2b).toHaveLength(6));
  it('Bronchiectasis referral has 11 questions',() => expect(questionsForCard3a).toHaveLength(11));
  it('Bronchiectasis listing has 9 questions',  () => expect(questionsForCard3b).toHaveLength(9));
  it('Absolute CI has 11 questions',            () => expect(questionsForCardc1).toHaveLength(11));
  it('Relative CI has 11 questions',            () => expect(questionsForCardc2).toHaveLength(11));
});

// ── Subheading grouping (drives visual grouping in the UI) ─────────────────
describe('Subheading grouping', () => {
  it('COPD referral — first 4 questions share "BODE score 5-6 with"', () => {
    questionsForCard1a.slice(0, 4).forEach((q) =>
      expect(q.subheading).toBe('BODE score 5-6 with')
    );
  });

  it('COPD referral — last 2 questions have null subheading', () => {
    questionsForCard1a.slice(4).forEach((q) => expect(q.subheading).toBeNull());
  });

  it('COPD listing — all 5 questions have null subheading', () => {
    questionsForCard1b.forEach((q) => expect(q.subheading).toBeNull());
  });

  it('ILD referral — first 2 questions have null subheading', () => {
    questionsForCard2a.slice(0, 2).forEach((q) => expect(q.subheading).toBeNull());
  });

  it('ILD referral — questions 3-5 share "Past 2 years relative decline of:"', () => {
    questionsForCard2a.slice(2, 5).forEach((q) =>
      expect(q.subheading).toBe('Past 2 years relative decline of:')
    );
  });

  it('ILD referral — last 2 questions have null subheading', () => {
    questionsForCard2a.slice(5).forEach((q) => expect(q.subheading).toBeNull());
  });

  it('ILD listing — first 3 questions share "Pulmonary Fibrosis with past 6 months absolute decline"', () => {
    questionsForCard2b.slice(0, 3).forEach((q) =>
      expect(q.subheading).toBe('Pulmonary Fibrosis with past 6 months absolute decline')
    );
  });

  it('ILD listing — last 3 questions have null subheading', () => {
    questionsForCard2b.slice(3).forEach((q) => expect(q.subheading).toBeNull());
  });

  it('Bronchiectasis referral — first question has null subheading', () => {
    expect(questionsForCard3a[0].subheading).toBeNull();
  });

  it('Bronchiectasis referral — questions 2-9 share "FEV1 < 40 % predicted with"', () => {
    questionsForCard3a.slice(1, 9).forEach((q) =>
      expect(q.subheading).toBe('FEV1 < 40 % predicted with')
    );
  });

  it('Bronchiectasis referral — last 2 questions have null subheading', () => {
    questionsForCard3a.slice(9).forEach((q) => expect(q.subheading).toBeNull());
  });

  it('Bronchiectasis listing — all 9 questions have null subheading', () => {
    questionsForCard3b.forEach((q) => expect(q.subheading).toBeNull());
  });

  it('Absolute CI — all 11 questions have null subheading', () => {
    questionsForCardc1.forEach((q) => expect(q.subheading).toBeNull());
  });

  it('Relative CI — all 11 questions have null subheading', () => {
    questionsForCardc2.forEach((q) => expect(q.subheading).toBeNull());
  });
});

// ── Spot-check key question texts (guard against accidental edits) ──────────
describe('Key question text spot-checks', () => {
  it('COPD referral Q1 is "Frequent exacerbation"', () => {
    expect(questionsForCard1a[0].text).toBe('Frequent exacerbation');
  });

  it('COPD listing Q1 is "BODE Score 7-10"', () => {
    expect(questionsForCard1b[0].text).toBe('BODE Score 7-10');
  });

  it('Absolute CI Q1 is "Unwilling Patient"', () => {
    expect(questionsForCardc1[0].text).toBe('Unwilling Patient');
  });

  it('Relative CI last question is "Patient on ECMO"', () => {
    expect(questionsForCardc2[questionsForCardc2.length - 1].text).toBe('Patient on ECMO');
  });
});
