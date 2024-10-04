// src/components/ColumnProps.ts
export interface ColumnProps {
    title: string;          // Título da coluna
    progress: number;       // Progresso da coluna
    children: React.ReactNode; // Conteúdo da coluna
    handleModalSave?: () => void; // Função para salvar modal
    handleModalDataChange?: (data: any) => void; // Função para alterar dados do modal
    handleOpen?: () => void; // Função para abrir modal
    handleClose?: () => void; // Função para fechar modal
    modalData?: any; // Dados do modal
    open?: boolean; // Estado do modal
  }
  