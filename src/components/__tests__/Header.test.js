import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Header from '../Header';

// NOTE: These tests cover the CURRENT implementation where the Header
// owns the timer state. After the planned redesign (timer moves to MainCard),
// update these tests to test timer behaviour in MainCard instead.

describe('Header — rendering', () => {
  it('renders the application title', () => {
    render(<Header userSelection="" progress={0} updateTimer={jest.fn()} />);
    expect(screen.getByText(/lung transplant eligibility calculator/i)).toBeInTheDocument();
  });

  it('does not show disease name or timer when no disease is selected', () => {
    render(<Header userSelection="" progress={0} updateTimer={jest.fn()} />);
    // No disease chip, no timer display
    expect(screen.queryByText('COPD')).not.toBeInTheDocument();
  });

  it('shows the disease name when userSelection is set', () => {
    render(<Header userSelection="COPD" progress={25} updateTimer={jest.fn()} />);
    expect(screen.getByText('COPD')).toBeInTheDocument();
  });

  it('shows a different disease name when ILD is selected', () => {
    render(<Header userSelection="ILD" progress={25} updateTimer={jest.fn()} />);
    expect(screen.getByText('ILD')).toBeInTheDocument();
  });

  it('shows progress percentage when userSelection is set', () => {
    render(<Header userSelection="COPD" progress={50} updateTimer={jest.fn()} />);
    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });
});

describe('Header — timer', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('shows 00:00 on initial render with active progress', () => {
    render(<Header userSelection="COPD" progress={25} updateTimer={jest.fn()} />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('increments by 1 second every second', () => {
    render(<Header userSelection="COPD" progress={25} updateTimer={jest.fn()} />);
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('00:03')).toBeInTheDocument();
  });

  it('formats minutes and seconds correctly (MM:SS)', () => {
    render(<Header userSelection="COPD" progress={25} updateTimer={jest.fn()} />);
    act(() => { jest.advanceTimersByTime(65000); });
    expect(screen.getByText('01:05')).toBeInTheDocument();
  });

  it('pads single-digit seconds with leading zero', () => {
    render(<Header userSelection="COPD" progress={25} updateTimer={jest.fn()} />);
    act(() => { jest.advanceTimersByTime(5000); });
    expect(screen.getByText('00:05')).toBeInTheDocument();
  });

  it('pads single-digit minutes with leading zero', () => {
    render(<Header userSelection="COPD" progress={25} updateTimer={jest.fn()} />);
    act(() => { jest.advanceTimersByTime(9 * 60 * 1000); });
    expect(screen.getByText('09:00')).toBeInTheDocument();
  });

  it('stops counting when progress reaches 100', () => {
    const { rerender } = render(<Header userSelection="COPD" progress={25} updateTimer={jest.fn()} />);
    act(() => { jest.advanceTimersByTime(4000); });
    rerender(<Header userSelection="COPD" progress={100} updateTimer={jest.fn()} />);
    // Timer should freeze — advancing further should not change display
    act(() => { jest.advanceTimersByTime(5000); });
    expect(screen.getByText('00:04')).toBeInTheDocument();
  });

  it('calls updateTimer with elapsed seconds when progress reaches 100', () => {
    const updateTimer = jest.fn();
    const { rerender } = render(<Header userSelection="COPD" progress={25} updateTimer={updateTimer} />);
    act(() => { jest.advanceTimersByTime(7000); });
    rerender(<Header userSelection="COPD" progress={100} updateTimer={updateTimer} />);
    expect(updateTimer).toHaveBeenCalledWith(7);
  });

  it('does not run timer when no disease is selected (progress = 0, no userSelection)', () => {
    render(<Header userSelection="" progress={0} updateTimer={jest.fn()} />);
    act(() => { jest.advanceTimersByTime(10000); });
    // Timer element should not be visible when no disease selected
    expect(screen.queryByText('00:10')).not.toBeInTheDocument();
  });
});

describe('Header — progress display', () => {
  it('displays 0% when currentCardIndex is 0 (intake screen)', () => {
    render(<Header userSelection="COPD" progress={0} updateTimer={jest.fn()} />);
    expect(screen.getByText(/0%/)).toBeInTheDocument();
  });

  it('displays 25% after card 1 of 4', () => {
    render(<Header userSelection="COPD" progress={25} updateTimer={jest.fn()} />);
    expect(screen.getByText(/25%/)).toBeInTheDocument();
  });

  it('displays 100% on the final card', () => {
    render(<Header userSelection="COPD" progress={100} updateTimer={jest.fn()} />);
    expect(screen.getByText(/100%/)).toBeInTheDocument();
  });
});
