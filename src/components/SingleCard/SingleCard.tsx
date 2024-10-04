import React from 'react';

interface SingleCardProps {
  task: { id: number; title: string; description: string };
  onDragStart: (e: React.DragEvent, id: number) => void;
}

const SingleCard: React.FC<SingleCardProps> = ({ task, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white p-4 rounded-lg shadow-md mb-2"
    >
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default SingleCard;
