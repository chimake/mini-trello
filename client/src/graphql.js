// graphql.js
import { gql } from '@apollo/client';

export const GET_COLUMNS = gql`
  query GetColumns {
    columns {
      columnId
      title
      description
    }
  }
`;

export const GET_CARDS = gql`
  query GetCards {
    cards {
      columnId
      cardId
      title
      description
      datetime
    }
  }
`;

export const GET_CARDS_BY_COLUMN = gql`
  query GetCardsByColumn($columnId: ID!) {
    getCardsByColumnId(columnId: $columnId) {
      title
      description
    }
  }
`;

export const CREATE_CARD = gql`
  mutation CreateCard($title: String!, $description: String!, $columnId: ID!) {
    createCard(data: { title: $title, description: $description, columnId: $columnId }) {
      cardId
      title
      description
      columnId
    }
  }
`;

export const CREATE_COLUMN = gql`
  mutation CreateColumn($data: CreateColumnInput!) {
    createColumn(data: $data) {
      columnId
      title
      description
    }
  }
`;


export const UPDATE_CARD_COLUMN = gql`
  mutation UpdateCardColumn($data: UpdateCardColumnInput!) {
    updateCardColumn(data: $data) {
      cardId
      title
      description
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($data: UpdateCardInput!) {
    updateCard(data: $data) {
      cardId
      title
      description
    }
  }
`;



export const DELETE_CARD = gql`
  mutation DeleteCard($cardId: ID!) {
    deleteCard(cardId: $cardId) {
      success
      cardId
    }
  }
`;

