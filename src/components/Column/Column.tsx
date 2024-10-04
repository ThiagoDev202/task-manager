import React from 'react';
import SingleCard from '@/components/SingleCard/SingleCard';

interface ColumnProps {
  title: string;
  tasks: {
    id: number;
    title: string;
    description: string;
    status: string;
  }[];
  onDrop: (e: React.DragEvent, status: string) => void;
  onDragOver: (e: React.DragEvent) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onDrop, onDragOver }) => {
  return (
    <div
      className="flex-1 bg-gray-100 p-4 rounded-md"
      onDrop={(e) => onDrop(e, title)} // Passa o título da coluna (status)
      onDragOver={onDragOver}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <SingleCard key={task.id} id={task.id} title={task.title} description={task.description} />
      ))}
    </div>
  );
};

export default Column;
