import React, { ReactElement } from 'react';

export function ResultList({ results }: ResultListProps): ReactElement {
  return (
    <div className='w-full mx-auto'>
      <h1>Results</h1>
      <div
        className="border-solid border-2 border-black p-20"
      >
        {results.length > 0 ? (
          <ul>
            {results.map((user, index) => (
              <li key={index}>
                {user.username} - {user.wordCount}
              </li>
            ))}
          </ul>) : (<h2>No Data to be shown here</h2>)
          }
      </div>
    </div>
  );
}
