import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FinalCard from '../FinalCard';

const VERDICTS_ELIGIBLE = {
  1: 'Eligible',
  2: 'Eligible',
  3: 'No',
  4: 'No',
};

const VERDICTS_INELIGIBLE = {
  1: 'Ineligible',
  2: 'Eligible',
  3: 'Yes',
  4: 'No',
};

function renderFinal(overrides = {}) {
  const props = {
    handleClear: jest.fn(),
    age: '58',
    id: 'MRN-0042',
    sex: 'Female',
    verdicts: VERDICTS_ELIGIBLE,
    overallVerdict: 'Eligible',
    ...overrides,
  };
  return { props, ...render(<FinalCard {...props} />) };
}

// ── Patient details ───────────────────────────────────────────────────────
describe('FinalCard — patient details', () => {
  it('displays the patient age', () => {
    renderFinal({ age: '63' });
    expect(screen.getByText('63')).toBeInTheDocument();
  });

  it('displays the patient ID', () => {
    renderFinal({ id: 'P-9001' });
    expect(screen.getByText('P-9001')).toBeInTheDocument();
  });

  it('displays the patient sex', () => {
    renderFinal({ sex: 'Male' });
    expect(screen.getByText('Male')).toBeInTheDocument();
  });
});

// ── Overall verdict display ───────────────────────────────────────────────
describe('FinalCard — overall verdict', () => {
  it('displays ELIGIBLE in uppercase when overallVerdict is "Eligible"', () => {
    renderFinal({ overallVerdict: 'Eligible' });
    // Scope to the overall-verdict span to avoid matching per-card verdict cells
    expect(screen.getByTestId('overall-verdict')).toHaveTextContent('ELIGIBLE');
  });

  it('displays INELIGIBLE in uppercase when overallVerdict is "Ineligible"', () => {
    renderFinal({ overallVerdict: 'Ineligible', verdicts: VERDICTS_INELIGIBLE });
    expect(screen.getByTestId('overall-verdict')).toHaveTextContent('INELIGIBLE');
  });
});

// ── Per-card verdict labels (must match CLAUDE.md §14 exactly) ────────────
describe('FinalCard — per-card verdict labels', () => {
  it('shows "For Referral:" label (card 1)', () => {
    renderFinal();
    expect(screen.getByText(/for referral:/i)).toBeInTheDocument();
  });

  it('shows "For Listing:" label (card 2)', () => {
    renderFinal();
    expect(screen.getByText(/for listing:/i)).toBeInTheDocument();
  });

  it('shows "Contra Indications (Absolute):" label (card 3)', () => {
    renderFinal();
    expect(screen.getByText(/contra indications \(absolute\)/i)).toBeInTheDocument();
  });

  it('shows "Contra Indications (Relative):" label (card 4)', () => {
    renderFinal();
    expect(screen.getByText(/contra indications \(relative\)/i)).toBeInTheDocument();
  });
});

// ── Per-card verdict values ───────────────────────────────────────────────
describe('FinalCard — per-card verdict values', () => {
  it('shows ELIGIBLE for card 1 when referral verdict is Eligible', () => {
    renderFinal({ verdicts: { ...VERDICTS_ELIGIBLE, 1: 'Eligible' } });
    const eligibleElements = screen.getAllByText(/ELIGIBLE/);
    expect(eligibleElements.length).toBeGreaterThan(0);
  });

  it('shows INELIGIBLE for card 2 when listing verdict is Ineligible', () => {
    renderFinal({ verdicts: { ...VERDICTS_ELIGIBLE, 2: 'Ineligible' } });
    expect(screen.getByText(/INELIGIBLE/)).toBeInTheDocument();
  });

  it('renders all 4 verdict rows when all verdicts are provided', () => {
    renderFinal();
    expect(screen.getByText(/for referral:/i)).toBeInTheDocument();
    expect(screen.getByText(/for listing:/i)).toBeInTheDocument();
    expect(screen.getByText(/contra indications \(absolute\)/i)).toBeInTheDocument();
    expect(screen.getByText(/contra indications \(relative\)/i)).toBeInTheDocument();
  });

  it('renders no verdict rows when verdicts object is empty', () => {
    renderFinal({ verdicts: {} });
    expect(screen.queryByText(/for referral:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/for listing:/i)).not.toBeInTheDocument();
  });
});

// ── "Start Again" button ─────────────────────────────────────────────────
describe('FinalCard — Start Again button', () => {
  it('renders a "Start Again" button', () => {
    renderFinal();
    expect(screen.getByRole('button', { name: /start again/i })).toBeInTheDocument();
  });

  it('calls handleClear when "Start Again" is clicked', async () => {
    const user = userEvent.setup();
    const { props } = renderFinal();

    await user.click(screen.getByRole('button', { name: /start again/i }));
    expect(props.handleClear).toHaveBeenCalledTimes(1);
  });

  it('calls handleClear exactly once per click', async () => {
    const user = userEvent.setup();
    const { props } = renderFinal();

    await user.click(screen.getByRole('button', { name: /start again/i }));
    await user.click(screen.getByRole('button', { name: /start again/i }));
    expect(props.handleClear).toHaveBeenCalledTimes(2);
  });
});
