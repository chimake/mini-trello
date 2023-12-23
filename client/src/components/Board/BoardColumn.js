// BoardColumn.js
import React, { useCallback } from 'react';
import BoardCard from './BoardCard';
import BoardCardOperations from './BoardCardOperations';
import { useDrop } from 'react-dnd';
import { useMutation } from '@apollo/client';
import { CREATE_CARD, UPDATE_CARD_COLUMN, DELETE_CARD } from '../../graphql';

const BoardColumn = ({ column, cards, updateLocalCards }) => {
  const [createCard] = useMutation(CREATE_CARD);
  const [updateCardColumn] = useMutation(UPDATE_CARD_COLUMN);
  const [deleteCard] = useMutation(DELETE_CARD);


  const handleCardMove = useCallback(
    async (card, prevColumnId, newColumnId, cardData) => {
        if(cardData){
            updateLocalCards(cardData.cardData, null, true, null);
        } else {
          let cardId = card.cardId;
            try {
              // Assuming a successful move, update local state
              updateLocalCards(card, newColumnId);
              
              await updateCardColumn({
                  variables: {
                    data: {
                      cardId,
                      prevColumnId,
                      newColumnId,
                    },
                  },
                });          

                
            } catch (error) {
              console.error('Error updating card column:', error);
            }
      }
    },
    [updateCardColumn, updateLocalCards]
  );

  const handleCardDelete = async (cardId) => {
    try {
      const { data } = await deleteCard({
        variables: { cardId: cardId },
      });
  
      const isCardDeleted = data?.deleteCard || false;
  
      if (isCardDeleted) {
        // Update the local state to remove the deleted card
        updateLocalCards( cardId, null, null, true);
      } else {
        console.error('Error deleting card: Card not found');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
  



  const handleCreateCard = async (title, description, column) => {
    try {
      

      // Example createCard mutation call
      const { data } = await createCard({
        variables: { title, description, columnId: column },
      });

      // Assuming the mutation returns the created card
      

      // Update local state with the new card
      updateLocalCards(data.createCard);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item, monitor) => {
      const droppedCardId = item.card;
      const newColumnId = column.columnId;
      const prevColumnId = item.card.columnId;
      if (droppedCardId && prevColumnId && newColumnId) {
        handleCardMove(droppedCardId, prevColumnId, newColumnId, null)
          .then(() => {
            // Handle any post-drop logic here
          })
          .catch((error) => {
            console.error('Error handling card move:', error);
          });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });



  return (
    <div ref={drop} className="flex-shrink-0 w-1/3 p-4 border rounded bg-white shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
      <div className={`space-y-4 ${isOver ? 'bg-blue-100' : ''}`}>
        {Array.isArray(cards) &&
          cards
            .filter((card) => card.columnId === column.columnId)
            .map((card) => (
              <BoardCard key={card.cardId} card={card} onCardMove={handleCardMove} onCardDelete={handleCardDelete} />

            ))}
        <BoardCardOperations onAddCard={handleCreateCard} columnId={column.columnId} />
      </div>
    </div>
  );


};

export default BoardColumn;
