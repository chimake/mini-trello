import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useMutation } from '@apollo/client';
import { UPDATE_CARD } from '../../graphql';

const BoardCard = ({ card, onCardMove, onCardDelete }) => {
  const [updateCard] = useMutation(UPDATE_CARD);
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [editedDescription, setEditedDescription] = useState(card.description);

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: {
      card,
      type: 'CARD',
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleSave = async () => {
    try {
      await updateCard({
        variables: {
          data: {
            cardId: card.cardId,
            title: editedTitle,
            description: editedDescription,
          },
        },
      });

      // Update local state or perform other actions as needed
      // Example: onCardMove(card.cardId, newColumnId);
      onCardMove(card.cardId, null, null,{cardData:{ ...card, title: editedTitle, description: editedDescription }});

      setEditing(false);
      setEditing(false);
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  return (
    <div
      ref={drag}
      className={`bg-gray-200 p-4 rounded shadow-md ${isDragging ? 'opacity-50' : ''}`}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p className="text-lg font-semibold">{card.title}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onCardDelete(card.cardId)} className="mt-2 text-red-500 hover:text-red-700">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BoardCard;
