import React, { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionCard from '../QuestionCard';
import {
  questionsForCard1b,  // COPD listing — 5 questions, no subheadings (simplest)
  questionsForCard1a,  // COPD referral — 6 questions with subheadings
  questionsForCardc1,  // Absolute CI — 11 questions, no subheadings
} from '../Questions';

// ── Stateful wrapper ──────────────────────────────────────────────────────
// QuestionCard has two data paths: the global `answers` prop (determines
// card-complete state) and local `answersOnCurrentCard` state (drives the
// verdict).  This wrapper wires them correctly so tests behave like the real app.
function Wrapper({ questions, title, currentCardIndex, onVerdictChange = jest.fn() }) {
  const [answers, setAnswers] = useState({});

  const handleSetAnswers = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [`${currentCardIndex}-${questionIndex}`]: answer,
    }));
  };

  return (
    <QuestionCard
      questions={questions}
      title={title}
      answers={answers}
      setAnswers={handleSetAnswers}
      setVerdict={onVerdictChange}
      currentCardIndex={currentCardIndex}
    />
  );
}

async function answerAll(user, questions, choice = 'No') {
  const radios = screen.getAllByRole('radio', { name: new RegExp(`^${choice}$`, 'i') });
  // There are questions.length radios for each choice option
  expect(radios).toHaveLength(questions.length);
  for (const radio of radios) {
    await user.click(radio);
  }
}

// ── Rendering ─────────────────────────────────────────────────────────────
describe('QuestionCard — rendering', () => {
  it('renders the card title', () => {
    render(<Wrapper questions={questionsForCard1b} title="Is the Patient eligible for listing?" currentCardIndex={2} />);
    expect(screen.getByText(/eligible for listing/i)).toBeInTheDocument();
  });

  it('renders all question texts', () => {
    render(<Wrapper questions={questionsForCard1b} title="Card" currentCardIndex={2} />);
    questionsForCard1b.forEach((q) => {
      expect(screen.getByText(q.text)).toBeInTheDocument();
    });
  });

  it('renders Yes, No, n.a. radio options for every question', () => {
    render(<Wrapper questions={questionsForCard1b} title="Card" currentCardIndex={2} />);
    expect(screen.getAllByRole('radio', { name: /^yes$/i })).toHaveLength(questionsForCard1b.length);
    expect(screen.getAllByRole('radio', { name: /^no$/i })).toHaveLength(questionsForCard1b.length);
    expect(screen.getAllByRole('radio', { name: /^n\.a\.$/i })).toHaveLength(questionsForCard1b.length);
  });

  it('renders a subheading for grouped questions', () => {
    render(<Wrapper questions={questionsForCard1a} title="Card" currentCardIndex={1} />);
    expect(screen.getByText('BODE score 5-6 with')).toBeInTheDocument();
  });

  it('does not show a verdict before any question is answered', () => {
    render(<Wrapper questions={questionsForCard1b} title="Card" currentCardIndex={2} />);
    expect(screen.queryByText(/^eligible$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^ineligible$/i)).not.toBeInTheDocument();
  });
});

// ── Eligibility cards (1 & 2) — verdict display ───────────────────────────
describe('QuestionCard — eligibility verdict (cards 1-2)', () => {
  it('shows "Ineligible" when all questions are answered No', async () => {
    const user = userEvent.setup();
    render(<Wrapper questions={questionsForCard1b} title="Card" currentCardIndex={2} />);
    await answerAll(user, questionsForCard1b, 'No');
    expect(screen.getByText(/^ineligible$/i)).toBeInTheDocument();
  });

  it('shows "Eligible" when at least one question is answered Yes', async () => {
    const user = userEvent.setup();
    render(<Wrapper questions={questionsForCard1b} title="Card" currentCardIndex={2} />);
    // Answer first question Yes, rest No
    const yesRadios = screen.getAllByRole('radio', { name: /^yes$/i });
    await user.click(yesRadios[0]);
    const noRadios = screen.getAllByRole('radio', { name: /^no$/i });
    for (let i = 1; i < noRadios.length; i++) {
      await user.click(noRadios[i]);
    }
    expect(screen.getByText(/^eligible$/i)).toBeInTheDocument();
  });

  it('shows "Ineligible" when all questions are answered n.a.', async () => {
    const user = userEvent.setup();
    render(<Wrapper questions={questionsForCard1b} title="Card" currentCardIndex={2} />);
    await answerAll(user, questionsForCard1b, 'n.a.');
    expect(screen.getByText(/^ineligible$/i)).toBeInTheDocument();
  });

  it('verdict is hidden until all questions are answered', async () => {
    const user = userEvent.setup();
    render(<Wrapper questions={questionsForCard1b} title="Card" currentCardIndex={2} />);
    // Answer only the first question
    await user.click(screen.getAllByRole('radio', { name: /^no$/i })[0]);
    expect(screen.queryByText(/^ineligible$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^eligible$/i)).not.toBeInTheDocument();
  });

  it('shows verdict only after the last unanswered question is answered', async () => {
    const user = userEvent.setup();
    render(<Wrapper questions={questionsForCard1b} title="Card" currentCardIndex={2} />);
    const noRadios = screen.getAllByRole('radio', { name: /^no$/i });
    // Answer all but the last
    for (let i = 0; i < noRadios.length - 1; i++) {
      await user.click(noRadios[i]);
    }
    expect(screen.queryByText(/^ineligible$/i)).not.toBeInTheDocument();
    // Answer the last one
    await user.click(noRadios[noRadios.length - 1]);
    expect(screen.getByText(/^ineligible$/i)).toBeInTheDocument();
  });
});

