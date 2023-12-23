const { v4: uuidv4 } = require('uuid');
const { dataSource, dataSourceFunctions } = require('./dataSource');

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    cards: () => dataSourceFunctions.getCards(),
    getCardsByColumnId: (_, { columnId }) => dataSourceFunctions.getCardsByColumnId(columnId),
    columns: () => dataSourceFunctions.getColumns(),
  },
  Mutation: {
    createCard: (_, { data }) => dataSourceFunctions.createCard(data),
    updateCard: (_, { data }) => {
      try {
        const updatedCard = dataSourceFunctions.updateCard(data);
    
        if (!updatedCard) {
          // Handle the case where the card is not found
          console.error('Card not found');
          return null;
        }
    
        return updatedCard;
      } catch (error) {
        console.error(`Error updating card: ${error.message}`);
        throw new Error(`Error updating card: ${error.message}`);
      }
    },    
    deleteCard: (_, { cardId }) => {
      const cardIndex = dataSource.cards.findIndex((card) => card.cardId === parseInt(cardId, 10));
      
    
      if (cardIndex !== -1) {
        // Remove the card from the array
        dataSource.cards.splice(cardIndex, 1);
        
    
        // Return a response indicating success and the deleted cardId
        return { success: true, cardId: cardId };
      } else {
        // Card not found
        console.error('Card not found');
    
        // Return a response indicating failure
        return { success: false, cardId: null };
      }
    },
    createColumn: (_, { data }) => {
      const newColumnId = Object.keys(dataSource.columns).length + 1;
      data.columnId = newColumnId;
      const newColumn = {
        id: newColumnId,
        ...data,
      };

      dataSource.columns[newColumnId] = newColumn;
      return newColumn;
    },
  
    updateCardColumn: (_, { data }) => {
      
      try {
        const updatedCard = dataSourceFunctions.updateCardColumn(data);
    
        if (!updatedCard) {
          // Handle the case where the card is not found
          console.error('Card not found');
          return null;
        }
    
        return updatedCard;
      } catch (error) {
        console.error(`Error updating card column: ${error.message}`);
        throw new Error(`Error updating card column: ${error.message}`);
      }
    },
    // Add other mutation resolvers as needed
  },
};

module.exports = resolvers;
