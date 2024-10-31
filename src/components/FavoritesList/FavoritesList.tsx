import React from 'react';

interface FavoritesListProps {
  favorites: string[];
  removeFromFavorites: (city: string) => void; 
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, removeFromFavorites }) => {
  return (
    <div>
      <h2>Favorite Cities</h2>
      <ul>
        {favorites.map((city) => (
          <li key={city}>
            {city} 
            <button onClick={() => removeFromFavorites(city)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
