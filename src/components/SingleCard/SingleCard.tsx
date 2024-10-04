import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

interface SingleCardProps {
  name: string;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  index: number;
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void;
  columnsArr: { title: string }[];
}

export default function SingleCard({
  name,
  setItems,
  index,
  moveCardHandler,
  columnsArr,
}: SingleCardProps) {
  const changeItemColumn = (currentItem: { name: string }, columnName: string) => {
    setItems((prevState) => {
      return prevState.map((e) => ({
        ...e,
        column: e.name === currentItem.name ? columnName : e.column,
      }));
    });
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: "Card",
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Card",
    item: { index, name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ name: string }>();
      const listOfColumnNames = columnsArr.map((e) => e.title);
      const { name: columnName } = dropResult || {};

      if (columnName && listOfColumnNames.includes(columnName)) {
        changeItemColumn(item, columnName);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.3 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="bg-white shadow-md p-4 mb-3 cursor-pointer w-11/12 max-w-md mx-auto rounded-2xl transform transition-transform hover:scale-105 hover:shadow-lg"
    >
      <h4 className="text-gray-700 mt-0 mb-2 text-center">{name}</h4>
    </div>
  );
}

