// src/components/SearchBar/SearchBar.tsx
import React from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, handleSearch }) => {
  return (
    <Container>
      <Input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <Button onClick={handleSearch}>Search</Button>
    </Container>
  );
};

export default SearchBar;

// Styled Components
const Container = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  flex: 1;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
