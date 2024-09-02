// components/CommandMenu.tsx
import React from 'react';
import { Command } from './commands';

type CommandMenuProps = {
  commands: Command[];
  position: { top: number; left: number } | null;
  onSelect: (command: Command) => void;
};

const CommandMenu: React.FC<CommandMenuProps> = ({ commands, position, onSelect }) => {
  if (!position) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: position.top + 20,
        left: position.left,
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      {commands.map((command) => (
        <div
          key={command.title}
          style={{ padding: '8px', cursor: 'pointer' }}
          onMouseDown={() => onSelect(command)}
        >
          {command.title}
        </div>
      ))}
    </div>
  );
};

export default CommandMenu;
