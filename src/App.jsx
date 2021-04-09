import React from 'react';

import Select from './components/Select';
import ContextMenuContainer from './components/ContextMenuContainer';

import './App.css';
import './styles/fonts.css';

const App = () => {
  return (
    <div className='container'>
      <Select options={options} />
      <ContextMenuContainer options={contextMenuOptions}>
        <div style={{ marginTop: '1rem' }}>
          <p>
            Some more text some more text some more text some more text some
            more text some more text some more text some more text some more
            text.
          </p>
          <p>
            Some more text some more text some more text some more text some
            more text some more text some more text some more text some more
            text.
          </p>
          <p>
            Some more text some more text some more text some more text some
            more text some more text some more text some more text some more
            text.
          </p>
        </div>
      </ContextMenuContainer>
    </div>
  );
};

const options = [
  {
    text: 'Option 1',
    value: '1',
    selected: true,
  },
  {
    text: 'Option 2',
    value: '2',
  },
  {
    text: 'Option 3',
    value: '3',
  },
  {
    text: 'Option 4',
    value: '4',
  },
  {
    text: 'Option 5',
    value: '5',
  },
  {
    text: 'Option 6',
    value: '6',
  },
  {
    text: 'Option 7',
    value: '7',
  },
  {
    text: 'Option 8',
    value: '8',
  },
  {
    text: 'Option 9',
    value: '9',
  },
  {
    text: 'Option 10',
    value: '10',
  },
  { divider: true },
  {
    text: 'Better option 1',
    value: '11',
  },
  {
    text: 'Better option 2',
    value: '12',
  },
  {
    text: 'Better option 3',
    value: '13',
  },
  {
    text: 'Better option 4',
    value: '14',
  },
  {
    text: 'Better option 5',
    value: '15',
  },
];

const contextMenuOptions = [
  {
    text: 'Copy',
    value: 'copy',
    // onClick: () => console.log('COPY'),
    onClick: () =>
      navigator.clipboard &&
      navigator.clipboard.writeText(window.getSelection().toString()),
  },
  {
    text: 'Paste',
    value: 'paste',
    // onClick: () => console.log('PASTE'),
    disabled: true,
  },
  {
    text: 'Log to Console',
    value: 'console-log',
    onClick: () => console.log(window.getSelection().toString()),
  },
];

export default App;
