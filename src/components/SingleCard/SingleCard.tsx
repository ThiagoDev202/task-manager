import React, { useState } from 'react';
import Modal from '@/components/modals/Modal';

interface SingleCardProps {
  id: number;
  title: string;
  description: string;
  onEdit: (id: number, title: string, description: string) => void;
}

const SingleCard: React.FC<SingleCardProps> = ({ id, title, description, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(title);
  const [modalDescription, setModalDescription] = useState(description);

  const openModal = () => {
    setModalTitle(title);
    setModalDescription(description);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    onEdit(id, modalTitle, modalDescription);
    closeModal();
  };

  // Função para lidar com o início do arrasto
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id.toString()); // Armazena o ID da task no evento
  };

  return (
    <div>
      <div
        className="bg-white shadow rounded p-4 mb-2 cursor-pointer hover:bg-gray-100"
        draggable
        onDragStart={handleDragStart} // Adiciona o evento de arrastar
        onClick={openModal} // Exibe o modal ao clicar
      >
        <h3 className="font-bold text-center">{title}</h3>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          title={modalTitle}
          description={modalDescription}
          setTitle={setModalTitle}
          setDescription={setModalDescription}
        />
      )}
    </div>
  );
};

export default SingleCard;
