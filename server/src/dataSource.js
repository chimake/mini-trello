// dataSource.js

// In-memory storage for columns and cards
let dataSource = {
    columns: {
      1: {
        columnId: 1,
        title: 'Todo',
        description: 'Description for Todo',
      },
      2: {
        columnId: 2,
        title: 'In Progress',
        description: 'Description for In Progress',
      },
    },
    cards: [
        {
            cardId: 1,
            columnId: 1,
            title: 'Card 1',
            description: 'Description for Card 1',
            datetime: new Date('2023-01-01T12:00:00'), // Example datetime
          },
          {
            cardId: 2,
            columnId: 1,
            title: 'Card 2',
            description: 'Description for Card 2',
            datetime: new Date('2023-01-02T14:30:00'), // Example datetime
          }
    ]
  };
  
  const dataSourceFunctions = {
    getColumns: () => Object.values(dataSource.columns),
    getCards: () => Object.values(dataSource.cards),
    getCardsByColumnId: (columnId) => {
      return Object.values(dataSource.cards).filter((card) => card.columnId == columnId);
    },
  
    createCard: ({ title, description, columnId }) => {
        const newCardId = Object.keys(dataSource.cards).length + 1;
        const dateTime = new Date();
        // Convert columnId to a number if it's a string
        const newCard = {
          cardId: newCardId,
          columnId: typeof columnId === 'string' ? parseInt(columnId, 10) : columnId,
          title,
          description: description || '',
          datetime: new Date(), // Generate datetime when creating a new card
        };
      
        // Ensure that the newCard is not undefined or null before adding it to the array
        if (newCard) {
          dataSource.cards.push(newCard);
        }
      
        return newCard;
      },
  
      updateCardColumn: ({ cardId, newColumnId }) => {
        cardId = parseInt(cardId, 10);
        newColumnId = parseInt(newColumnId, 10);
        
        const cardIndex = dataSource.cards.findIndex((card) => card.cardId === cardId);
      
        if (cardIndex !== -1) {
          // Update the columnId of the specified card
          dataSource.cards[cardIndex].columnId = newColumnId;
          const updatedCard = { ...dataSource.cards[cardIndex], cardId: cardId };
          
          return updatedCard;
        } else {
          // Card not found
          console.error('Card not found');
          return null;
        }
      },
      updateCard: ({ cardId, title, description, datetime }) => {
        const cardIndex = dataSource.cards.findIndex((card) => card.cardId === parseInt(cardId, 10));
      
        if (cardIndex !== -1) {
          // Update card properties if provided
          if (title) dataSource.cards[cardIndex].title = title;
          if (description) dataSource.cards[cardIndex].description = description;
          if (datetime) dataSource.cards[cardIndex].datetime = datetime;
      
          const updatedCard = { ...dataSource.cards[cardIndex] };
          return updatedCard;
        } else {
          // Card not found
          console.error('Card not found');
          return null;
        }
      }
  };
  
  module.exports = { dataSource, dataSourceFunctions };
  