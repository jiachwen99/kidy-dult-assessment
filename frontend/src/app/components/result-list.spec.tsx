import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResultList } from './result-list';

describe('ResultList', () => {
  test('renders list of results', () => {
    const results = [
      { username: 'User 1', wordCount: 10 },
      { username: 'User 2', wordCount: 15 },
    ];

    const { getByText } = render(<ResultList results={results} />);

    results.forEach((result) => {
      expect(screen.getByText(result.username + ' - ' + result.wordCount.toString())).toBeInTheDocument();
    });
  });

  test('renders "No Data" message when there are no results', () => {
    const results: UserWordCount[] = [];

    const { getByText } = render(<ResultList results={results} />);

    const noDataElement = getByText('No Data to be shown here');
    expect(noDataElement).toBeInTheDocument();
  });
});
