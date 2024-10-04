// Column.tsx
import React from 'react';
import { ColumnProps } from '@/components/Column/ColumnProps'; // Verifique o caminho

const Column: React.FC<ColumnProps> = ({ title, progress, children }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <p>Progress: {progress}%</p>
      <div>{children}</div>
    </div>
  );
};

export default Column;
