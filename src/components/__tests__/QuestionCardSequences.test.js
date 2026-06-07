import questionCardSequences from '../QuestionCardSequences';
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

// In the current implementation, each card in the sequence is a React JSX element.
// Its questions and title are accessible via element.props.
// These tests verify the data structure without rendering anything.

describe('questionCardSequences — structure', () => {
  it('exports an array with exactly 3 disease entries', () => {
    expect(Array.isArray(questionCardSequences)).toBe(true);
    expect(questionCardSequences).toHaveLength(3);
  });

  it('diseases are COPD, ILD, Bronchiectasis in that exact order', () => {
    expect(questionCardSequences[0].label).toBe('COPD');
    expect(questionCardSequences[1].label).toBe('ILD');
    expect(questionCardSequences[2].label).toBe('Bronchiectasis');
  });

  it('each disease has exactly 4 cards', () => {
    questionCardSequences.forEach((seq) => {
      expect(seq.cards).toHaveLength(4);
    });
  });

  it('each card is a React element (has props)', () => {
    questionCardSequences.forEach((seq) => {
      seq.cards.forEach((card) => {
        expect(card).toHaveProperty('props');
      });
    });
  });
});

// ── COPD (index 0) ──────────────────────────────────────────────────────────
describe('COPD sequence (index 0)', () => {
  const seq = questionCardSequences[0];

  it('card 1 uses COPD referral questions', () => {
    expect(seq.cards[0].props.questions).toBe(questionsForCard1a);
  });

  it('card 2 uses COPD listing questions', () => {
    expect(seq.cards[1].props.questions).toBe(questionsForCard1b);
  });

  it('card 3 uses absolute contraindication questions', () => {
    expect(seq.cards[2].props.questions).toBe(questionsForCardc1);
  });

  it('card 4 uses relative contraindication questions', () => {
    expect(seq.cards[3].props.questions).toBe(questionsForCardc2);
  });

  it('card 1 title mentions referral', () => {
    expect(seq.cards[0].props.title).toMatch(/referral/i);
  });

  it('card 2 title mentions listing', () => {
    expect(seq.cards[1].props.title).toMatch(/listing/i);
  });

  it('card 3 title mentions absolute', () => {
    expect(seq.cards[2].props.title).toMatch(/absolute/i);
  });

  it('card 4 title mentions relative', () => {
    expect(seq.cards[3].props.title).toMatch(/relative/i);
  });
});

// ── ILD (index 1) ────────────────────────────────────────────────────────────
describe('ILD sequence (index 1)', () => {
  const seq = questionCardSequences[1];

  it('card 1 uses ILD referral questions', () => {
    expect(seq.cards[0].props.questions).toBe(questionsForCard2a);
  });

  it('card 2 uses ILD listing questions', () => {
    expect(seq.cards[1].props.questions).toBe(questionsForCard2b);
  });

  it('card 3 uses the shared absolute CI questions', () => {
    expect(seq.cards[2].props.questions).toBe(questionsForCardc1);
  });

  it('card 4 uses the shared relative CI questions', () => {
    expect(seq.cards[3].props.questions).toBe(questionsForCardc2);
  });
});

// ── Bronchiectasis (index 2) ─────────────────────────────────────────────────
describe('Bronchiectasis sequence (index 2)', () => {
  const seq = questionCardSequences[2];

  it('card 1 uses Bronchiectasis referral questions', () => {
    expect(seq.cards[0].props.questions).toBe(questionsForCard3a);
  });

  it('card 2 uses Bronchiectasis listing questions', () => {
    expect(seq.cards[1].props.questions).toBe(questionsForCard3b);
  });

  it('card 3 uses the shared absolute CI questions', () => {
    expect(seq.cards[2].props.questions).toBe(questionsForCardc1);
  });

  it('card 4 uses the shared relative CI questions', () => {
    expect(seq.cards[3].props.questions).toBe(questionsForCardc2);
  });
});

// ── Shared contraindication cards ────────────────────────────────────────────
describe('Shared contraindication cards (cards 3 & 4)', () => {
  it('all three diseases use the same absolute CI question array (questionsForCardc1)', () => {
    const q = questionsForCardc1;
    expect(questionCardSequences[0].cards[2].props.questions).toBe(q);
    expect(questionCardSequences[1].cards[2].props.questions).toBe(q);
    expect(questionCardSequences[2].cards[2].props.questions).toBe(q);
  });

  it('all three diseases use the same relative CI question array (questionsForCardc2)', () => {
    const q = questionsForCardc2;
    expect(questionCardSequences[0].cards[3].props.questions).toBe(q);
    expect(questionCardSequences[1].cards[3].props.questions).toBe(q);
    expect(questionCardSequences[2].cards[3].props.questions).toBe(q);
  });
});
