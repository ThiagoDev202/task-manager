import React, { useState } from 'react';
import Column from '@/components/Column/Column';
import Modal from '@/components/modals/Modal';
import useModal from '@/components/Column/useModal';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<string[]>(['Backlog', 'Sprint Backlog', 'Dev', 'Code Review', 'Testing', 'Done']);
  
  const { open, handleOpen, handleClose, handleSave } = useModal();

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const [columnTitle, setColumnTitle] = useState('');
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  const addColumn = (title: string) => {
    setColumns((prevColumns) => [...prevColumns, title]);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('text/plain'));
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const addTask = (title: string, description: string = '') => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: 'Backlog',
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };  

  const handleEditTask = (id: number, title: string, description: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, title, description } : task
    );
    setTasks(updatedTasks);
  };

  const openColumnModal = () => {
    setColumnTitle('');
    setIsColumnModalOpen(true);
  };

  const closeColumnModal = () => {
    setIsColumnModalOpen(false);
  };

  const saveColumn = () => {
    if (columnTitle.trim() !== '') {
      addColumn(columnTitle);
      closeColumnModal();
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Task Manager - Scrum Agile Project</h1>
      
      <div className="flex overflow-x-auto space-x-4">
        {columns.map((column) => (
          <Column
            key={column}
            title={column}
            tasks={tasks.filter((task) => task.status === column)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onEditTask={handleEditTask} // Passando a função para editar tasks
          />
        ))}
      </div>

      <div className="flex flex-col items-center mt-8 space-y-4">
        <div onClick={handleOpen} className="bg-gray-100 p-4 rounded cursor-pointer shadow hover:bg-gray-300">
          <p className="text-center text-gray-600">+ Add another task</p>
        </div>
        
        <button 
          onClick={openColumnModal} 
          className="bg-gray-100 text-gray-600 p-4 rounded shadow hover:bg-gray-300">
          + Add New Column
        </button>
      </div>

      <Modal
        isOpen={open}
        onClose={handleClose}
        onSave={addTask}
        title={taskTitle}
        description={taskDescription}
        setTitle={setTaskTitle}
        setDescription={setTaskDescription}
      />

      <Modal
        isOpen={isColumnModalOpen}
        onClose={closeColumnModal}
        onSave={saveColumn}
        title={columnTitle}
        setTitle={setColumnTitle}
        isColumn={true} // Adicione um prop ou qualquer lógica que diferencie o modal de tasks e colunas, se necessário
      />
    </div>
  );
};

export default Home;
