import React from 'react';
import './styles/tailwind.css';
import { DndContextProvider } from './DndContext';
import Board from './components/Board/Board';
import { useQuery } from '@apollo/client';
import { GET_CARDS, GET_COLUMNS } from './graphql'; // Import your GraphQL query

const App = () => {
  // Use the useQuery hook to fetch columns
  const { loading, error, data } = useQuery(GET_COLUMNS);
  const { loading: loadingCards, error: errorCards, data: dataCards } = useQuery(GET_CARDS);

  if (loading) return <p>Loading...</p>;
  if (loadingCards) return <p>Loading Cards...</p>;
  if (errorCards) return <p>Error: {errorCards.message}</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Assuming your GraphQL query returns an object with a 'columns' field
  const columns = data.columns;
  const cards = dataCards.cards;

  return (
    <DndContextProvider>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-semibold mb-6">Mini Trello/Kanban Board</h1>
        <Board columns={columns} cards={cards} />
      </div>
    </DndContextProvider>
  );
};

export default App;
