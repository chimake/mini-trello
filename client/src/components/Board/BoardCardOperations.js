// components/BoardColumnOperations.js
import React, { useState } from 'react';

const BoardCardOperations = ({ onAddCard, columnId }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');

  const handleToggleAddCard = () => {
    setIsAddingCard(!isAddingCard);
    setNewCardTitle(''); // Reset the new column title when toggling
    setNewCardDescription(''); // Reset the new column description when toggling
  };

  const handleAddCard = () => {
    // Perform any validation on the newColumnTitle if needed
    if (newCardTitle.trim() === '') {
      // Display an error message or prevent adding the column
      return;
    }

    if (newCardDescription.trim() === '') {
      // Display an error message or prevent adding the column
      return;
    }

    onAddCard(newCardTitle, newCardDescription, columnId);
    handleToggleAddCard(); // Close the form after adding the column
  };

  return (
    <div className="mb-4">
      {isAddingCard ? (
        <div>
          <input
            type="text"
            placeholder="Enter card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="mr-2"
          />
          <input
            type="text"
            placeholder="Enter column description"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            className="mr-2"
          />
          <button onClick={handleAddCard} className="bg-green-500 text-white px-2 py-1">
            Add Card
          </button>
          <button onClick={handleToggleAddCard} className="ml-2 text-gray-500">
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={handleToggleAddCard} className="bg-blue-500 text-white px-2 py-1">
          Add Card
        </button>
      )}
    </div>
  );
};

export default BoardCardOperations;
