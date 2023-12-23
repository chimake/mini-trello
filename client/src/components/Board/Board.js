// Board.js
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BoardColumn from './BoardColumn';
import BoardColumnOperations from './BoardColumnOperations';
import { useMutation } from '@apollo/client';
import { CREATE_COLUMN } from '../../graphql';

const Board = ({ columns, cards }) => {
    const [columnsState, setColumnsState] = useState(columns);
    const [cardsState, setCardsState] = useState(cards);
    const [createColumn] = useMutation(CREATE_COLUMN);
    const [sortOrder, setSortOrder] = useState('desc'); 


    const handleUpdateLocalCards = (cardData, newColumnId, update, deleted) => {
      // Perform any additional logic for updating local cards
      // Use map to create a new array with the necessary updates
      const updatedCards = cardsState.map((card) => {
        if (card.cardId === cardData.cardId && newColumnId) {
          // If newColumnId is provided, update the columnId
          return { ...card, columnId: newColumnId };
        } else if (card.cardId === cardData && deleted) {
          if (deleted === true) {
            // Return false to exclude the deleted card from the updated array
            return false;
          }
        } else if (card.cardId === cardData.cardId && update) {
          return {
            ...card,
            ...(newColumnId && { columnId: newColumnId }), // Update columnId if newColumnId is provided
            ...(cardData.title && { title: cardData.title }), // Update title if cardData contains a title
            ...(cardData.description && { description: cardData.description }), // Update description if cardData contains a description
          };
        }
        // Default case: return the original card if none of the conditions are met
        return card;
      });
    
      // If newColumnId is not provided, add the new card to the array
      if (!newColumnId && !deleted && !update) {
        updatedCards.push(cardData);
      }
    
      // Filter out cards with false values (deleted cards)
      const filteredUpdatedCards = updatedCards.filter(Boolean);
    
      // Update local state with the updated cards
      setCardsState(filteredUpdatedCards);
    };
    
    

    const handleAddColumn = async (newColumnTitle, newColumnDescription) => {
        // Perform any additional logic for adding a new column
        const newLocalColumn = {
          columnId: columnsState.length + 1, // Replace with appropriate ID logic
          title: newColumnTitle,
          description: newColumnDescription,
        };
        let title = newColumnTitle;
        let description = newColumnDescription;
    
        // Update local state with the new column
        setColumnsState([...columnsState, newLocalColumn]);
        await createColumn({
            variables: { data: { title, description } },
          });
      

      };

      const handleSortChange = (newSortOrder) => {
        setSortOrder(newSortOrder);
        // You may want to update the local state here based on the new sort order
      };
      useEffect(() => { 
        
        setColumnsState(columns);
        setCardsState(cards);
        }, [columns, cards]);

        const formattedCards = cardsState.map(card => {
            try {
                const originalDate = new Date(parseInt(card.datetime));
              const formattedDatetime = !isNaN(originalDate) ? originalDate.toISOString() : null;
              return {
                ...card,
                datetime: formattedDatetime,
              };
            } catch (error) {
              return card;
            }
          });
          
          
          

          const sortedCards = [...formattedCards].sort((a, b) => {
            const dateA = new Date(a.datetime).getTime();
            const dateB = new Date(b.datetime).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
          });
          
    
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4 overflow-x-auto p-4 bg-gray-100">
      <div>
          <label>
            Sort Order:
            <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      {columnsState?.map((column) => (
            <BoardColumn
                key={column?.columnId}
                column={column}
                cards={sortedCards.filter(card => String(card.columnId) === String(column.columnId))}
                updateLocalCards={handleUpdateLocalCards}
            />
        ))}
        <BoardColumnOperations onAddColumn={handleAddColumn} />
      </div>
    </DndProvider>
  );
};

export default Board;
