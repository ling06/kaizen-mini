import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
// import * as S from './styles';

interface ISortableItemProps {
  id: string | number;
  children: React.ReactNode;
  styles?: { [key: string]: string };
}

export function SortableItem({ id, children, styles = {} }: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...styles,
  };

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
