import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Menu.css';

const Menu = ({
  options,
  selected,
  onOptionSelect,
  className,
  style,
  innerRef,
}) => {
  if (!options) throw new Error(`The 'options' prop is required.`);
  return (
    <ul
      className={`menu${className ? ` ${className}` : ''}`}
      style={style}
      ref={innerRef}
    >
      {options.map((option, index) =>
        option.divider ? (
          <div className='divider' key={`divider-${index}`} />
        ) : (
          <li
            className={`option${
              option.value === options[selected]?.value ? ' selected' : ''
            }${option.disabled ? ' disabled' : ''}`}
            key={option.value}
            onClick={() => {
              !option.disabled && onOptionSelect && onOptionSelect(index);
              !option.disabled && option.onClick && option.onClick();
            }}
          >
            {option.text}
          </li>
        )
      )}
    </ul>
  );
};

Menu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
      }),
      PropTypes.shape({
        divider: true,
      }),
    ])
  ).isRequired,
  selected: PropTypes.number,
  onOptionSelect: PropTypes.func,
};

export default Menu;
