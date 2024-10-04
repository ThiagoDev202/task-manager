import React from 'react';
import SingleCard from '../SingleCard/SingleCard';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (e: React.DragEvent, status: string) => void;
  onDragOver: (e: React.DragEvent) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onDrop, onDragOver }) => {
  return (
    <div
      onDrop={(e) => onDrop(e, title)}
      onDragOver={onDragOver}
      className="bg-gray-200 p-4 rounded-lg w-64 h-full"
    >
      <h2 className="font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <SingleCard key={task.id} task={task} onDragStart={() => {}} />
      ))}
    </div>
  );
};

export default Column;
