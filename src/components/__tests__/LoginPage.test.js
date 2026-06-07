import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../Login/LoginPage';

// NOTE: These tests use semantic queries (getByLabelText, getByRole) that work
// with both the current MUI implementation and the redesigned plain-HTML version.

function renderLogin(onLogin = jest.fn()) {
  return { onLogin, ...render(<LoginPage onLogin={onLogin} />) };
}

describe('LoginPage — rendering', () => {
  it('renders a username field', () => {
    renderLogin();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('renders a password field', () => {
    renderLogin();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders a login submit button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /login|sign in/i })).toBeInTheDocument();
  });

  it('does not show an error message on initial render', () => {
    renderLogin();
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
  });
});

describe('LoginPage — successful login', () => {
  it('calls onLogin with the entered username and correct password', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.smith');
    await user.type(screen.getByLabelText(/password/i), 'LT@1234');
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledWith('dr.smith', 'LT@1234');
  });

  it('accepts any non-empty username string', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'any_name_123');
    await user.type(screen.getByLabelText(/password/i), 'LT@1234');
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    expect(onLogin).toHaveBeenCalled();
  });

  it('does not show an error on successful login', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.smith');
    await user.type(screen.getByLabelText(/password/i), 'LT@1234');
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
  });
});

describe('LoginPage — failed login', () => {
  it('shows an error message for wrong password', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.smith');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('shows an error message when username is empty', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/password/i), 'LT@1234');
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('shows an error message when both fields are empty', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('rejects a password that is almost correct (extra character)', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.smith');
    await user.type(screen.getByLabelText(/password/i), 'LT@12345'); // extra '5'
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    expect(onLogin).not.toHaveBeenCalled();
  });

  it('rejects a password that is almost correct (missing character)', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.smith');
    await user.type(screen.getByLabelText(/password/i), 'LT@123'); // missing '4'
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));

    expect(onLogin).not.toHaveBeenCalled();
  });
});

describe('LoginPage — error message lifecycle', () => {
  it('clears the error message when the user starts typing in the password field', async () => {
    const user = userEvent.setup();
    renderLogin();

    // Trigger an error
    await user.type(screen.getByLabelText(/username/i), 'dr.smith');
    await user.type(screen.getByLabelText(/password/i), 'wrong');
    await user.click(screen.getByRole('button', { name: /login|sign in/i }));
    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();

    // Typing in password should clear the error
    await user.type(screen.getByLabelText(/password/i), 'x');
    expect(screen.queryByText(/invalid username or password/i)).not.toBeInTheDocument();
  });
});

describe('LoginPage — Enter key behaviour', () => {
  it('submits the form when Enter is pressed with valid credentials', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.smith');
    await user.type(screen.getByLabelText(/password/i), 'LT@1234');
    await user.keyboard('{Enter}');

    expect(onLogin).toHaveBeenCalledWith('dr.smith', 'LT@1234');
  });

  it('shows error when Enter is pressed with invalid credentials', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'dr.smith');
    await user.type(screen.getByLabelText(/password/i), 'wrong');
    await user.keyboard('{Enter}');

    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
  });
});
