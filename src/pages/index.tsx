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
  const { open, handleOpen, handleClose, handleSave } = useModal();

  const handleDrop = (e: React.DragEvent, status: string) => {
    const id = parseInt(e.dataTransfer.getData('text/plain'));
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: 'To Do',
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="flex space-x-4 p-8">
      <Column
        title="To Do"
        tasks={tasks.filter((task) => task.status === 'To Do')}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      />
      <Column
        title="In Progress"
        tasks={tasks.filter((task) => task.status === 'In Progress')}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      />
      <Column
        title="Done"
        tasks={tasks.filter((task) => task.status === 'Done')}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      />
      <button
        onClick={handleOpen}
        className="bg-green-500 text-white p-4 rounded"
      >
        Add Task
      </button>
      <Modal
        isOpen={open}
        onClose={handleClose}
        onSave={addTask}
      />
    </div>
  );
};

export default Home;
