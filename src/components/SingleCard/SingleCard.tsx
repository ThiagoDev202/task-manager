import React, { useState } from 'react';

interface SingleCardProps {
  id: number;
  title: string;
  description: string;
}

const SingleCard: React.FC<SingleCardProps> = ({ id, title, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div
        className="bg-white shadow rounded p-4 mb-2 cursor-pointer hover:bg-gray-100"
        draggable
        onClick={openModal} // Exibe o modal ao clicar
        onDragStart={(e) => e.dataTransfer.setData('text/plain', id.toString())}
      >
        <h3 className="font-bold text-center">{title}</h3> {/* Nome centralizado */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p>{description}</p>
            <button onClick={closeModal} className="mt-4 bg-red-500 text-white p-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCard;