// ── Contraindication cards (3 & 4) — verdict display ─────────────────────
// The verdict table is the only <table> in QuestionCard; we scope queries
// within it to avoid false matches from the "No"/"Yes" radio-button labels.
describe('QuestionCard — contraindication verdict (cards 3-4)', () => {
  it('shows "No" (no CI) when all questions answered No', async () => {
    const user = userEvent.setup();
    render(<Wrapper questions={questionsForCardc1} title="Card" currentCardIndex={3} />);
    await answerAll(user, questionsForCardc1, 'No');
    const table = screen.getByRole('table');
    expect(within(table).getByText(/^no$/i)).toBeInTheDocument();
  });

  it('shows "Yes" (CI present) when at least one question is Yes', async () => {
    const user = userEvent.setup();
    render(<Wrapper questions={questionsForCardc1} title="Card" currentCardIndex={3} />);
    const yesRadios = screen.getAllByRole('radio', { name: /^yes$/i });
    await user.click(yesRadios[0]);
    const noRadios = screen.getAllByRole('radio', { name: /^no$/i });
    for (let i = 1; i < noRadios.length; i++) {
      await user.click(noRadios[i]);
    }
    const table = screen.getByRole('table');
    expect(within(table).getByText(/^yes$/i)).toBeInTheDocument();
  });

  it('shows "No" when all questions answered n.a. (card 3)', async () => {
    const user = userEvent.setup();
    render(<Wrapper questions={questionsForCardc1} title="Card" currentCardIndex={3} />);
    await answerAll(user, questionsForCardc1, 'n.a.');
    const table = screen.getByRole('table');
    expect(within(table).getByText(/^no$/i)).toBeInTheDocument();
  });
});

// ── setVerdict callback ───────────────────────────────────────────────────
describe('QuestionCard — setVerdict callback', () => {
  it('calls setVerdict with the current cardIndex and verdict', async () => {
    const user = userEvent.setup();
    const onVerdictChange = jest.fn();
    render(
      <Wrapper
        questions={questionsForCard1b}
        title="Card"
        currentCardIndex={2}
        onVerdictChange={onVerdictChange}
      />
    );
    await answerAll(user, questionsForCard1b, 'No');
    expect(onVerdictChange).toHaveBeenCalledWith(2, 'Ineligible');
  });

  it('passes "Eligible" when a Yes answer is given (card 1)', async () => {
    const user = userEvent.setup();
    const onVerdictChange = jest.fn();
    render(
      <Wrapper
        questions={questionsForCard1b}
        title="Card"
        currentCardIndex={1}
        onVerdictChange={onVerdictChange}
      />
    );
    await answerAll(user, questionsForCard1b, 'Yes');
    expect(onVerdictChange).toHaveBeenCalledWith(1, 'Eligible');
  });
});

// ── Answer key format ─────────────────────────────────────────────────────
describe('QuestionCard — answer key format', () => {
  it('calls setAnswers with 1-based question index', async () => {
    const user = userEvent.setup();
    const setAnswers = jest.fn();

    render(
      <QuestionCard
        questions={questionsForCard1b}
        title="Card"
        answers={{}}
        setAnswers={setAnswers}
        setVerdict={jest.fn()}
        currentCardIndex={2}
      />
    );

    const firstYes = screen.getAllByRole('radio', { name: /^yes$/i })[0];
    await user.click(firstYes);

    // setAnswers is called with (questionIndex, answer) where questionIndex is 1-based
    expect(setAnswers).toHaveBeenCalledWith(1, 'Yes');
  });
});
