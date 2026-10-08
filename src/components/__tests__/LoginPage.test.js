import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../Login/LoginPage';

function renderLogin(onLogin = jest.fn()) {
  return { onLogin, ...render(<LoginPage onLogin={onLogin} />) };
}

describe('LoginPage — rendering', () => {
  it('renders a name field', () => {
    renderLogin();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
  });

  it('renders a hospital name field', () => {
    renderLogin();
    expect(screen.getByLabelText(/hospital name/i)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('does not show an error message on initial render', () => {
    renderLogin();
    expect(screen.queryByText(/enter your name/i)).not.toBeInTheDocument();
  });
});

describe('LoginPage — successful submission', () => {
  it('calls onLogin with the entered name and hospital', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/your name/i), 'dr.smith');
    await user.type(screen.getByLabelText(/hospital name/i), 'City Hospital');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledWith('dr.smith', 'City Hospital');
  });

  it('accepts any non-empty name and hospital string', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/your name/i), 'any_name_123');
    await user.type(screen.getByLabelText(/hospital name/i), 'Any Hospital 456');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(onLogin).toHaveBeenCalled();
  });

  it('does not show an error on successful submission', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/your name/i), 'dr.smith');
    await user.type(screen.getByLabelText(/hospital name/i), 'City Hospital');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.queryByText(/enter your name/i)).not.toBeInTheDocument();
  });
});

describe('LoginPage — missing fields', () => {
  it('shows an error message when hospital is empty', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/your name/i), 'dr.smith');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/please enter your name and hospital name/i)).toBeInTheDocument();
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('shows an error message when name is empty', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/hospital name/i), 'City Hospital');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/please enter your name and hospital name/i)).toBeInTheDocument();
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('shows an error message when both fields are empty', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/please enter your name and hospital name/i)).toBeInTheDocument();
    expect(onLogin).not.toHaveBeenCalled();
  });
});

describe('LoginPage — error message lifecycle', () => {
  it('clears the error message when the user starts typing in the hospital field', async () => {
    const user = userEvent.setup();
    renderLogin();

    // Trigger an error
    await user.type(screen.getByLabelText(/your name/i), 'dr.smith');
    await user.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText(/please enter your name and hospital name/i)).toBeInTheDocument();

    // Typing in hospital should clear the error
    await user.type(screen.getByLabelText(/hospital name/i), 'x');
    expect(screen.queryByText(/please enter your name and hospital name/i)).not.toBeInTheDocument();
  });

  it('clears the error message when the user starts typing in the name field', async () => {
    const user = userEvent.setup();
    renderLogin();

    // Trigger an error
    await user.type(screen.getByLabelText(/hospital name/i), 'City Hospital');
    await user.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText(/please enter your name and hospital name/i)).toBeInTheDocument();

    // Typing in name should clear the error
    await user.type(screen.getByLabelText(/your name/i), 'x');
    expect(screen.queryByText(/please enter your name and hospital name/i)).not.toBeInTheDocument();
  });
});

describe('LoginPage — Enter key behaviour', () => {
  it('submits the form when Enter is pressed with both fields filled', async () => {
    const user = userEvent.setup();
    const { onLogin } = renderLogin();

    await user.type(screen.getByLabelText(/your name/i), 'dr.smith');
    await user.type(screen.getByLabelText(/hospital name/i), 'City Hospital');
    await user.keyboard('{Enter}');

    expect(onLogin).toHaveBeenCalledWith('dr.smith', 'City Hospital');
  });

  it('shows error when Enter is pressed with a field missing', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/your name/i), 'dr.smith');
    await user.keyboard('{Enter}');

    expect(screen.getByText(/please enter your name and hospital name/i)).toBeInTheDocument();
  });
});
