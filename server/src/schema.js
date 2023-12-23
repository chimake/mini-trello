const { gql } = require('apollo-server');

const typeDefs = gql`
type Card {
  cardId: ID!
  columnId: ID!
  title: String!
  description: String!
  datetime: String!
}

type Column {
  columnId: ID!
  title: String!
  description: String
}

type DeleteCardResponse {
  success: Boolean!
  cardId: ID
}
  input CreateCardInput {
    title: String!
    description: String!
    columnId: ID!
  }

  input CreateColumnInput {
    title: String!
    description: String
  }  

  input UpdateCardColumnInput {
    cardId: ID
    prevColumnId: ID
    newColumnId: ID
  }

  input UpdateCardInput {
    cardId: ID!
    title: String
    description: String
    datetime: String
  }

  type Query {
    hello: String!
    cards: [Card]!
    getCardsByColumnId(columnId: ID!): [Card]!
    columns: [Column]!
  }

  type Mutation {
    createCard(data: CreateCardInput!): Card!
    createColumn(data: CreateColumnInput!): Column!
    updateCardColumn(data: UpdateCardColumnInput!): Card
    updateCard(data: UpdateCardInput!): Card
    deleteCard(cardId: ID!): DeleteCardResponse
    # Add other mutations as needed
  }
`;

module.exports = typeDefs;
