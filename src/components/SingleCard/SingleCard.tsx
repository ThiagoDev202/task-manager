import React from 'react';

interface SingleCardProps {
  id: number;
  title: string;
  description: string;
}

const SingleCard: React.FC<SingleCardProps> = ({ id, title, description }) => {

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id.toString());  // Passa o ID do cartão
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.dataTransfer.clearData();
  };

  return (
    <div
      className="bg-white shadow p-4 mb-4 rounded-md"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default SingleCard;
