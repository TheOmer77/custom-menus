import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Components
import Menu from './Menu';

import '../styles/Select.css';

const selectOption = (
  optionIndex,
  setSelected,
  setOpen,
  setClosing,
  onChange
) => {
  setSelected(optionIndex);
  close(setOpen, setClosing);
  onChange && onChange();
};

const close = (setOpen, setClosing) => {
  setClosing(true);
  setTimeout(() => {
    setClosing(false);
    setOpen(false);
  }, 125);
};

const handleKeyDown = (e, isOpen, setOpen, setClosing) => {
  if ([' ', 'Enter'].includes(e.key))
    !isOpen ? setOpen(!isOpen) : close(setOpen, setClosing);
};

const Select = ({ options, onChange, fluid, tabIndex = '0' }) => {
  const [selected, setSelected] = useState(
    options.findIndex((option) => option.selected)
  );
  const [isOpen, setOpen] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (e) =>
      ref.current &&
      !ref.current.contains(e.target) &&
      isOpen &&
      close(setOpen, setClosing);
    document.body.addEventListener('click', onBodyClick);
    document.body.addEventListener('contextmenu', onBodyClick);
    return () => {
      document.body.removeEventListener('click', onBodyClick);
      document.body.removeEventListener('contextmenu', onBodyClick);
    };
  }, [isOpen]);

  return (
    <div
      className={`select${fluid ? ' fluid' : ''}`}
      tabIndex={tabIndex}
      ref={ref}
      onKeyDown={(e) => handleKeyDown(e, isOpen, setOpen, setClosing)}
    >
      <span
        className={`value${isOpen && !isClosing ? ' open' : ''}`}
        onClick={() =>
          !isOpen && !isClosing ? setOpen(!isOpen) : close(setOpen, setClosing)
        }
      >
        {options[selected].text}
      </span>
      <Menu
        options={options}
        selected={selected}
        onOptionSelect={(option) =>
          selectOption(option, setSelected, setOpen, setClosing, onChange)
        }
        className={
          !isOpen && !isClosing ? 'hidden' : isClosing ? ' closing' : null
        }
      />
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
      selected: PropTypes.bool,
    })
  ).isRequired,
  onChange: PropTypes.func,
  fluid: PropTypes.bool,
};

export default Select;
