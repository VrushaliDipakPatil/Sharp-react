import { render, screen } from '@testing-library/react';
import Expense from './Expense';

test('welcometext', () => {
  render(<Expense />);

  const welcometext = screen.getByText('Welcome to expense Tracker App!!!');

  expect(welcometext).toBeInTheDocument();
});
