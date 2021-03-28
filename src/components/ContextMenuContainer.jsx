import React, { useState, useEffect, useRef } from 'react';

import ContextMenu from './ContextMenu';

/** @param {MouseEvent} e */
const openContextMenu = (e, setContextMenu) => {
  e.stopPropagation();
  e.preventDefault();
  setContextMenu({ position: { x: e.pageX, y: e.pageY }, closing: false });
};

const closeContextMenu = (contextMenu, setContextMenu) => {
  setContextMenu({ ...contextMenu, closing: true });
  setTimeout(() => setContextMenu(null), 125);
};

const ContextMenuContainer = ({
  options,
  onOptionSelect,
  className,
  children,
}) => {
  const [contextMenu, setContextMenu] = useState(null);

  const ref = useRef();
  const innerRef = useRef();

  useEffect(() => {
    const onBodyClick = (e) =>
      innerRef.current &&
      !innerRef.current.contains(e.target) &&
      contextMenu &&
      closeContextMenu(contextMenu, setContextMenu);
    document.body.addEventListener('click', onBodyClick);
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, [contextMenu]);

  useEffect(() => {
    const onBodyClick = (e) =>
      ref.current &&
      !ref.current.contains(e.target) &&
      contextMenu &&
      closeContextMenu(contextMenu, setContextMenu);
    document.body.addEventListener('click', onBodyClick);
    document.body.addEventListener('contextmenu', onBodyClick);
    return () => {
      document.body.removeEventListener('click', onBodyClick);
      document.body.removeEventListener('contextmenu', onBodyClick);
    };
  }, [contextMenu]);

  return (
    <div
      className={className || ''}
      onContextMenu={(e) => openContextMenu(e, setContextMenu)}
      ref={ref}
    >
      {contextMenu && (
        <ContextMenu
          options={options}
          onOptionSelect={(option) => {
            onOptionSelect && onOptionSelect(option);
            closeContextMenu(contextMenu, setContextMenu);
          }}
          position={contextMenu.position}
          closing={contextMenu.closing}
          key={`x${contextMenu.position.x}y${contextMenu.position.y}`}
          innerRef={innerRef}
        />
      )}
      {children}
    </div>
  );
};

export default ContextMenuContainer;
