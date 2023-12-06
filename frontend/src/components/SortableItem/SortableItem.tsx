import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
// import * as S from './styles';

interface ISortableItemProps {
  id: string | number;
  children: React.ReactNode;
  styles?: { [key: string]: string };
  isDraggable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export function SortableItem({ id, children, styles = {}, isDraggable=true, data={} }: ISortableItemProps) {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition 
  } = useSortable({ id, disabled: !isDraggable, data});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...styles,
  };

  console.log(style)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      {children}
    </div>
  );
}
