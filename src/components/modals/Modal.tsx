import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description?: string) => void; // description opcional
  title: string;
  description?: string; // description opcional
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription?: React.Dispatch<React.SetStateAction<string>>; // setDescription opcional
  isColumn?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, title, description, setTitle, setDescription, isColumn }) => {
  const handleSubmit = () => {
    if (isColumn) {
      onSave(title); // Quando for modal de coluna, passa apenas o título
    } else {
      onSave(title, description); // Para task, passa título e descrição
      setDescription?.(''); // Limpa a descrição se for task
    }
    setTitle(''); // Limpa o título
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">{isColumn ? 'Add New Column' : 'Add New Task'}</h2>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder={isColumn ? 'Column Title' : 'Task Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {!isColumn && ( // Renderiza descrição apenas se não for coluna
          <textarea
            className="border border-gray-300 p-2 rounded w-full mb-4"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription?.(e.target.value)}
          />
        )}

        <div className="flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
