import { useState, useEffect } from 'react';
import { ColumnNames } from '../utils/constants';

export const useTaskManager = () => {
  const { ToDo, InProgress, Review, Done } = ColumnNames;
  const [progress, setProgress] = useState('');
  const [addColumn, setAddColumn] = useState('');
  const [modalData, setModalData] = useState('');
  const [open, setOpen] = useState(false);

  const [columnsArr, setColumnsArr] = useState([
    { id: 1, title: ToDo },
    { id: 2, title: InProgress },
    { id: 3, title: Review },
    { id: 4, title: Done },
  ]);

  const tasks = [
    { id: 1, name: 'Item 1', column: ToDo },
    { id: 2, name: 'Item 2', column: ToDo },
    { id: 3, name: 'Item 3', column: ToDo },
  ];
  const [items, setItems] = useState(tasks);

  useEffect(() => {
    getDataInProgress();
  });

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const copyArray = [...prevState];
        const prevItem = copyArray.splice(hoverIndex, 1, dragItem);
        copyArray.splice(dragIndex, 1, prevItem[0]);
        return copyArray;
      });
    }
  };

  const getDataInProgress = () => {
    const result = items.filter((e) => e.column === InProgress);
    const toDoLength = items.filter((e) => e.column === ToDo).length;
    const totalProgress = (result.length / (result.length + toDoLength)) * 100;
    setProgress(isNaN(totalProgress) ? '0' : totalProgress.toString());
  };

  return {
    progress,
    items,
    columnsArr,
    setItems,
    addColumn,
    setAddColumn,
    modalData,
    setModalData,
    open,
    setOpen,
    moveCardHandler,
  };
};
