import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import Column from '@/components/Column/Column';
import SingleCard from '@/components/SingleCard/SingleCard';
import { useTaskManager } from '../hooks/useTaskManager';

const Home = () => {
    const {
        columnsArr,
        progress,
        items,
        moveCardHandler,
        setItems, // Obtendo setItems do hook
    } = useTaskManager();

    const [isMobile, setIsMobile] = useState(false);

    // Verifica se é um dispositivo móvel após o componente ser montado
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Altere a largura conforme necessário
        };

        // Chama a função uma vez na montagem do componente
        handleResize();

        // Adiciona um listener de resize
        window.addEventListener('resize', handleResize);

        // Limpa o listener na desmontagem
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Funções e estados necessários para o modal
    const handleModalSave = () => { /* lógica de salvar */ };
    const handleModalDataChange = (data: any) => { /* lógica de alteração */ };
    const handleOpen = () => { /* lógica para abrir */ };
    const handleClose = () => { /* lógica para fechar */ };
    const modalData = {}; // Dados do modal
    const open = false; // Estado do modal
  
    const returnItemsForColumn = (columnTitle: string) => {
        return items
          .filter(item => item.column === columnTitle)
          .map((item, index) => (
              <SingleCard
                  key={item.id}
                  name={item.name}
                  setItems={setItems} // Passando setItems corretamente
                  index={index}
                  moveCardHandler={moveCardHandler}
                  columnsArr={columnsArr}
              />
          ));
    };

    return (
      <div className="container mx-auto p-4">
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <div className="flex flex-wrap justify-center gap-4">
            {columnsArr.map((e) => (
              <Column
                key={e.id}
                title={e.title}
                progress={Number(progress)} // Convertendo progress para número
                handleModalSave={handleModalSave}
                handleModalDataChange={handleModalDataChange}
                handleOpen={handleOpen}
                handleClose={handleClose}
                modalData={modalData}
                open={open}
              >
                {returnItemsForColumn(e.title)}
              </Column>
            ))}
          </div>
        </DndProvider>
      </div>
    );
};

export default Home;
