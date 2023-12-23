// components/BoardColumnOperations.js
import React, { useState } from 'react';

const BoardColumnOperations = ({ onAddColumn }) => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnDescription, setNewColumnDescription] = useState('');

  const handleToggleAddColumn = () => {
    setIsAddingColumn(!isAddingColumn);
    setNewColumnTitle(''); // Reset the new column title when toggling
    setNewColumnDescription(''); // Reset the new column description when toggling
  };

  const handleAddColumn = () => {
    // Perform any validation on the newColumnTitle if needed
    if (newColumnTitle.trim() === '') {
      // Display an error message or prevent adding the column
      return;
    }

    if (newColumnDescription.trim() === '') {
      // Display an error message or prevent adding the column
      return;
    }

    onAddColumn(newColumnTitle, newColumnDescription);
    handleToggleAddColumn(); // Close the form/modal after adding the column
  };

  return (
    <div className="mb-4">
      {isAddingColumn ? (
        <div>
          <input
            type="text"
            placeholder="Enter column title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className="mr-2"
          />
          <input
            type="text"
            placeholder="Enter column description"
            value={newColumnDescription}
            onChange={(e) => setNewColumnDescription(e.target.value)}
            className="mr-2"
          />
          <button onClick={handleAddColumn} className="bg-green-500 text-white px-2 py-1">
            Add Column
          </button>
          <button onClick={handleToggleAddColumn} className="ml-2 text-gray-500">
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={handleToggleAddColumn} className="bg-blue-500 text-white px-2 py-1">
          Add Column
        </button>
      )}
    </div>
  );
};

export default BoardColumnOperations;
