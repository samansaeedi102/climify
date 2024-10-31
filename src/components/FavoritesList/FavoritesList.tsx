// src/components/FavoritesList/FavoritesList.tsx
import React from 'react';
import styled from 'styled-components';

interface FavoriteCity {
  name: string;
  temperature: number;
}

interface FavoritesListProps {
  favorites: FavoriteCity[];
  removeFromFavorites: (cityToRemove: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, removeFromFavorites }) => {
  return (
    <Container>
      <Title>Favorite Cities</Title>
      <List>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <ListItem key={favorite.name}>
              {favorite.name} - {favorite.temperature} °C
              <RemoveButton onClick={() => removeFromFavorites(favorite.name)}>Remove</RemoveButton>
            </ListItem>
          ))
        ) : (
          <NoFavoritesMessage>No city is chosen as favorite</NoFavoritesMessage>
        )}
      </List>
    </Container>
  );
};

export default FavoritesList;

// Styled Components
const Container = styled.div`
  padding: 16px;
  background-color: #f0f8CC;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 20px;
  color: #333;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 18px;
  color: #444;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveButton = styled.button`
  padding: 4px 8px;
  color: white;
  background-color: #ff4d4f;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d9363e;
  }
`;

const NoFavoritesMessage = styled.p`
  font-size: 16px;
  color: #888;
  text-align: center; 
`;
