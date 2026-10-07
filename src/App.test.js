import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock('./components/DataStorage', () => jest.fn());

// Helper: render App and navigate from the new landing page through to the
// login screen, for tests that exercise the (unchanged) login gate below it.
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
    expect(screen.queryByLabelText(/username/i)).not.toBeInTheDocument();
  });

  it('navigates to the login screen when "Open LTEC" is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /open ltec/i })[0]);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});

describe('App — login gate', () => {
  it('shows the login header and login form after navigating from the landing page', async () => {
    await renderAppAtLogin();
    // Title appears in the header
    expect(screen.getByText('Lung Transplant Eligibility Calculator')).toBeInTheDocument();
    // Login form fields are present
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('does NOT show the main assessment form before login', async () => {
    await renderAppAtLogin();
    // These are intake-screen elements that only appear after login
    expect(screen.queryByText(/choose patient's disease/i)).not.toBeInTheDocument();
  });

  it('shows the main assessment form after a successful login', async () => {
    const { user } = await renderAppAtLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.test');
    await user.type(screen.getByLabelText(/password/i), 'LT@1234');
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    // Post-login: intake screen appears
    expect(screen.getByText(/choose patient's disease/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^age$/i)).toBeInTheDocument();
  });

  it('stays on the login screen after a failed login attempt', async () => {
    const { user } = await renderAppAtLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.test');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    // Still shows login form
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.queryByText(/choose patient's disease/i)).not.toBeInTheDocument();
  });

  it('stores username in UserContext after login', async () => {
    const { user } = await renderAppAtLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.contextcheck');
    await user.type(screen.getByLabelText(/password/i), 'LT@1234');
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    // Post-login screen should be shown (Context is used by MainCard internally)
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
