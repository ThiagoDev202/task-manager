import React from 'react';
import SingleCard from '@/components/SingleCard/SingleCard';
import { Task } from '@/components/types/types';

interface ColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (e: React.DragEvent, status: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onEditTask: (id: number, title: string, description: string) => void; // Nova prop para editar task
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onDrop, onDragOver, onEditTask }) => {
  return (
    <div
      className="w-64 bg-white p-4 rounded-md flex-grow mt-4 sm:mt-8 mr-4 shadow-lg"
      onDrop={(e) => onDrop(e, title)}
      onDragOver={onDragOver}
    >
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      {tasks.map((task) => (
        <div key={task.id} className="mb-4">
          <SingleCard 
            id={task.id} 
            title={task.title} 
            description={task.description} 
            onEdit={onEditTask} // Passando a prop onEdit
          />
        </div>
      ))}
    </div>
  );
};

export default Column;
