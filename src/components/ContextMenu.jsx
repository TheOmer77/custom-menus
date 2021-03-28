import React, { useState, useEffect } from 'react';
import Menu from './Menu';

import '../styles/ContextMenu.css';

const ContextMenu = ({
  options,
  onOptionSelect,
  position,
  closing,
  innerRef,
}) => {
  const [styleX, setStyleX] = useState({});
  const [styleY, setStyleY] = useState({});

  useEffect(() => {
    setStyleX(
      position.x > window.innerWidth - innerRef.current.clientWidth
        ? { right: `${window.innerWidth - position.x}px` }
        : { left: `${position.x}px` }
    );
    setStyleY(
      position.y > window.innerHeight - innerRef.current.clientHeight
        ? { bottom: `${window.innerHeight - position.y}px` }
        : { top: `${position.y}px` }
    );
  }, [position, innerRef]);

  return (
    <Menu
      options={options}
      onOptionSelect={onOptionSelect}
      className={`context-menu${closing ? ' closing' : ''}`}
      style={{ ...styleX, ...styleY }}
      innerRef={innerRef}
    />
  );
};

export default ContextMenu;
