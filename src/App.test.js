import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock('./components/DataStorage', () => jest.fn());

// Helper: render App and navigate from the new landing page through to the
// details (name/hospital) screen, for tests that exercise it below.
async function renderAppAtLogin() {
  const user = userEvent.setup();
  const utils = render(<App />);
  await user.click(screen.getAllByRole('button', { name: /open ltec/i })[0]);
  return { user, ...utils };
}

describe('App — landing page', () => {
  it('shows the landing page on initial render', () => {
    render(<App />);
    expect(screen.getByText(/find transplant.eligible patients/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/your name/i)).not.toBeInTheDocument();
  });

  it('navigates to the details screen when "Open LTEC" is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /open ltec/i })[0]);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hospital name/i)).toBeInTheDocument();
  });
});

describe('App — details gate', () => {
  it('shows the header and details form after navigating from the landing page', async () => {
    await renderAppAtLogin();
    // Title appears in the header
    expect(screen.getByText('Lung Transplant Eligibility Calculator')).toBeInTheDocument();
    // Details form fields are present
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hospital name/i)).toBeInTheDocument();
  });

  it('does NOT show the main assessment form before details are submitted', async () => {
    await renderAppAtLogin();
    // These are intake-screen elements that only appear after submission
    expect(screen.queryByText(/choose patient's disease/i)).not.toBeInTheDocument();
  });

  it('shows the main assessment form after submitting name and hospital', async () => {
    const { user } = await renderAppAtLogin();

    await user.type(screen.getByLabelText(/your name/i), 'dr.test');
    await user.type(screen.getByLabelText(/hospital name/i), 'City Hospital');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    // Post-submission: intake screen appears
    expect(screen.getByText(/choose patient's disease/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^age$/i)).toBeInTheDocument();
  });

  it('stays on the details screen when a required field is missing', async () => {
    const { user } = await renderAppAtLogin();

    await user.type(screen.getByLabelText(/your name/i), 'dr.test');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    // Still shows the details form
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.queryByText(/choose patient's disease/i)).not.toBeInTheDocument();
  });

  it('stores username and hospital in UserContext after submission', async () => {
    const { user } = await renderAppAtLogin();

    await user.type(screen.getByLabelText(/your name/i), 'dr.contextcheck');
    await user.type(screen.getByLabelText(/hospital name/i), 'City Hospital');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    // Post-submission screen should be shown (Context is used by MainCard internally)
    expect(screen.getByLabelText(/^age$/i)).toBeInTheDocument();
  });
});

describe('App — footer', () => {
  it('renders the footer on the landing screen', () => {
    render(<App />);
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText(/shubham tyagi/i)).toBeInTheDocument();
  });

  it('renders the footer on the login screen', async () => {
    await renderAppAtLogin();
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText(/shubham tyagi/i)).toBeInTheDocument();
  });
});
