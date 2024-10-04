export interface ColumnProps {
    title: string;          
    progress: number;       
    children: React.ReactNode; 
    handleModalSave?: () => void; 
    handleModalDataChange?: (data: any) => void;
    handleOpen?: () => void; 
    handleClose?: () => void; 
    modalData?: any; 
    open?: boolean; 
  }
  