import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const DndContextProvider = ({ children }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};
