import { useState } from 'react';

const useModal = () => {
  const [modalData, setModalData] = useState<{ title: string; description: string } | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setModalData(null);
    setOpen(false);
  };

  const handleSave = (title: string, description: string) => {
    setModalData({ title, description });
    handleClose();
  };

  return { modalData, open, handleOpen, handleClose, handleSave };
};

export default useModal;
